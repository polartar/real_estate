<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use League\OAuth2\Server\AuthorizationServer;
use Laravel\Passport\TokenRepository;
use Lcobucci\JWT\Parser as JwtParser;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\DB;

class SPAAuthController extends AccessTokenController
{
    public function __construct(AuthorizationServer $server,
                                TokenRepository $tokens,
                                JwtParser $jwt)
    {
        parent::__construct($server, $tokens, $jwt);
    }

    public function login(ServerRequestInterface $request)
    {

        $results = DB::table('oauth_clients')->where('password_client', 1)->limit(1)->get();

        if (!count($results)) {
            return response('No password grant available', 401);
        }

        $client_id = $results[0]->id;
        $client_secret = $results[0]->secret;

        $parsedBody = $request->getParsedBody();

        $parsedBody['grant_type'] = 'password';
        $parsedBody['client_id'] = $client_id;
        $parsedBody['client_secret'] = $client_secret;
         
        return parent::issueToken($request->withParsedBody($parsedBody));
    }

    public function logout() {
        auth()->user()->tokens->each->delete();

        return response()->json('Logged out', 200);
    }
}
