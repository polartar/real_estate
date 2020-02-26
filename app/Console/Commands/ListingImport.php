<?php

namespace App\Console\Commands;

use App\Amenity;
use Illuminate\Console\Command;
use \App\Apartment;
use App\BedroomType;
use App\BuildingType;
use App\ImageUpload;
use App\Providers\ApartmentServiceProvider;
use App\Subway;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ListingImport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apt212:listing_import
                                {--file=[/path/to/app]/database/assets/existingListings.json : The absolute path to the file containing the export json}
                                {--images=[/path/to/app]/storage/app/import_images : The absolute path to the directory containing the images for exported listings}
                                {--fake_images : For dev usage, use random images [1-10].jpg}
                                {--limit=0 : The number of listings to import, 0 = all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import listings from the old mongodb dump';

    protected $file = '';
    protected $images = '';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $time_start = microtime(true);

        //
        $file = $this->option('file');
        $this->file = str_replace('[/path/to/app]', base_path(), $file);

        $images = $this->option('images');
        $this->images = str_replace('[/path/to/app]', base_path(), $images);

        if (!is_file($this->file)) {
            $this->error('Invalid file path');
            return;
        }

        $import_num = 0;

        $bedroomTypes = BedroomType::all();
        $buildingTypes = BuildingType::all();
        $subways = Subway::all();
        $amenities = Amenity::all();

        // get the number of lines first
        $linecount = 0;
        $handle = fopen($this->file, "r");
        while(!feof($handle)){
            $line = fgets($handle);
            $linecount++;
        }

        fclose($handle);

        $bar = $this->output->createProgressBar($linecount);
        $bar->start();

        $handle = fopen($this->file, 'r');
        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $import_num++;

                $data = json_decode($line, true);

                // find the bedroomType
                $bedTypeIndex = $bedroomTypes->search(function ($bt, $key) use ($data) {
                    if (strtolower($bt->name) === strtolower($data['bedRooms'])) {
                        return true;
                    }

                    if ($data['bedRooms'][0] == $bt->name) {
                        return true;
                    }

                    if (strtolower($bt->name) === 'room' && strtolower($data['bedRooms']) === 'private room') {
                        return true;
                    }

                    return false;
                });

                if ($bedTypeIndex === false) {
                    $bedroomType = $bedroomTypes->last();
                }
                else {
                    $bedroomType = $bedroomTypes->get($bedTypeIndex);
                }

                $buildingTypeIndex = $buildingTypes->search(function($bt, $key) use ($data) {
                    return strtolower($bt->name) === strtolower($data['buildingType']);
                });

                if ($buildingTypeIndex === false) {
                    $buildingType = $buildingTypes->last();
                } else {
                    $buildingType = $buildingTypes->get($buildingTypeIndex);
                }

                $available_date = isset($data['availableDate']['$date']) ? new Carbon($data['availableDate']['$date']) : new Carbon();

                $apt = Apartment::create([
                    'user_id' => 1,
                    'owner_name' => isset($data['ownerName']) ? $data['ownerName'] : '',
                    'address' => isset($data['address']) ? $data['address'] : '',
                    'street_address' => isset($data['address']) ? $data['address'] : '',
                    'city' => isset($data['city']) ? $data['city'] : '',
                    'state' => isset($data['state']) ? $data['state'] : '',
                    'zip' => isset($data['zipCode']) ? $data['zipCode'] : '',
                    'apartment_number' => isset($data['apartmentNumber']) ? $data['apartmentNumber']: null,
                    'floor' => isset($data['floor']) ? $data['floor'] : null,
                    'size' => isset($data['sqFootage']) ? $data['sqFootage'] : null,
                    'title' => isset($data['title']) ? $data['title'] : '',
                    'description' => isset($data['description']) ? $data['description'] : '',
                    'bedroom_type_id' => $bedroomType ? $bedroomType->id : $bedroomTypes->first()->id,
                    'building_type_id' => $buildingType ? $buildingType->id : $buildingTypes->first()->id,
                    'bathrooms' => isset($data['bathRooms']) ? $data['bathRooms'] : 0,
                    'cross_streets' => isset($data['crossStreets']) ? $data['crossStreets'] : '',
                    'available_date' => $available_date->format('Y-m-d'),
                    'rate' => isset($data['rate']) ? (float) $data['rate'] : 0,
                    'months_due_on_checkin' => isset($data['monthsDueOnCheckIn']) ? (int) $data['monthsDueOnCheckIn'] : 0,
                    'days_due_on_checkin' => isset($data['dayDueOnCheckIn']) ? (int) $data['dayDueOnCheckIn'] : 0,
                    'duci_advance_payment_days' => isset($data['DUCIAdvance']) ? (int) $data['DUCIAdvance'] : 0,
                    'due_to_reserve' => isset($data['dueNow']) ? $this->mapDueNow($data['dueNow']) : [],
                    'due_by_checkin' => [],
                    'rating' => isset($data['rating']) ? $data['rating'] : 0,
                    'lat' => isset($data['latitude']) ? $data['latitude'] : 0,
                    'lng' => isset($data['longitude']) ? $data['longitude'] : 0,
                    'is_active' => isset($data['isActive']) ? $data['isActive'] : false,
                    'feature_1' => isset($data['isFeatured']) ? $data['isFeatured'] : false,
                    'feature_2' => isset($data['isSecondaryFeatured']) ? $data['isSecondaryFeatured'] : false
                ]);

                $apt->setRates($this->formatRates($data));

                if (isset($data['subway'])) {
                    $subway_ids = $subways->filter(function($v) use ($data) { return in_array(strtolower($v->name), $data['subway']); })->pluck('id');
                    $apt->subways()->sync($subway_ids);
                }

                $amentity_ids = $this->parseAmenities($data, $amenities);
                $apt->amenities()->sync($amentity_ids);

                if (isset($data['listingImages']) && is_array($data['listingImages'])) {
                    $images = $this->getImages($data['listingImages']);
                    ApartmentServiceProvider::claimImages($apt, $images, 'images');
                }

                if (isset($data['floorPlan']) && $data['floorPlan']) {
                    $floor_plans = $this->getImages([$data['floorPlan']], 'floor_plan');
                    ApartmentServiceProvider::claimImages($apt, $floor_plans, 'floor_plans');
                }

                $bar->advance();

                if (is_numeric($this->option('limit')) && $this->option('limit') > 0) {
                    if ($import_num >= $this->option('limit')) {
                        break;
                    }
                }
            }

            $bar->finish();

            $time_end = (float) microtime(true);

            $this->info('');

            $this->info('Import finished in: ' . CarbonInterval::make(($time_end - $time_start) . 's')->cascade()->forHumans());
        } else {
            $this->error('Invalid file path');
        }
    }

    public function mapDueNow($dueNow) {
        $result = [];

        if (!is_array($dueNow)) {
            $dueNow = (array) $dueNow;
        }

        foreach ($dueNow as $val) {
            switch (strtolower($val)) {
                case 'applicationfee':
                    $result[] = 'background_check';
                break;
                case 'securitydeposit':
                    $result[] = 'security_deposit';
                break;
                case 'moveinrent':
                    $result[] = 'months_due_on_checkin';
                    $result[] = 'days_due_on_checkin';
                break;
                case 'tax':

                break;
                case 'servicefees':
                    $result[] = 'service_fee';
                break;
            }
        }

        return $result;
    }

    public function formatRates($data) {
        $rates = [];

        $months = range(0, 11);
        $months[] = 'default';

        foreach ($months as $month) {
            $rates[$month] = [];
            $rates[$month]['month'] = $month;
            $rates[$month]['monthly_rate'] = is_numeric($data['rate']) ? $data['rate'] : 0;

            if ($month !== 'default' && isset($data['monthRates'][$month + 1]) && is_numeric($data['monthRates'][$month + 1])) {
                $rates[$month]['monthly_rate'] = $data['monthRates'][$month + 1];
            }

            $rates[$month]['tax_percent'] = isset($data['tax']) && is_numeric($data['tax']) ? $data['tax'] : 0;
            $rates[$month]['security_deposit_percent'] = isset($data['securityDeposit']) && is_numeric($data['securityDeposit']) ? $data['securityDeposit'] : 0;
            $rates[$month]['service_fee_host'] = 0;
            $rates[$month]['service_fee_client'] = isset($data['serviceFee']) && is_numeric($data['serviceFee']) ? $data['serviceFee'] : 0;
            $rates[$month]['background_check_rate'] = isset($data['applicationFee']) && is_numeric($data['applicationFee']) ? $data['applicationFee'] : 0;
        }

        return $rates;
    }

    public function parseAmenities($data, $amenities) {
        $result = [];

        // @TODO - there are some text things in the $data['description'] for amenities, PIA to parse out
        // $amenities->each(function($amenity) use ($data) {

        // });

        return $result;
    }

    public function getImages($images, $type = 'image') {
        $result = [];

        $filesystem = Storage::disk('public');

        $base_path = $this->images . '/1200_';
        if ($type === 'floor_plan') {
            $base_path = $this->images . '/629x439_';
        }

        foreach ($images as $filename) {
            try {

                if ($this->option('fake_images')) {
                    $filename = random_int(1, 10) . '.jpg';
                }

                $img = Image::make($base_path . $filename);

                $thumbfile = 'images/' . $filename;
                $filepath = $filesystem->path($thumbfile);
                $img->save($filepath);

                if (file_exists($filepath)) {
                    $thumbs = ImageUpload::createThumbnails($filepath);

                    $imageUpload = new ImageUpload();
                    $imageUpload->user_id = 1;
                    $imageUpload->size_original = str_replace($filesystem->path(''), '', $filepath);
                    $imageUpload->size_small = $thumbs['small'];
                    $imageUpload->size_medium = $thumbs['medium'];
                    $imageUpload->size_large = $thumbs['large'];
                    $imageUpload->title = '';
                    $imageUpload->description = '';
                    $imageUpload->name = '';

                    $imageUpload->save();

                    $result[] = $imageUpload->id;
                }
            } catch (\Exception $e) {
                // just skip it
                continue;
            }
        }

        return $result;
    }
}