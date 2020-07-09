<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;

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
            '/' => 0.8,
            '/search-apartments' => 0.5,
            '/booking' => 0.5,
        ];

        foreach ($paths as $path => $priority) {
            $sitemap->add(Url::create($path)
                ->setPriority($priority));
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
