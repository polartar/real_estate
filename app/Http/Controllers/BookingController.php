<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessStripeWebhook;
use App\Mail\ClientCheckoutComplete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use stdClass;
use Stripe\Exception\SignatureVerificationException;
use TomorrowIdeas\Plaid\Plaid;

class BookingController extends Controller
{
    //
    public function paymentIntent(Request $request)
    {
        if (!is_numeric($request->amount) || $request->amount < 0) {
            return response()->json(['error' => 'Invalid amount'], 400);
        }

        try {
            \Stripe\Stripe::setApiKey(config('apt212.stripe_api_key'));

            $metadata = $request->all();
            $metadata['api'] = config('app.url');

            $intent = \Stripe\PaymentIntent::create([
                'amount' => $request->amount * 100, // amount is represented in cents
                'currency' => 'usd',
                'metadata' => $metadata,
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
    public function stripeWebhook(Request $request)
    {
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
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Failed webhook validation'], 400);
        }

        dispatch(new ProcessStripeWebhook($event));

        return response()->json(['message' => 'received']);
    }

    /**
     * Validate bank account with Stripe
     */
    public function checkoutACH(Request $request)
    {
        if (!is_numeric($request->amount) || $request->amount < 0) {
            return response()->json(['error' => 'Invalid amount'], 400);
        }

        $plaid_secret = config('apt212.plaid_environment') === 'production' ? config('apt212.plaid_production_secret') : config('apt212.plaid_sandbox_secret');
        $plaid_client_id = config('apt212.plaid_client_id');
        // $plaid_public_key = config('apt212.plaid_public_key');

        // $client = new Plaid($plaid_client_id, $plaid_secret, $plaid_public_key);
        // $client->setEnvironment('sandbox');

        // $auth = $client->getAuth($request->token);

        // return response()->json($auth);

        $plaid_api = 'https://sandbox.plaid.com';
        if (config('apt212.plaid_environment') === 'production') {
            $plaid_api = 'https://production.plaid.com';
        }

        $headers[] = 'Content-Type: application/json';
        $params = [
            'client_id' => config('apt212.plaid_client_id'),
            'secret' => $plaid_secret,
            'public_token' => $request->token,
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "{$plaid_api}/item/public_token/exchange");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 80);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        if (!$result = curl_exec($ch)) {
            abort(response()->json(['errors' => ["There was an issue completing the ACH checkout. Transaction has not completed."]], 400));
        }
        curl_close($ch);

        $jsonParsed = json_decode($result);

        $btok_params = [
            'client_id' => $plaid_client_id,
            'secret' => $plaid_secret,
            'access_token' => $jsonParsed->access_token,
            'account_id' => $request->account_id
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "{$plaid_api}/processor/stripe/bank_account_token/create");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($btok_params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_TIMEOUT, 80);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        if (!$result = curl_exec($ch)) {
            abort(response()->json(['errors' => ["There was an issue completing the ACH checkout. Transaction has not completed."]], 400));
        }
        curl_close($ch);

        $btok_parsed = json_decode($result);

        // capture the charge
        $metadata = $request->all();
        $metadata['api'] = config('app.url');
        unset($metadata['token']);
        unset($metadata['account_id']);

        try {
            \Stripe\Stripe::setApiKey(config('apt212.stripe_api_key'));

            $charge = \Stripe\Charge::create([
                'amount' => $request->amount * 100, // amount is represented in cents
                'currency' => 'usd',
                'source' => $btok_parsed->stripe_bank_account_token,
                'description' => 'Booking for listing: ' . $request->webid,
                'capture' => true,
                'receipt_email' => $request->email,
                'metadata' => $metadata
            ]);
        } catch (\Exception $e) {
            abort(response()->json(['errors' => [$e->getMessage()]], 400));
        }

        return response()->json(['success' => true]);
    }

    // public function previewMail(Request $request) {
    //     $metadata = new stdClass();
    //     $metadata->firstname = 'Matt';
    //     $metadata->lastname = 'Beckett';
    //     $metadata->amount = 123;
    //     $metadata->email = 'matt@arckinteractive.com';
    //     $metadata->webid = 1;
    //     $metadata->phone = '2506670871';
    //     $metadata->using_agent = 'no';
    //     $metadata->agent = 'Boston Rob';

    //     return new ClientCheckoutComplete($metadata);
    // }
}
