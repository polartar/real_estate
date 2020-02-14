<?php

namespace App\Console\Commands;

use App\ImageUpload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ClearOldImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'apt212:clearOldImages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes uploaded images that are unattached after 24hrs';

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
        $count = ImageUpload::whereNull('attachment_id')->where('created_at', '<', now()->sub('1 day'))->count();

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $imageUploads = ImageUpload::whereNull('attachment_id')->where('created_at', '<', now()->sub('1 day'))->get();

        foreach ($imageUploads as $image) {
            $image->delete();
            $bar->advance();
        }

        $bar->finish();
    }
}
