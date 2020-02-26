<?php

namespace App\Mail;

use App\Referral;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReferralMailReferrer extends Mailable
{
    use Queueable, SerializesModels;

    public $referral;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Referral $referral)
    {
        //
        $this->referral = $referral;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('APT212 Referral Received')->view('emails.referrals.referrer');
    }
}
