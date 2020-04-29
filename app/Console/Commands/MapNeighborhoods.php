<?php

namespace App\Console\Commands;

use App\Neighborhood;
use App\Apartment;
use App\Providers\NeighborhoodServiceProvider;
use Illuminate\Console\Command;

class MapNeighborhoods extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apt212:MapNeighborhoods';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maps all apartment listing neighborhoods';

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
                NeighborhoodServiceProvider::assignNeighborhoods($apartment);
            }
        });
    }
}
