# Different cache systems

The framework allows you to use on or multiple cache systems. For example, you might want to use a "local" cache store for performance and another memcache store for all of your front servers that will share the data.

You have to declare them in the config.ini. 

## Memcached

Let's add a memcache cache handler in our application. Let's call it "global". This will be the name of the instance. 

```
cache.global.handler = memcached
cache.global.lifetime = 3600
cache.global.params.hosts = localhost
cache.global.params.port = 11211
```

The parameters for memcache are the ones that are read by the Nf\Cache\Memcached.php class.

Then in your code, you get this instance with a simple call:

```
// use \Nf\Cache;
$globalCache = Cache::getStorage('global');
```

## apc/apcu

The new name for the APC user cache is called "apcu".

If you want to use an instance of apcu, just add these lines in your config.ini:

Let's call this one "local" since it's local to the server.

```
cache.local.handler = apc
cache.local.lifetime = 3600
```

This class does not accept any other parameters.

# Common parameters

## Keys prefix

The Cache system allows you to add a prefix for all of your entries in the cache's storage. Just add this in the config.ini:
 
```
cache.keyPrefix = myapp_
```

This value is optional and defaults to empty string.

## Cache Keys

The Cache class uses keys and patterns instead of directly using strings.

The main advantage is that you will use the same keys everywhere in your application (preventing typos) and if you udpate your data model, you can easily clean the cache for the related keys by changing the pointer to the key's name and not the name directly. 

Let's try with a basic example where we store an article and use the id of the article in the key's name.

```
cachekeys.article = art[id]
```

Let's store something in this key:

```
// use \Nf\Cache;
$globalCache = Cache::getStorage('global');
$globalCache->save('article', 47, [ 'text' => 'hello this is an interesting article about something' ] //, 3600); 
```

The parameters are :

- the name of the key defined in the config.ini (cachekeys.article)
- the second parameter is replaced in the string defined in the config.ini, here we have only one parameter that is the id of the article so the framework replaces [id] with our id, here 47.
- the data to store (it will be serialized internally by the php extension for this cache system)
- an optional lifetime for this key (in seconds)

Let's load this key from the store:

```
// use \Nf\Cache;
$globalCache = Cache::getStorage('global');
$articleData = $globalCache->load('article', 47); 
```

### Lifetime

The lifetime can be set per key or per cache system. If you do not specify a lifetime, the framework will use the cache system's one, or the global value defined in the framework of 3600 seconds (one hour).

### Multiple key identifiers

You might have multiple identifiers for the key's name, like for storing pagination results for a matching tag. Your key will look like this in the config.ini:

```
cachekeys.articleList = list_[tag]_[page]
```

In your code, you will use:

```
$globalCache->save(
    'articleList',
    [ 'fashion', 2 ],
    [ 0 => 'first article...', 1 => 'second article...' ]
); 
```

The framework will replace the entries in the key's name in the order of the values, so:

- "fashion" will replace [tag]
- 2 will replace [page]

You can also specify the name like this:

```
$globalCache->save(
    'articleList',
    [ 'tag' => 'fashion', 'page' => 2 ],
    [ 0 => 'first article...', 1 => 'second article...' ]
); 
```

Or of course reorder them in the order you would like:

```
$globalCache->save(
    'articleList',
    [ 'page' => 2, 'tag' => 'fashion' ],
    [ 0 => 'first article...', 1 => 'second article...' ]
); 
```

And the similar function to load the values from the store:

```
$globalCache->load('articleList', [ 'page' => 2, 'tag' => 'fashion' ]); 
```

### Deleting values from the store

```
$globalCache->delete('articleList', [ 'page' => 2, 'tag' => 'fashion' ]); 
```
