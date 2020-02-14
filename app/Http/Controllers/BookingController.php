<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessStripeWebhook;
use App\Mail\ClientCheckoutComplete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use stdClass;

class BookingController extends Controller
{
    //
    public function paymentIntent(Request $request) {
        if (!is_numeric($request->amount) || $request->amount < 0) {
            return response()->json(['error' => 'Invalid amount'], 400);
        }

        try {
            \Stripe\Stripe::setApiKey(config('apt212.stripe_api_key'));

            $intent = \Stripe\PaymentIntent::create([
                'amount' => $request->amount * 100, // amount is represented in cents
                'currency' => 'usd',
                'metadata' => $request->all(),
                'receipt_email' => $request->email
            ]);

            return response()->json($intent->client_secret);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->message], 500);
        }
    }

    /**
     * Validate and queue a stripe webhook
     */
    public function stripeWebhook(Request $request) {
        if (!isset($_SERVER['HTTP_STRIPE_SIGNATURE'])) {
            return response()->json(['error' => 'Failed webhook validation'], 400);
        }

        \Stripe\Stripe::setApiKey(config('apt212.stripe_api_key'));

        $endpoint_secret = config('apt212.stripe_webhook_secret');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $payload = @file_get_contents('php://input');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Failed webhook validation'], 400);
        }

        dispatch(new ProcessStripeWebhook($event));

        return response()->json(['message' => 'received']);
    }

    public function stripeWebhookProcess(Request $request) {
        $metadata = new stdClass();
        $metadata->firstname = 'Matt';
        $metadata->lastname = 'Beckett';
        $metadata->amount = 123;
        $metadata->email = 'matt@arckinteractive.com';
        $metadata->webid = 1;
        $metadata->phone = '2506670871';
        $metadata->using_agent = 'no';
        $metadata->agent = 'Boston Rob';

        return new ClientCheckoutComplete($metadata);
    }
}
