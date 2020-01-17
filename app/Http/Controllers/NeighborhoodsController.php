<?php

namespace App\Http\Controllers;

use App\Neighborhood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NeighborhoodsController extends Controller
{
    public function geocodeAddress($address) {
        $access_token = config('apt212.mapbox_api_key');

        $endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/' . urlencode($address) . '.json?access_token=' . $access_token . '&cachebuster=' . time();

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);

        $error = curl_error($ch);

        curl_close($ch);

        if ($error) {
            abort(500, 'Geocode API error: ' . $error);
        }

        if (!$result) {
            abort(404, 'Could not geocode the address');
        }

        $geocode = json_decode($result, true);

        if (isset($geocode['features']) && is_array($geocode['features'])) {
            $lng = $geocode['features'][0]['center'][0];
            $lat = $geocode['features'][0]['center'][1];

            $neighborhoods = Neighborhood::all();

            $included_neighborhoods = [];
            foreach ($neighborhoods as $neighborhood) {
                if ($neighborhood->containsPoint($lng, $lat)) {
                    $included_neighborhoods[] = $neighborhood;
                }
            }

            return [
                'lat' => $lat,
                'lng' => $lng,
                'place_name' => $geocode['features'][0]['place_name'],
                'neighborhoods' => $included_neighborhoods
            ];
        }

        abort(404, 'Could not geocode the address');
    }

    public function neighborhoodsFromPoint($lng, $lat) {
        $neighborhoods = Neighborhood::all();

        if (!is_numeric($lng) || !is_numeric($lat)) {
            abort(500, 'Invalid lat/lng parameters');
        }

        $included_neighborhoods = [];
        foreach ($neighborhoods as $neighborhood) {
            if ($neighborhood->containsPoint($lng, $lat)) {
                $included_neighborhoods[] = $neighborhood;
            }
        }

        return $included_neighborhoods;
    }
}
