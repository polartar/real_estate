<?php

namespace App\Jobs;

use App\Mail\ReferralMailReferral;
use App\Mail\ReferralMailReferrer;
use App\Referral;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ProcessReferral implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $referral;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Referral $referral)
    {
        //
        $this->referral = $referral;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $referral_email = $this->referral->referral_email;
        $referrer_email = $this->referral->referrer_email;

        Mail::to($referral_email)->send(new ReferralMailReferrer($this->referral));
        Mail::to($referrer_email)->send(new ReferralMailReferral($this->referral));
    }
}
