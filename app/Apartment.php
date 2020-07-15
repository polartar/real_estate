<?php

namespace App;

use App\Providers\ApartmentServiceProvider;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Apartment extends Model
{
    protected $guarded = [];

    //
    protected $casts = [
        "building_type_id" => "int",
        "bedroom_type_id" => "int",
        "rating" => "float",
        "available_date" => 'date:Y-m-d',
        "due_to_reserve" => 'array',
        "due_by_checkin" => 'array'
    ];

    protected $attributes = [
        'is_active' => true
    ];

    protected $appends = ['neighborhood_ids', 'map_marker_ids', 'monthly_utilities', 'url_path'];
    protected $hidden = ['neighborhoods', 'map_markers'];
    protected $with = ['amenities', 'subways', 'neighborhoods', 'map_markers', 'rates', 'images', 'floor_plans', 'block_dates'];

    protected static $structure = [
        'id',
        'owner_name',
        'address',
        'city',
        'state',
        'zip',
        'cross_streets',
        'lat',
        'lng',
        'title',
        'description',
        'bedroom_type_id',
        'bathrooms',
        'building_type_id',
        'floor',
        'floors',
        'size',
        'available_date',
        'utility_cable',
        'utility_wifi',
        'utility_electricity',
        'utility_cleaning',
        'move_out_fee',
        'months_due_on_checkin',
        'days_due_on_checkin',
        'duci_advance_payment_days',
        'due_to_reserve',
        'due_by_checkin',
        'video_url',
        'is_active',
        'feature_1',
        'feature_2',
        'feature_3'
    ];


    protected static function boot() {
        parent::boot();

        static::addGlobalScope('active', function(Builder $builder) {
            $builder->where('is_active', true);
        });
    }

    // relationships

    /**
     * @return BelongsTo
     */
    function bedroom_type() {
        return $this->belongsTo(BedroomType::class);
    }

    function building_type() {
        return $this->belongsTo(BuildingType::class);
    }

    function neighborhoods() {
        return $this->belongsToMany(Neighborhood::class);
    }

    function map_markers() {
        return $this->belongsToMany(MapMarker::class);
    }

    function subways() {
        return $this->belongsToMany(Subway::class);
    }

    function amenities() {
        return $this->belongsToMany(Amenity::class);
    }

    function rates() {
        return $this->hasMany(MonthlyRate::class);
    }

    function owner() {
        return $this->belongsTo(User::class);
    }

    function images() {
        return $this->morphMany(ImageUpload::class, 'attachment')->where('name', '=', 'images');
    }

    function floor_plans() {
        return $this->morphMany(ImageUpload::class, 'attachment')->where('name', '=', 'floor_plans');
    }

    function block_dates() {
        return $this->hasMany(BlockDates::class);
    }

    // accessors

    /**
     * Get the neighborhood ids
     */
    public function getNeighborhoodIdsAttribute() {
        return $this->neighborhoods->pluck('id');
    }

    public function getMapMarkerIdsAttribute() {
        return $this->map_markers->pluck('id');
    }

    public function getMonthlyUtilitiesAttribute() {
        $utilities = [
            $this->attributes['utility_wifi'],
            $this->attributes['utility_cable'],
            $this->attributes['utility_electricity'],
            $this->attributes['utility_cleaning']
        ];

        $utilties = array_filter($utilities);

        return round(array_sum($utilities), 2);
    }

    public function getUrlPathAttribute() {
        $neighborhood = $this->neighborhoods->first();

        $title_slug = Str::limit(Str::slug($this->title), 50, '');
        return "/listing/{$this->id}/{$neighborhood->slug}/{$title_slug}";
    }

    // if available date is in the past
    public function getAvailableDateAttribute() {
        $now = Carbon::now();
        $available = new Carbon($this->attributes['available_date']);

        return $now->greaterThan($available) ? $now->format('Y-m-d') : $available->format('Y-m-d');
    }

    /**
     * Custom methods
     */
    public function setRates($rates) {
        foreach ($rates as $month => $rate) {
            if (!$rate) {
                continue;
            }

            $this->rates()->where('month', $month)->updateOrCreate([
                'month' => $month
            ],
            array_merge($rate, ['apartment_id' => $this->id])
            );
        }
    }

     /**
      * Gets the current rate based on the current month and seasonal rates
      */
    public function getCurrentRate() {
        $date = Carbon::now();

        if ($this->available_date) {
            $date = $date->greaterThan($this->available_date) ? $date : new Carbon($this->available_date);
        }

        // Note: rate month numbers stored in js format, starting from jan = 0
        // subtract 1 from Carbon month num
        $rate = $this->rates->firstWhere('month', $date->month - 1);

        return $rate ? $rate->display_rate : null;
    }

    public function updateRate() {
        $new_rate = $this->getCurrentRate();

        if ($new_rate !== $this->rate) {
            $this->rate = $new_rate;
            $this->save();
        }
    }

    /**
     * @param $checkindate - date: 'n/j/Y'
     * @param $checkoutdate - date: 'n/j/Y'
     * @param $guests int
     *
     * @return Array - booking details
     * @throws \Exception
     */
    public function getBookingDetails($checkindate, $checkoutdate, $guests) {
        $date_output_format = 'n/j/Y';

        // validate params
        try {
            $checkin = new Carbon($checkindate);
            $checkout = new Carbon($checkoutdate);
        }
        catch (\Exception $e) {
            throw new Exception('Invalid checkin/checkout date');
        }

        $total_days = $checkin->diffInDays($checkout) + 1;

        if ($total_days < 30) {
            throw new Exception('Minimum stay is 30 days');
        }

        if ($checkin->lessThan($this->available_date)) {
            throw new Exception("Apartment is not available until {$this->available_date->format($date_output_format)}");
        }

        $guests = (int) $guests;
        if ($guests <= 0) {
            throw new Exception('There must be at least 1 guest');
        }

        // rates stored with months indexed at 0, js style
        $currentRate = $this->rates->firstWhere('month', $checkin->format('n') - 1);
        $defaultRate = $this->rates->firstWhere('month', 'default');
        if (!$currentRate || !$defaultRate) {
            throw new Exception('Rates not set for this apartment');
        }

        $stay_period = new CarbonPeriod($checkin, $checkout);

        // make sure the term doesn't overlap any blocked dates
        if ($this->block_dates->count()) {
            $this->block_dates->each(function($block) use ($stay_period, $date_output_format) {
                $start = new Carbon($block->start);
                $end = new Carbon($block->end);

                $period = new CarbonPeriod($start, $end);

                if ($period->overlaps($stay_period)) {
                    throw new Exception("Apartment is unavailable between {$period->getStartDate()->format($date_output_format)} and {$period->getEndDate()->format($date_output_format)}");
                }
            });
        }


        // create a structure of years/months of the stay and the number of days stayed in that month
        // eg.
        // [
        //     2021 => [
        //         7 => 15,
        //         8 => 31,
        //         9 => 30,
        //         10 => 8
        //     ]
        // ]

        $billingPeriods = [];
        foreach ($stay_period as $day) {
            if (!isset($billingPeriods[$day->format('Y')][$day->format('n')])) {
                $billingPeriods[$day->format('Y')][$day->format('n')] = 0;
            }

            $billingPeriods[$day->format('Y')][$day->format('n')]++;
        }

        // now go through and get the cost for each month
        // as well as some counts
        $rent = $months_count = $whole_months = $remainder_days = 0;

        foreach ($billingPeriods as $year => $months) {
            foreach ($months as $month => $days) {
                $date = new Carbon("$year-$month-1");

                // note - month stored indexed at 0
                $month_rate = $this->rates->firstWhere('month', $month - 1)->monthly_rate;

                // find the ratio of days/month
                // eg if only staying 10/30 days then the rent is 0.33333 of the monthly rent
                $month_ratio = $days / $date->daysInMonth;

                $months_count += $month_ratio;

                $rent += $month_rate * $month_ratio;

                if ($month_ratio === 1) {
                    $whole_months++;
                }
                else {
                    $remainder_days += $days;
                }
            }
        }

        // if remainder days is more than 31, move that to a whole month
        // prevents weird things like a stay of "3 months 34 days"
        // when check in and check out are both mid-month
        // change to "4 months 4 days"
        if ($remainder_days > 30) {
            $whole_months++;
            $remainder_days -= 30;
        }

        $rent = round($rent, 2);
        $total_tax = round($rent * ($defaultRate->tax_percent / 100), 2);
        $service_fee_host = round($rent * ($currentRate->service_fee_host / 100), 2);
        $service_fee_client = round($rent * ($currentRate->service_fee_client / 100), 2);

        $total_rent = $rent + $service_fee_host;

        $amortized_monthly_rent = round($total_rent / $months_count, 2);

        $night_rate = round($total_rent / $total_days, 2);
        $deposit = round($amortized_monthly_rent * ($currentRate->security_deposit_percent / 100), 2);

        $background_checks = $this->getBackgroundCheckPrice($guests);

        $utilities = round($this->monthly_utilities * $months_count, 2);

        $total_cost = round($background_checks + $total_rent + $total_tax + $service_fee_client + $deposit + $utilities + $this->move_out_fee, 2);

        // separate costs into the timeline
        $due_to_reserve = $due_by_checkin = 0;
        $due_to_reserve_settings = is_array($this->due_to_reserve) ? $this->due_to_reserve : [];
        $due_by_checkin_settings = is_array($this->due_by_checkin) ? $this->due_by_checkin : [];

        foreach ($due_to_reserve_settings as $setting) {
            switch ($setting) {
                case 'security_deposit':
                    $due_to_reserve += $deposit;
                break;

                case 'service_fee':
                    $due_to_reserve += $service_fee_client;
                break;

                case 'background_check':
                    $due_to_reserve += $background_checks;
                break;

                case 'months_due_on_checkin':
                    $due_to_reserve += $amortized_monthly_rent * $this->months_due_on_checkin;
                break;

                case 'days_due_on_checkin':
                    $due_to_reserve += $night_rate * $this->days_due_on_checkin;
                break;

                case 'move_out_cleaning':
                    $due_to_reserve += $this->move_out_fee;
                break;

                case 'utilities':
                    $due_to_reserve += $this->monthly_utilities * $this->months_due_on_checkin;
                    $due_to_reserve += ($this->monthly_utilities / $checkin->daysInMonth) * $this->days_due_on_checkin;
                break;

                case 'tax':
                    $mnth_tax = ($amortized_monthly_rent * $this->months_due_on_checkin) * ($defaultRate->tax_percent / 100);
                    $day_tax = ($night_rate * $this->days_due_on_checkin) * ($defaultRate->tax_percent / 100);

                    $due_to_reserve += $mnth_tax;
                    $due_to_reserve += $day_tax;
                break;
            }
        }

        $due_to_reserve = round($due_to_reserve, 2);

        foreach ($due_by_checkin_settings as $setting) {
            // only count it if it wasn't previously added to reservation fee
            if (in_array($setting, $due_to_reserve_settings)) {
                continue;
            }

            switch ($setting) {
                case 'security_deposit':
                    $due_by_checkin += $deposit;
                break;

                case 'service_fee':
                    $due_by_checkin += $service_fee_client;
                break;

                case 'background_check':
                    $due_by_checkin += $background_checks;
                break;

                case 'months_due_on_checkin':
                    $due_by_checkin += $amortized_monthly_rent * $this->months_due_on_checkin;
                break;

                case 'days_due_on_checkin':
                    $due_by_checkin += $night_rate * $this->days_due_on_checkin;
                break;

                case 'move_out_cleaning':
                    $due_by_checkin += $this->move_out_fee;
                break;

                case 'utilities':
                    $util_mnths = $this->monthly_utilities * $this->months_due_on_checkin;
                    $util_days = ($this->monthly_utilities / $checkin->daysInMonth) * $this->days_due_on_checkin;

                    $due_by_checkin += $util_days;
                    $due_by_checkin += $util_mnths;
                break;

                case 'tax':
                    $mnth_tax = ($amortized_monthly_rent * $this->months_due_on_checkin) * ($defaultRate->tax_percent / 100);
                    $day_tax = ($night_rate * $this->days_due_on_checkin) * ($defaultRate->tax_percent / 100);

                    $due_by_checkin += $mnth_tax;
                    $due_by_checkin += $day_tax;
                break;
            }
        }

        return [
            'id' => $this->id,
            'checkindate' => $checkindate,
            'checkoutdate' => $checkoutdate,
            'monthly_rent' => $amortized_monthly_rent,
            'night_rate' => $night_rate,
            'term' => [
                'months' => $whole_months,
                'days' => $remainder_days
            ],
            'guests' => $guests,
            'background_checks' => $background_checks,
            'rent' => $total_rent,
            'tax' => $total_tax,
            'utilities' => $utilities,
            'service_fee' => $service_fee_client,
            'deposit' => $deposit,
            'move_out_fee' => $this->move_out_fee,
            'total' => $total_cost,
            'timeline' => [
                'due_to_reserve' => round($due_to_reserve, 2),
                'due_by_checkin' => round($due_by_checkin, 2),
                'due_by_checkin_date' => $checkin->sub('days', $this->duci_advance_payment_days)->format($date_output_format),
                'future_payments' => round($total_cost - $due_to_reserve - $due_by_checkin, 2),
                'deposit_refund' => $deposit * -1,
                'deposit_refund_date' => $checkout->clone()->addDays(14)->format('n/j/Y')
            ]
        ];
    }

    public function getBackgroundCheckPrice($guests) {
        $rate = $this->rates->firstWhere('month', 'default');

        if (!$rate) {
            throw new Exception('No rates set for this apartment');
        }

        return round($rate->background_check_rate * (int) $guests, 2);
    }

    public static function extractAptAttributes($array) {
        $result = [];
        foreach (self::$structure as $key) {
            if (isset($array[$key])) {
                $result[$key] = $array[$key];

                if ($key === 'available_date') {
                    $result[$key] = new Carbon($array[$key]);
                }

                if ($key === 'size' && !$array[$key]) {
                    $result[$key] = null;
                }
            }
        }

        return $result;
    }
}
