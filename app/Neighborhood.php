<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Neighborhood extends Model
{
    public $timestamps = false;

    //
    protected $casts = [
        'perimeter_coordinates' => 'array',
        'tags' => 'array'
    ];

    protected $appends = [
        'center'
    ];


    /**
     * Relationships
     */
    function region() {
        return $this->belongsTo(Region::class);
    }

    function apartments() {
        return $this->belongsToMany(Apartment::class);
    }

    /**
     * Custom attributes
     */
    public function getCenterAttribute() {
        $points = $this->perimeter_coordinates;

        $maxlng = $minlng = $maxlat = $minlat = null;

        foreach ($points[0] as $point) {
            if ($maxlng === null) {
                $maxlng = $minlng = $point[0];
                $maxlat = $minlat = $point[1];

                continue;
            }

            $maxlng = max($maxlng, $point[0]);
            $minlng = min($minlng, $point[0]);
            $maxlat = max($maxlat, $point[1]);
            $minlat = min($minlat, $point[1]);
        }

        return [
            round(($maxlng + $minlng) / 2, 7),
            round(($maxlat + $minlat) / 2, 7)
        ];
    }

    /**
     * Custom Methods
     */

    /**
     * Does this neighborhood contain a geopoint?
     *
     * @return bool
     *
     * Adapted from: https://assemblysys.com/php-point-in-polygon-algorithm/
     */
    public function containsPoint($lng, $lat) {
        // this can only contain a point if the coords are set

        if (!$this->perimeter_coordinates) {
            return false;
        }

        $vertices = $this->perimeter_coordinates[0];

        // Check if the point sits exactly on a vertex
        foreach ($vertices as $vertex) {
            if ($vertex[0] === $lng && $vertex[1] === $lat) {
                return true;
            }
        }

        // Check if the point is inside the polygon or on the boundary
        $intersections = 0;
        $vertices_count = count($vertices);

        for ($i = 1; $i < $vertices_count; $i++) {
            $vertex1 = $vertices[$i - 1];
            $vertex2 = $vertices[$i];

            // Check if point is on a horizontal polygon boundary
            if ($vertex1[1] == $vertex2[1] && $vertex1[1] == $lat && $lng > min($vertex1[0], $vertex2[0]) && $lng < max($vertex1[0], $vertex2[0])) {
                return true;
            }

            if ($lat > min($vertex1[1], $vertex2[1]) && $lat <= max($vertex1[1], $vertex2[1]) && $lng <= max($vertex1[0], $vertex2[0]) && $vertex1[1] != $vertex2[1]) {
                $xinters = ($lat - $vertex1[1]) * ($vertex2[0] - $vertex1[0]) / ($vertex2[1] - $vertex1[1]) + $vertex1[0];
                if ($xinters == $lng) { // Check if point is on the polygon boundary (other than horizontal)
                    return true;
                }

                if ($vertex1[0] == $vertex2[0] || $lng <= $xinters) {
                    $intersections++;
                }
            }
        }

        // If the number of edges we passed through is odd, then it's in the polygon.
        if (!$intersections) {
            // no intersections at all? not in the polygon
            return false;
        }

        if ($intersections % 2 != 0) {
            return true;
        } else {
            return false;
        }
    }
}
