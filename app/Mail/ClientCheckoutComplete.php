<?php

namespace App\Mail;

use App\Apartment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PDF;

class ClientCheckoutComplete extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $pdf = false;
        $filename = false;

        if (isset($this->data->bookingDetails)) {
            $bookingDetails = json_decode($this->data->bookingDetails);
            $apartment = Apartment::find($bookingDetails->id);

            if ($apartment) {
                try {
                    $filename = md5($this->data->bookingDetails) . '.pdf';
                    $filesystem = Storage::disk('local');

                    $booking_details = $apartment->getBookingDetails($bookingDetails->checkindate, $bookingDetails->checkoutdate, $bookingDetails->guests);

                    $pdf = PDF::loadView('pdfs.booking-details', [
                        'booking_details' => $booking_details,
                        'apartment' => $apartment
                    ])->save($filesystem->path($filename));
                } catch (\Exception $e) {
                    // send without attachment

                    $pdf = false;
                }
            }
        }

        if ($pdf) {
            $pdfcontents = file_get_contents($filesystem->path($filename));

            $filesystem->delete($filename);

            return $this->subject('APT212 ONLINE PAYMENT')
                    ->view('emails.client_checkout_complete')
                    ->attachData($pdfcontents, 'bookingDetails.pdf', [
                        'mime' => 'application/pdf'
                    ]);
        }
        else {
            return $this->subject('APT212 ONLINE PAYMENT')->view('emails.client_checkout_complete');
        }
    }
}
