<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SPAController extends Controller
{
    public function serve(Request $request) {

        $request_token = md5($request->fullUrl() . json_encode($request->all()));

        $html = Cache::remember('spa-' . $request_token, 600, function() use ($request) {
            $contents = file_get_contents(public_path('index.html'));

            return $this->SEO($contents, $request);
        });

        return response($html);
    }


    /**
     * modify the metatags depending on the route
     */
    public function SEO($html, $request) {

        /**
         * Load the html into an object we can manipulate
         */
        $dom = new \DOMDocument;

        libxml_use_internal_errors(true);
        $dom->loadHTML($html);
        libxml_clear_errors();


        /**
         * Default values
         */
        $config = [
            'title' => 'APT212 - #1 SOURCE FOR NEW YORK CITY FURNISHED APARTMENTS',
            'description' => "New York City's number 1 source for furnished apartments, sublets, and legal short term rentals. Search, find, and book your furnished apartment today.",
            'og' => [
                'type' => 'article',
                'url' => 'https://apt212.com/',
                'image' => '/assets/images/og-social.jpg'
            ]
        ];

        /**
         * Replace default values with page-specific values
         */
        switch ($request->path()) {
            case 'search-apartments':
                $config['title'] = 'NYC Apartment Finder | Search 1,000+ Short-term Rental in NYC | APT212';
                $config['description'] = 'Search, find 1,000+ furnished apartments in New York City at your fingertips with APT212. Find budget-friendly apartments, private rooms with modern amenities.';
            break;
        }


        /**
         * Set the new values back into the metatags
         */

        if (isset($config['title'])) {
            foreach ($dom->getElementsByTagName('title') as $tag) {
                $tag->nodeValue = $config['title'];
            }
        }

        foreach ($dom->getElementsByTagName("meta") as $meta) {
            foreach ($config as $key => $val) {
                switch ($key) {
                    case 'title':
                        if (!isset($config['title'])) {
                            break;
                        }

                        if (strpos($meta->getAttribute("name"), 'title') !== false) {
                            $meta->setAttribute('content', $val);
                        }

                        if (strpos($meta->getAttribute('property'), 'og:title') !== false) {
                            $meta->setAttribute('content', $val);
                        }
                    break;

                    case 'description':
                        if (strpos($meta->getAttribute('name'), 'description') !== false) {
                            $meta->setAttribute('content', $val);
                        }

                        if (strpos($meta->getAttribute('property'), 'og:description') !== false) {
                            $meta->setAttribute('content', $val);
                        }
                    break;

                    case 'og':
                        foreach ($val as $k => $v) {
                            if (strpos($meta->getAttribute('property'), 'og:' . $k) !== false) {
                                $meta->setAttribute('content', $v);
                            }
                        }
                    break;
                }
            }
        }

        /**
         * Return the SEO-d html
         */
        return $dom->saveHTML();
    }
}
