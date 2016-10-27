In the default installation for a website, you will need apache2 and php5. Of course, you can also use another webserver like nginx and another php engine than apache's mod-php. 

# Apache2

* mod_rewrite  

# PHP >= 5.6

* php5-intl
* php5-mcrypt

The other extensions are optional and the framework won't crash (as in GTA 5).

If you want to connect to a mysql database:

* php5-mysqli

If you want to use memcache (as session store or cache store), this extension will be necessary:

* php5-memcache

If you want to use the image functions:

* php5-imagick

