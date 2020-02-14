<?php

namespace App\Jobs;

use App\Mail\ClientCheckoutComplete;
use App\Mail\OfficeCheckoutComplete;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProcessStripeWebhook implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $event;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($event)
    {
        //
        $this->event = $event;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        switch ($this->event->type) {
            case 'charge.succeeded':

                $metadata = $this->event->data->object->metadata;

                // Stripe\StripeObject Object
                // (
                //     [payment_method] => credit
                //     [amount] => 123
                //     [webid] => Matt J Beckett
                //     [using_agent] => no
                //     [agent] => agent@apt212.com
                //     [firstname] => Matt
                //     [lastname] => Beckett
                //     [email] => matt+test@arckinteractive.com
                //     [phone] => 2506670871
                //     [zipcode] => V9T 5M6
                //     [tos] => 1
                // )

                $metadata->transaction_id = $this->event->data->object->id;

                // send emails
                Mail::to($metadata->email)->send(new ClientCheckoutComplete($metadata));

                if (config('apt212.office_email')) {
                    Mail::to(config('apt212.office_email'))->send(new OfficeCheckoutComplete($metadata));
                }

                if ($metadata->using_agent === 'yes') {
                    Mail::to($metadata->agent)->send(new OfficeCheckoutComplete($metadata));
                }
            break;
        }
    }
}
