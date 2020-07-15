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
                'url' => $request->url(),
                'image' => '/assets/images/og-social.jpg'
            ]
        ];

        /**
         * 
         * 
         * Add new page SEO here
         * key = path
         * value = override
         * 
         * 
         */
        $pageValues = [
            'booking' => [
                'title' => 'APT212 Furnished Apartments, Rooms, Corporate House Booking',
                'description' => 'Book your furnished apartments, rooms and corporate house online with APT212. We accept all payment mode like Visa, MasterCard and more. For any query call us today.'
            ],
            'corporate-housing' => [
                'title' => 'Corporate Housing - Apartments, Rooms for Business Traveller’s | APT212.com',
                'description' => 'APT212 is the NYC’s number 1 source for short-term corporate housing solution for business travelers. Search, find, & book your corporate rooms, apartments today.'
            ],
            'faq' => [
                'title' => 'FAQ | APT212',
                'description' => "We have tried hard to make APT212 a simple platform for all who looking for furnished apartments in New York City. If you have any query that aren't answered here, please get in touch."
            ],
            'referral' => [
                'title' => 'REFER A FRIEND & EARN $200 | APT212',
                'description' => 'Help your friend find the best short term, furnished rental options in NYC and in turn get a $200 gift card from APT212. We are a trusted player in the market.'
            ],
            'rooms-for-rent' => [
                'title' => 'Private Rooms for Rent in New York, Manhattan NYC | APT212',
                'description' => 'Welcome to APT212, Your number 1 source to find a room for rent around NYC & Manhattan. Use our quick filters and find your next room for rent in New York City.'
            ],
            'search-apartments' => [
                'title' => 'NYC Apartment Finder | Search 1,000+ Short-term Rental in NYC | APT212',
                'description' => 'Search, find 1,000+ furnished apartments in New York City at your fingertips with APT212. Find budget-friendly apartments, private rooms with modern amenities.'
            ],
        ];

        if (isset($pageValues[$request->path()])) {
            $config = array_merge($config, $pageValues[$request->path()]);
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

        foreach ($dom->getElementsByTagName("link") as $link) {
            if (strpos($link->getAttribute('rel'), 'canonical') !== false) {
                $url = isset($config['canonical']) ? $config['canonical'] : $request->url();

                $link->setAttribute('href', $url);
            }
        }

        /**
         * Return the SEO-d html
         */
        return $dom->saveHTML();
    }
}
