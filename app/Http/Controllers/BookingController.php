<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
            response()->json(['error' => $e->message], 500);
        }
    }
}
