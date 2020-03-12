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
use App\Referral;
use App\Agents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    public function referrals() {
        $params = request()->params;

        $filters = json_decode($params, true);

        $limit = isset($filters['limit']) && is_numeric($filters['limit']) && (int) $filters['limit'] > 0 ? (int) $filters['limit'] : 40;
        $offset = isset($filters['offset']) && is_numeric($filters['limit']) && (int) $filters['offset'] >= 0 ? (int) $filters['offset'] : 0;

        $referrals = Referral::skip($offset)->take($limit);
        if (isset($filters['query']) && $filters['query']) {
            $referrals->where(function($query) use ($filters) {
                $query->where('id', '=', $filters['query'])
                    ->orWhere('referrer_name', 'LIKE', '%' . $filters['query'] . '%')
                    ->orWhere('referrer_email', 'LIKE', '%' . $filters['query'] . '%')
                    ->orWhere('referrer_phone', 'LIKE', '%' . $filters['query'] . '%')
                    ->orWhere('referral_name', 'LIKE', '%' . $filters['query'] . '%')
                    ->orWhere('referral_email', 'LIKE', '%' . $filters['query'] . '%')
                    ->orWhere('referral_phone', 'LIKE', '%' . $filters['query'] . '%');
            });
        }

        if (isset($filters['sortBy']) && $filters['sortBy']) {
            switch ($filters['sortBy']) {
                case 'referrer_name_asc':
                    $referrals->orderBy('referrer_name', 'ASC');
                break;
                case 'referrer_name_desc':
                    $referrals->orderBy('referrer_name', 'desc');
                break;
                case 'referrer_email_asc':
                    $referrals->orderBy('referrer_email', 'asc');
                break;
                case 'referrer_email_desc':
                    $referrals->orderBy('referrer_email', 'desc');
                break;
                case 'referral_name_asc':
                    $referrals->orderBy('referral_name', 'asc');
                break;
                case 'referral_name_desc':
                    $referrals->orderBy('referral_name', 'desc');
                break;
                case 'referral_email_asc':
                    $referrals->orderBy('referral_email', 'asc');
                break;
                case 'referral_email_desc':
                    $referrals->orderBy('referral_email', 'desc');
                break;
                case 'created_at_asc':
                    $referrals->orderBy('created_at', 'asc');
                break;
                case 'created_at_desc':
                    $referrals->orderBy('created_at', 'desc');
                break;
            }
        }

        return [
            'total' => $referrals->count(),
            'results' => $referrals->get()
        ];
    }

    public function deleteReferral(Referral $referral) {
        try {
            $referral->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false], 400);
        }
    }

    public function agents() {

        Log::error("WE ARE HERE");

        $agents = Agents::all();
       
        return $agents;
    }

    public function deleteAgent(Agents $agent) {
        try {
            $agent->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false], 400);
        }
    }
}
