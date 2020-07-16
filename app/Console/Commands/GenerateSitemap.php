<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;
use App\Apartment;
use App\Neighborhood;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

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
        //
        $sitemap = Sitemap::create();

        $paths = [
            '/' => [
                'priority' => 0.8,
                'change' => Url::CHANGE_FREQUENCY_DAILY
            ],
            '/booking' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
            '/corporate-housing' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
            '/faq' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
            '/privacy-policy' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
            '/referral' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
            '/rooms-for-rent' => [
                'priority' => 0.4,
                'change' => Url::CHANGE_FREQUENCY_WEEKLY
            ],
            '/search-apartments' => [
                'priority' => 0.5,
                'change' => Url::CHANGE_FREQUENCY_DAILY
            ],
            '/nyc-neighborhoods' => [
                'priority' => 0.2,
                'change' => Url::CHANGE_FREQUENCY_MONTHLY
            ],
        ];

        // add all of our apartment listing pages
        Apartment::orderBy('id')->chunk(100, function ($apartments) use (&$paths) {
            foreach ($apartments as $apartment) {
                $paths[$apartment->url_path] = [
                    'priority' => 0.5,
                    'change' => Url::CHANGE_FREQUENCY_DAILY
                ];
            }
        });

        // add all of our neighborhood pages
        Neighborhood::orderBy('id')->chunk(100, function ($neighborhoods) use (&$paths) {
            foreach ($neighborhoods as $neighborhood) {
                $paths['nyc-neighborhood/' . $neighborhood->slug . '/apartments'] = [
                    'priority' => 0.5,
                    'change' => Url::CHANGE_FREQUENCY_DAILY
                ];

            }
        });

        foreach ($paths as $path => $params) {
            $url = Url::create($path)->setPriority($params['priority']);

            if (isset($params['change'])) {
                $url->setChangeFrequency($params['change']);
            }

            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
