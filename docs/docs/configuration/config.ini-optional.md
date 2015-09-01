All of these settings are optional, but useful still ;)

## Default module, controller, action (aka "the home page")

This is where you setup the default controller.

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| front.default.module  | ... | (none) | You have to specify a default module, for example "home" | 
| front.default.controller  | ... | (none) | You have to specify a default controller in the default module, for example "index" | 
| front.default.action  | ... | (none) | You have to specify the default action, for example "index" | 

If you specify another route in your routes / _root.php file, the framework will use the latest route and not this config.ini entry.

## Database connection parameters

At this time, only mysql is supported. Just add these lines to the config.ini to define an adapter to a database. 

In this example, it's called *mydatabase*. Replace with the name you want to use.

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| db.mydatabase.adapter  | "Mysqli" only | (none) | You have to specify an adapter |
db.mydatabase.params.database | Name of the database | (none) | The database to use on the server |
db.mydatabase.params.hostname | Hostname or IP of the server | (none) | The server to connect to |
db.mydatabase.params.username | Username | (none) | The username to connect with |
db.mydatabase.params.password | Password | (none) | The password to use for connecting |
db.mydatabase.params.charset=utf8  | The name of the charset | (none) | You should use utf-8 anyway :-) | 

In your code, you will get an instance of the db adapter by using :

```
$db = \Nf\Db::getConnection('mydatabase');
```
 
## Session handler

You can set the session handler to :
- nothing (just don't set the value or set an empty adapter)
- mysqli (to store sessions in a table in a database adapter already defined in the config.ini)
- memcache (to store sessions in memcache)

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| session.handler | mysqli<br>memcache | (none) | Where do you want to store the sesions data |
session.lifetime | (seconds) | (none) | The session lifetime in seconds |
session.cookie.name | (string) | (none) | Name of the session cookie |
session.cookie.domain | (string|blank) | request's http domain | Domain to set the cookie to |  
session.cookie.path= | (string|/) | (none) | You can use / for the whole domain or limit to a folder with "myfolder/" | 
session.params.db_adapter | name of the db adapter | (none) | If you use a db store, set to the name of the db adapter to use<br>It's the same name of the adapter that you defined earlier in the config  |
session.params.db_table | (string) | (none) | The name of the table to store sessions (see the reference for the table's structure |
 
## Enabling/disabling cache
 
This configuration parameter allows you to globally disable the cache handlers that you can use in your app. The default value is to cache.

If you set this to true, the framework will bypass the cache and return false on a "get" query, and returns true on a "set" query.  

You should disable the cache in a dev environment, but you can force it here.

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| cache.enabled | false<br>true | true | Enable (true) or disable (false) the cache globally |
 
## Multiple cache handlers

Well of course, you can use only one or none. Just give the cache handler a name (for using it later in your models) and set the parameters for instanciating it.

In this example, we have one global cache, that is shared between the web servers, and another one that is exclusive to every server. The names "global" and "local" could be whatever you want.

```
cache.global.handler=memcached
cache.global.params.hosts=localhost
cache.global.params.port=11211
cache.global.lifetime=3600

cache.local.handler=apc
```

The available settings ar described here, with the name *mycache* that can be whatever you want.

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
cache.mycache.handler | Apc<br>Memcached | (n/a) | Choose a cache adapter |
cache.global.lifetime | (int) | 600 | Enter the default cache lifetime for any object |

For Memcache:

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
cache.global.params.hosts | ip/hostname | (n/a) | For Memcache and multiple servers, separate the values with a comma (,) | 
cache.global.params.port | 11211<br>whatever | (none) | For Memcache, enter the port of the servers | 

For APC, you don't have anything to do.
 
## Cache keys

Usually in small apps, you store the name of the cache key for your models in constants of the classes. When you update your application, you don't want to get a conflict of data structure between what your new application expects and what the cache returns.

That's why every key in the datastore uses a pointer to the keys defined in the config.ini. For example:

```
/* in your model, get the cache storage instance */
$globalCache = \Nf\Cache::getStorage('global'); 
/* set the value if not already in cache: */
$data = $globalCache->load('temperature', array('country' => 'france', 'city' => 'paris'));
```

The name of the cache key is dynamic and should be set in the config:

```
cachekeys.temperature_citycode=temperature_[country]_[city]
``` 
The cache handler will remplace [country] and [city] by the actual values and will use the internal key "temperature_france_paris" for setting and getting the value from the cache store.

For a shorter code, you can also use a basic array or even just a string, like in these two examples. 

If you have a small number of parameters and you are lazy, just send an array :

``` 
$data = $globalCache->load('temperature', array('france', 'paris'));
```

If you have only one parameter in the key, like: temperature_[city]

```
$data = $globalCache->load('temperature', 'paris');
```

## Cache key prefix

You can prefix every key in your cache store(s), for example if you change a lot of structure in a new version of your application. 

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
cache.keyPrefix= | (string) | (empty string) | Just remember to make it compatible with your cache store. You can use v1, v2 or the name of your app if you share a memcache server with other applications. |

 
## Security options
 
  
 You can add there every other configuration you might need for your application like :
 
 * your CSS/less files to include in the head
 * your js files to include in the bottom of your pages
 * an API key for using Google Cloud Services
 * the email recipient address for your contact form
 * the IP of your redis cluster servers
 * etc
