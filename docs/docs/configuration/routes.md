# How to define routes for your application

The routes are defined by a php file. Yes it's not a .ini this time.

Let's start with an example of a route file.

## Example

Let's suppose we create a file called "article.php" in the routes directory. The router will use this route for all our versions and languages since it's in the root of the "/routes" directory.

We will see later how to set a route for another version and language, inherit, etc.

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
        'controller' => 'home/test2',
        'middlewares' => array(
            'App\Colorize'
        ),
        'cacheMinutes' => 10
    )
); 
```
It's a php file returning an array of the routes for the URLs that begin with the name of the php file.

### Explanations
The first route will:

- match (for example): /article/test/something27 (the name of the file is "article.php" so NoFussFramework will prefix the route entries with this string "/article/")
- trigger the method demoAction of the controller index of the home module (application/web/home/controllers/IndexController.php, demoAction)

And the optional parameters in this route entry will:

- set the cache in the client to 5 minutes
- name the route "demo-test-id" so we can create a route in our code (or our templates) to point to this entry without having to write the route manually
- output its content to the html content-type (it's the default anyway)

The second route will:

- set our router to REST mode, the actions will correspond to the http method used in the request (so a GET will call getAction, a POST will call postAction, etc)
- set the content-type to json (so you don't have to write or repeat it in your code)
- set the name to demo-test2-id
- set the controller used to test2 in the home module (application/web/home/controllers/Test2Controller.php)
- instantiate and call the middleware "Colorize" present in our models (/models/Colorize.php), it could be a middleware that adds a css to our html file (it's a basic example)
- set the client's cache time to 10 minutes

## How to write a route file

The file should return an array of arrays like in the first example, and should be named with the first string after the first slash of the url, so:
- /routes/demo.php will be read by the router that will prefix every entry by "/demo/", you don't have to repeat it in your file.

For the root of the application, for URLs that are at the root (/something.html for example), you create a file called _root.php:
- /routes/_root.php will be tried to match when a URL does not contain any slash ("/") or when other routes did not match anything

If you want to set a route to something like "/campaigns" using REST handling, just create the route entry this way:
```
array(
    'regexp' => '$',
    'type' => 'rest',
    'controller' => 'campaign/list',
    'contentType' => 'json',
    'middlewares' => [ 'App\Middleware\NeedsAuth' ]
),
```

Also, in this route we added a middleware for handling http authentication. Please look in the [middlewares section](../development/middlewares.md) for more information on how to write a middleware.

## A focus on REST handling

You can define a REST endpoint pointing to a controller, which means that you just have to write the methods in your controller. Set the route type to "rest" and then in your controller, define the methods:

 - getAction (for a GET request)
 - postAction (for a POST request)
 - putAction (for a PUT request)
 - patchAction (for a PATCH request)
 - deleteAction (for a DELETE request)
 
If your API needs to be used by clients that cannot issue a PUT or DELETE request (dumb firewall/administrator issue), you can send, from the client, a POST request with one of the additional HTTP headers (HTTP_X_HTTP_METHOD, HTTP_X_HTTP_METHOD_OVERRIDE, HTTP_X_METHOD_OVERRIDE) specifying the method to use (that would be PUT or PATCH or DELETE). 

For this to work, a minimal template would be:
```
   array(
        'type' => 'rest',
        'regexp' => 'test2/(name:[a-z\-]+)(id:\d+)',
        'controller' => 'home/test2'
    )
); 
```
 
## How to create a route for a specific version and/or language

The router expects the routes to be written in the /routes directory with this optional hierarchy:

- /routes
- /routes/web or /routes/api
- /routes/web/fr_FR or /routes/web/en_US

The router will then read the route entries in the deepest folder that is matching the URL. If the router detects (with help from the url.ini) that we are requesting in the fr_FR language, then it will look into the corresponding fr_FR folder.

And you can do this the other way, by inheriting, see further in this doc.

## Content-type

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

Just set it in your route to return the correct content type. You can also set the content-type in your controller with:
```
$this->response->setContentType('js');
```

## Naming

You can optionally name a route for using inheritance or writing urls from your app without code duplication. Let's return to that a bit later.

## Regexp matching and route parameters

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

## Route inheritance

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

## More on the route inheritance

The inheritance goes from the lowest folder to the deepest one:

 - /routes/ is the base, used for all versions and locales
 - /routes/<version> is the folder used for this <version> ("/web" in our example)
 - /routes/<version>/<locale> is the folder used for this <version> and this <locale> ("/en")
 
 You can of course re-use a route from the base or from a version in a route that is specific to a locale.

## All variables

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