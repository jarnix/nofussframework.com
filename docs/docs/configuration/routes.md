The routing functionality of NoFussFramework is rather easy as usual (lol).

Let's start with an example:

##Example

```
<?php
return array(
    array(
        'type' => 'default',
        'contentType' => 'html',
        'name' => 'demo-test-id',
        'regexp' => 'test/(name:[a-z\-]+)(id:\d+)',
        'controller' => 'home/index/demo',
        'cacheMinutes' => 5
    ),
    array(
        'type' => 'rest',
        'contentType' => 'json',
        'name' => 'demo-test2-id',
        'regexp' => 'test2/(name:[a-z\-]+)(id:\d+)',
        'controller' => 'home/index/demo2',
        'middlewares' => array(
            'App\Colorize'
        ),
        'cacheMinutes' => 10
    )
); 
```

It's a php file returning an array of the routes for the URLs that begin with the name of the php file.

##Rest handling

You can define a rest endpoint pointing to a controller, which means that you just have to write the methods in your contoller. Set the route type to "rest" and then in your controller, define the methods:

 - getAction (for a GET request)
 - postAction (for a POST request)
 - putAction (for a PUT request)
 - deleteAction (for a DELETE request)
 - that's all for now
 
If your API needs to be used by clients that cannot issue a PUT or DELETE request (dumb firewall/administrator issue), you can send, from the client, a POST request with one of the additional HTTP headers (HTTP_X_HTTP_METHOD, HTTP_X_HTTP_METHOD_OVERRIDE, HTTP_X_METHOD_OVERRIDE) specifying the method to use (that would be PUT or DELETE). 
 
##Content type

The various content types that NoFussFramework handles by default are these one :

- atom
- css
- gif
- jpg / jpeg
- png 
- js / javascript
- json
- pdf
- rss
- text
- xml
- html

Just set it in your route to return the correct content type.

##Naming

You can optionally name a route for using inheritance. Let's return to that a bit later.

##Regexp matching and route parameters

The framework only decides of the correct route with a regexp and the name of the route file (for example "demo.php") will be the first part of the regexp. Put everything beginning with /demo/ in demo.php.

For matching the parameters in your routes, use a capturing group with the name of the variable in front of the regexp, for example:
```
test/(name:[a-z\-]+)(id:\d+)
```

will register a parameter named "name" matching all letters from a to z, and another one name "id" matching an integer at the end of the url.

In your controller, get these parameters with:
```
$params = $this->request->getParams();
```

On in a model (not recommended anyway), get them this way:
```
$front = \Nf\Front::getInstance();
$request = $front->getRequest();
$params = $request->getParams();
```

For the url /test/bike45, you would have an array $params that contains:

 - name: "bike"
 - id: "45"  

**Cache settings**

You can easily tell the reverse proxy in front of your webservers and the client browser to set a cache timeout, in minutes.

If you use 0, the page will not be cached (or at least you ask not to), and if you use, say, 5, the page will be 5 minutes in cache.

##Middlewares

You can use a middleware (that is just a "special" class) in your routes so you don't have to use them in your contollers.

The trait that the middleware's class is using will define the behaviour of the middleware, which could be:

 - "pre", called before running the controller's action
 - "post", called after the action

##Route inheritance

If you have multiple languages and of course do not want to maintain multiple routes for the same actions, just give a name to the route, for example, we have the "demo-test-id" route. We want it to point to: home (module)/index (controller)/index (action). 
```
"name" => "demo-test-id"
"regexp" => 'test/(name:[a-z\-]+)(id:\d+)',
"controller" => 'home/index/demo',
```
in the file /routes/demo.php.

Then in /routes/web/en, you can re-use this route but use a different prefix in the URL (say "demoen", that will only be matched on the "en" version because you put it in /routes/web/en). You would create a file in: "/routes/web/en/demoen.php" containing this :

```
return array(
    array(
        'type' => 'inherit',
        'from' => 'demo-test-id'
    )
);
```

The framework would then use the settings of the route defined before: same regexp, same controller, same everything but the first part of the url. It would not be "/demo/bike45" but "/demoen/bike45".   

##More on the route inheritance

The inheritance goes from the lowest folder to the deepest one:

 - /routes/ is the base, used for all versions and locales
 - /routes/<version> is the folder used for this <version> ("/web" in our example)
 - /routes/<version>/<locale> is the folder used for this <version> and this <locale> ("/en")
 
 You can of course re-use a route from the base or from a version in a route that is specific to a locale.

##All variables

A route is an array:

| Key        | Value           | Default  |
| ------------- |-------------| -----|
| type      | default / rest / inherit | default |
| contentType      | html / json / ... (all the types defined below) |   html |
| name | give it a name if you want to reuse it   |   |
| regexp | the regular expression for the remaining part of the route (after the name of the route/file (.php)  | N/A |
| controller | the module/controller/action to use  | N/A |
| cacheMinutes | number of minutes to cache the response (proxy and/or client)  | 0, by default the pages are NOT cached |
| middlewares | the middlewares to call, enter the names of the middlewares in an array | <none> |
| from | if you set the type to "inherit", enter the name of the route to inherit from | N/A |

##How to specify a route for a non prefixed url (like /bla.html for example)

Since this URL does not have a "prefix", we can not name a file with nothing so we add the routes in _root.php, for example:

**/routes/_root.php**

```
<?php
return (array(
    array(
        'type' => 'default',
        'name' => 'root-bla',
        'regexp' => 'bla\.html',
        'controller' => 'home/index/index'
    )
));
```

In the example above, we gave a name "root-bla" to the route but it's optional of course. 

You can obviously setup different "_root" routes in each version and locale, and inherit from them too.