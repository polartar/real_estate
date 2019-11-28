<?php

namespace App\Console\Commands;

use App\Apartment;
use App\Providers\MapMarkerServiceProvider;
use Illuminate\Console\Command;

class RegenerateMarkers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'markers:regenerate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Regenerate map markers for all apartments';

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
        Apartment::orderBy('id')->chunk(100, function ($apartments) {
            foreach ($apartments as $apartment) {
                MapMarkerServiceProvider::assignMarkers($apartment);
            }
        });
    }
}
