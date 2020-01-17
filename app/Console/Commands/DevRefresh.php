<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DevRefresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run all migrations, install passport, and seed the database';

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
        if (env('APP_ENV') === 'production') {
            $this->comment('*************************************************');
            $this->comment('*           Application In Production!          *');
            $this->comment('*                                               *');
            $this->comment('*  You must explicitly answer yes to continue   *');
            $this->comment('*     You may be asked again for each stage     *');
            $this->comment('*************************************************');

            if (!$this->confirm('Do you really wish to run this command?')) {

                $this->comment('Command Canceled!');
                return;
            }
        }

        $bar = $this->output->createProgressBar(100);
        $bar->start();

        $this->info('');
        $this->info('');
        $this->info('Refreshing Database');
        $this->info('');
        $this->callSilent('migrate:refresh', ['--force' => true]);

        $bar->advance(33);

        $this->info('');
        $this->info('');
        $this->info('Installing Passport');
        $this->info('');
        $this->callSilent('passport:install');

        $bar->advance(33);

        $this->info('');
        $this->info('');
        $this->info('Seeding the database');
        $this->info('');
        $this->callSilent('db:seed', ['--force' => true]);

        $bar->finish();
        $this->info('');
    }
}
