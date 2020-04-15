<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class MapImportedListings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apt212:map_imported_listings
                                {--file=[/path/to/app]/database/assets/existingListings.json : The absolute path to the file containing the export json}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create csv mapping between original webId and new webId for imported listings';

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
        $file = $this->option('file');
        $file = str_replace('[/path/to/app]', base_path(), $file);

        $outputfile = Storage::disk('local')->path('importMap.csv');

        $outputHandle = fopen($outputfile, 'w');

        fputcsv($outputHandle, [
            'Original WebId',
            'New WebId',
            'Owner',
            'Title',
            'Description',
            'Apt #',
            'Address',
            'Rate',
            'Sq Footage',
            'Building Type',
            'Available Date',
            'Floor',
            'Is Active',
            
        ]);

        $linenum = 0;

        $handle = fopen($file, "r");
        while(!feof($handle)){
            $linenum++;

            $line = fgets($handle);

            $data = json_decode($line, true);

            $availabledate = substr($data['availableDate']['$date'], 0, 10);

            fputcsv($outputHandle, [
                isset($data['webId']) ? $data['webId'] : 'INVALID',
                $linenum,
                isset($data['ownerName']) ? $data['ownerName'] : '',
                isset($data['title']) ? $data['title'] : '',
                isset($data['description']) ? $data['description'] : '',
                isset($data['apartmentNumber']) ? $data['apartmentNumber'] : '',
                isset($data['address']) ? $data['address'] : '',
                isset($data['rate']) ? $data['rate'] : '',
                isset($data['sqFootage']) ? $data['sqFootage'] : '',
                isset($data['buildingType']) ? $data['buildingType'] : '',
                isset($availabledate) ? $availabledate : '',
                isset($data['floor']) ? $data['floor'] : '',
                isset($data['isActive']) ? $data['isActive'] : ''
            ]);
        }

        $this->info('');
        $this->info('Map created at ' . $outputfile);
        $this->info('');
    }
}
