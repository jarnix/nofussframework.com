You can use a middleware (that is just a "special" class) in your routes so you don't have to call them in your controllers.

The trait that the middleware's class is using will define the behaviour of the middleware, which could be:

 - "pre", called before running the controller's action
 - "post", called after the action

## The CORS middleware

For example, the "CORS" middleware is provided with the framework and handle CORS requests.

Its settings are explained in the [config.ini optional settings](../configuration/config.ini-optional.md#enable-cors) documentation page.

## An example for authentication

We need a JWT authentication for our application. We just add this middleware in all of our protected routes by adding:
```
'middlewares' => [ 'App\User\NeedsAuth' ]
```
to the route entries.

Then we create a file in our /models directory, in a subdirectory "User", the file would be name "NeedsAuth.php":

```
<?php

namespace App\Middleware;

use \Nf\Middleware\MiddlewareInterface;
use \Nf\Middleware\Pre;

use \App\User;

class NeedsAuth implements \Nf\Middleware\MiddlewareInterface {
    
    use Pre;
    
    public function execute() {
        
        $needsAuth = true;
        
        // this is a case sensitive function (!)
        $headers = apache_request_headers();
        
        $authHeader = null;
        foreach($headers as $header => $value) {
            if(strtolower($header) == 'authorization') {
                $authHeader = $value;
                break;
            }
        }
        
        if ($authHeader !== null) {
            $jwt = str_replace('Bearer ', '', $authHeader);
            $needsAuth = User::checkJWTToken($jwt);
        }
        
        if($needsAuth) {
            throw new \Nf\Error\Exception\Http\Unauthorized('authentication required');
            return false;
        }
        else {
            return true;
        }
    }   
}
```

Note that this middleware uses the "Pre" trait, that means that it will be called in the "Pre" flight, before instantiating the controller and calling the right action.

This middleware returns false when the JWT authorization token is invalid or true if it's valid, thus allowing the action of our controller to be executed.

## And more

It was a simple example, you can of course parse the request parameters to allow or not the access to an object in your application, or implement user rights and user profiles, etc, using another middleware.   