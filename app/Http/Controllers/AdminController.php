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
use Illuminate\Support\Facades\DB;

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

        //DB::enableQueryLog();
        $results = SearchServiceProvider::adminSearch($filters);

        $results['total_active'] = Apartment::count();
        $results['total_inactive'] = Apartment::withoutGlobalScope('active')->where('is_active', false)->count();
        //$results['filters'] = $filters;
        //$results['log'] = DB::getQueryLog();

        return $results;
    }

    public function aptOwners() {
        return Apartment::withoutGlobalScope('active')->distinct('owner_name')->orderBy('owner_name', 'asc')->pluck('owner_name');
    }

    public function ownerStats($owner_name) {
        if (!is_string($owner_name) || !strlen($owner_name)) {
            abort(404);
        }

        return [
            'total' => Apartment::withoutGlobalScope('active')->where('owner_name', $owner_name)->count(),
            'active' => Apartment::where('owner_name', $owner_name)->count(),
            'inactive' => Apartment::withoutGlobalScope('active')->where('owner_name', $owner_name)->where('is_active', 0)->count()
        ];
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
