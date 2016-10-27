Controllers

# http example

A basic controller has methods that match the route entries, or the url hierarchy in cli mode.

In http mode (everything that is not cli is in http mode and uses the routing entries):

- a controller for a version "web" will be in the **/application/web** folder
- in the corresponding module (for example "**article**"): **/application/web/article**
- will be in the "App\Article" namespace (**App** is the namespace defined in the **index.php** of your application, **Article** is the sub namespace for this module)
- in a subfolder "controllers" of this module: **/application/web/article/controllers/**
- and be named in CamelCase with the Controller suffix

So a route defined this way:

**/routes/web/article.php**
```
array(
    'regexp' => 'review/(name:[a-z\-]+)(id:\d+)',
    'controller' => 'article/index/review'
)
```
will point to:

- /application/web/article/controllers/IndexController.php
- and the framework will call the **reviewAction** method of this file.

The fact that the namespace and the route have the same name is not required, obviously.

```
<?php

namespace App\Article;

class IndexController extends \Nf\Front\Controller
{
    public function reviewAction()
    {
        // your code goes here
```

# other http versions

For other http versions that you may define in your url.ini, just put your module in the /application/<version>.

For example, an api version would be in /application/api, with this line in this example url.ini:
```
[regexps]
en_US-dev-api="/api\.myapp\.dev\.example\.com/"
```

# cli example

The cli **does not** use any routing since it would add useless work.

To call an action in cli, you just have to call:
```
php html/index.php -e prod -l en_US -a <module>/<controller>/<action> -param1 value1 -param2 value2
```

The parameters that the cli version requires are:

- "e" means environment (mandatory), you can also use -environment
- "a" means action (mandatory), or you can use -action
- "l" means locale (it's optional), or you can use -locale
- parameters are sent to the controller using the "-param value" notation

You can switch to the "dev" environment by using :

- -e dev

By default, the framework will use the default locale defined in the url.ini.

Just put your module in the /application/cli folder of your application.