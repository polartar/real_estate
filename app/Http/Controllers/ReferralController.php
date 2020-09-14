<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReferralSubmission;
use App\Jobs\ProcessReferral;
use App\Referral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReferralController extends Controller
{

    public function referral(ReferralSubmission $request) {
        $referral = Referral::create($request->all());

        dispatch(new ProcessReferral($referral));
        return $referral;
    }

    public function createUser(Request $request)
    {
        $userRole = config('roles.models.role')::where('name', '=', 'User')->first();

        $newUser = config('roles.models.defaultUser')::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password
        ]);

        $newUser;
        $newUser->attachRole($userRole);

        return response()->json(['success' => true]);

    }
}
