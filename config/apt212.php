<?php

return [
    'mapbox_api_key' => env('MAPBOX_API_KEY', ''),

    'stripe_api_key' => env('STRIPE_PRIVATE_KEY', ''),

    'stripe_webhook_secret' => env('STRIPE_WEBHOOK_SECRET', ''),

    'office_email' => env('OFFICE_EMAIL', 'office@apt212.com')
];
