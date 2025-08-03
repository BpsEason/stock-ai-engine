<?php

return [
    'secret' => env('JWT_SECRET'),
    'ttl' => env('JWT_TTL', 60),
    'refresh_ttl' => env('JWT_REFRESH_TTL', 20160),
    'algo' => 'HS256',
    'keys' => [
        'public' => null,
        'private' => null,
        'passphrase' => null,
    ],
    'user' => 'App\Models\User',
    'identifier' => 'id',
    'required_claims' => ['iss', 'iat', 'exp', 'nbf', 'sub', 'jti'],
    'blacklist_enabled' => env('JWT_BLACKLIST_ENABLED', true),
    'providers' => [
        'user' => 'Tymon\JWTAuth\Providers\User\Eloquent',
        'jwt' => 'Tymon\JWTAuth\Providers\JWT\Lcobucci',
    ],
];
