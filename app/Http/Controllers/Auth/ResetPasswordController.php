<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use DB;
use App\User;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function reset(Request $request)
    {
        $param = $request->all();
        
        $reset_token = DB::table("password_resets")->where("email", $param['email'])->first();
        
        if(!$reset_token){
            return response()->json( ['ok' => false, 'message' => "This email doesn't exist" ] );
        }
        else if ($reset_token->token != $param['token']){
            return response()->json( ['ok' => false, 'message' => "The token is wrong" ] );
        }

        $user = User::where("email", $param['email'] )->first();

        if($user){
            User::where("email", $param['email'] )->update( ["password"=>Hash::make($param['password'] ) ] );

            return response()->json( ['ok' => true] );
        }

        return response()->json(['ok' => false, 'message' => "This email doesn't exist" ] );

    }
}
