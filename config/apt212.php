<?php

return [
    'mapbox_api_key' => env('MAPBOX_API_KEY', ''),

    'stripe_api_key' => env('STRIPE_PRIVATE_KEY', ''),

    'stripe_webhook_secret' => env('STRIPE_WEBHOOK_SECRET', ''),

    'plaid_client_id' => env('PLAID_CLIENT_ID', ''),

    'plaid_public_key' => env('PLAID_PUBLIC_KEY', ''),

    'plaid_production_secret' => env('PLAID_PRODUCTION_SECRET'),

    'plaid_sandbox_secret' => env('PLAID_SANDBOX_SECRET'),

    'plaid_environment' => env('PLAID_ENVIRONMENT', 'sandbox'),

    'office_email' => env('OFFICE_EMAIL', 'office@apt212.com')
];
