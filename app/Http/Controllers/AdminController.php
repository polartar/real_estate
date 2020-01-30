<?php

namespace App\Http\Controllers;

use App\Amenity;
use App\Apartment;
use App\BedroomType;
use App\BuildingType;
use App\Http\Requests\UpdateOwnerGlobal;
use App\Neighborhood;
use App\Subway;
use App\User;
use App\Providers\SearchServiceProvider;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function dashboardCounts() {

        return [
            [
                'title' => 'Users',
                'count' => User::count()
            ],
            [
                'title' => 'Listings',
                'count' => Apartment::withoutGlobalScope('active')->count()
            ],
            [
                'title' => 'Neighborhoods',
                'count' => Neighborhood::count()
            ],
            [
                'title' => 'Amenities',
                'count' => Amenity::count()
            ],
            [
                'title' => 'Subways',
                'count' => Subway::count()
            ],
            [
                'title' => 'Bedroom Types',
                'count' => BedroomType::count()
            ],
            [
                'title' => 'Building Types',
                'count' => BuildingType::count()
            ]
        ];
    }

    public function listings() {
        $params = request()->params;

        $filters = json_decode($params, true);

        return SearchServiceProvider::adminSearch($filters);
    }

    public function aptOwners() {
        return Apartment::distinct('owner_name')->orderBy('owner_name', 'asc')->pluck('owner_name');
    }

    public function ownerGlobal(UpdateOwnerGlobal $request, $owner_name) {
        $data = $request->validated();

        $apt_data = Apartment::extractAptAttributes($data);

        Apartment::withoutGlobalScope('active')->where('owner_name', $owner_name)->orderBy('id')->chunk(100, function ($apartments) use ($apt_data, $data) {
            foreach ($apartments as $apartment) {
                $apartment->update($apt_data);

                if (isset($data['rates'])) {
                    $apartment->setRates($data['rates']);
                }
            }
        });

        return [
            'data' => $data,
            'owner' => $owner_name
        ];
    }
}
