<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FAQReseed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'faq:reseed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reseed the FAQ with the latest questions in the seeder';

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
        // remove existing FAQ
        DB::table('faq')->truncate();

        $this->callSilent('db:seed', ['--class' => 'FAQSeeder']);
        $this->callSilent('cache:clear');
    }
}
