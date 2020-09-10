<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Exception;
use App\User;
use DB;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendResetLinkEmail(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->get();

        if(!$user) {
            return response()->json( ['ok' => false, 'message' => "This email doesn't exist" ] );
        }

        $Length = 15;
        $token = substr(str_shuffle(md5(time())), 0, $Length);
        $reset_token = DB::table("password_resets")->where("email", $email)->get();

        if($reset_token) {
            DB::table("password_resets")->where("email", $email) ->update( ['token' => $token] );
        }
        else {
            DB::table("password_resets")->insert( ['email' => $email, 'token' => $token] );
        }

        $data = [
            'email' => $email,
            'remember_token' => $token,
        ];
        
        try{
            Mail::send('emails/resetpassword', $data, function ($message) use ($data) {
                $message->from(config('mail.from.address'));
                
                $message->to( $data['email'] )->subject('Forgot Password Link');
           });

           return response()->json( ['ok' => true ] );
        }
        catch (Exception $e) {
            return response()->json( ['ok' => false, 'message' => "Failed to send reset email" ] );
        }
    }
}
