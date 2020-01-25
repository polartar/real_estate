<?php

namespace App\Console\Commands;

use App\Apartment;
use Illuminate\Console\Command;

class SetApartmentRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apt212:setApartmentRates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets all apartment rates based on the current month and next available date';

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
        $count = Apartment::withoutGlobalScope('active')->count();

        $bar = $this->output->createProgressBar($count);
        $bar->start();


        Apartment::withoutGlobalScope('active')->orderBy('id')->chunk(100, function ($apartments) use ($bar) {
            foreach ($apartments as $apartment) {
                $apartment->updateRate();
                $bar->advance();
            }
        });

        $bar->finish();
    }
}
