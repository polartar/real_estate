<?php

namespace App\Providers;

use App\MapMarker;
use Illuminate\Support\ServiceProvider;

class MapMarkerServiceProvider extends ServiceProvider
{
    // map zoom levels to a distance in lat/lng
    private static $zoomMap = [
        1 => 0.04,
        2 => 0.008,
        3 => 0.002,
        4 => 0.0008,
        5 => 0.0002
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Assigns markers for each zoom level to an apartment
     * Creates markers at the apartment location if none are in range
     */
    public static function assignMarkers($apartment) {
        // remove any existing marker attachments
        $apartment->map_markers()->detach();

        foreach (self::$zoomMap as $zoom_level => $distance) {
            // first get any markers with lat/lngs within the distance
            $latmin = $apartment->lat - $distance;
            $latmax = $apartment->lat + $distance;
            $lngmin = $apartment->lng - $distance;
            $lngmax = $apartment->lng + $distance;

            $existingMarkers = MapMarker::where('zoom', $zoom_level)
                ->whereBetween('lat', [$latmin, $latmax])
                ->whereBetween('lng', [$lngmin, $lngmax])
                ->get();

            if (!$existingMarkers->count()) {
                // there are no markers within range
                // create a new marker
                $marker = new MapMarker();
                $marker->lat = $apartment->lat;
                $marker->lng = $apartment->lng;
                $marker->zoom = $zoom_level;
                $marker->save();

                $apartment->map_markers()->attach($marker);

            }
            else {
                // there could be multiple markers in range if this apt is in between
                // two close markers
                // for now we'll just assign it to the first one
                // maybe later we'll try to figure out which one is the absolute closest
                $apartment->map_markers()->attach($existingMarkers->get(0));
            }
        }
    }
}
