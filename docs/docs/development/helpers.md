This page will explain the useful helpers that are shipped with the framework

# Registry

The Registry is a basic store that allows you to save and load various information (or class instances) along the execution of the request.

```
// use \Nf\Registry;
Registry::set('something', 'omg this is really something');
```

And get it with:

```
// use \Nf\Registry;
Registry::get('something');
```

## Config

The Config contains the parsed information from the config.ini file. It is stored in the Registry object.

This is a read-only object.

```
$config = \Nf\Registry::get('config');
echo $config->app->name; 
```

You can also get the Config instance with:

```
$config = \Nf\Config::getInstance();
echo $config->app->name;
```

You can also use this syntax:

```
echo \Nf\Config::get()->app->name;
```

## Env

The Env class has the same functionality as Config but it reads its values from the .env file that you can place at the root of your application.

You can use it the same way as the config.ini file, using sections for each environment, version and language. 

# Settings

The Settings class merges the Env information around the Config information.

You should really use this object instead of Config or Env.

```
$settings = \Nf\Settings::get();
```

# Input

The Input filtering allows you to check the data provided in the request. See [Input filtering](input-filtering.md) for more information.

# Db

The Db class gives you a database connection. Declare your database in the config.ini. For example:

```
db.app.adapter = Mysqli
db.app.params.charset = "utf8"
db.app.params.hostname = "mydbserver"
db.app.params.username = "dbuser"
db.app.params.password = "dbpass"
db.app.params.database = "dbname"
```

In your code, get the db connection with:

```
$db = Db::getConnection('app');
```

The full signature of this method is:

```
getConnection($configName, $alternateHostname = null, $alternateDatabase = null, $storeInInstance = true)
```

It means that you can dynamically:

- change the hostname (if you shard your data among multiple db hosts)
- change the database (same)
- and require another instance of the connection (that is **required** if you multi-thread your app)

You should read the information in the [database](db.md) page.

# Cache

The Cache object is explained in the [cache](cache.md) page.

# File

The File object is a basic helper to:

- mkdir (create folder): mkdir($pathname, $mode = 0775, $recursive = false)
- rename (rename a file or folder): rename($old, $new, $mode = 0775)
- uncompress (unzip): uncompress($src, $dest, $unlinkSrc = false)
- generatePath (generates a directory hierarchy with) 

TODO


# Image

TODO

# LabelManager

TODO

# Localization

TODO

# Make

TODO

# Session

TODO

# Task

TODO

# UserAgent

TODO

# View