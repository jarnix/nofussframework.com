In this tutorial, we assume that your web root is /var/www and that you can create files in this folder. 

# Get NoFussFramework on your server

	cd /var/www
	git clone https://github.com/jarnix/nofuss.git
	cd nofuss
	
You will see 3 directories:

* demosite, which is a "hello world" that you can modify freely
* emptysite, which should be your skeleton when building a new application with NoFussFramework
* library: the folder containing the framework and where you can put different classes used by your application(s)

# Setup an apache virtual site

We will name our virtual site "nofuss1".

Beware, this configuration is really small and not so secure ("AllowOverride All").

	cd /etc/apache2/sites-available
	nano nofuss1
	
Copy these lines and adjust according to your server's configuration.
	
```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost

    DocumentRoot /var/www/nofuss/demosite/html
    <Directory />
            Options FollowSymLinks
            AllowOverride All
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/error.log

    LogLevel warn

    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
	
Write and exit (ctrl+o, ctrl+x).

Enable the website :
	
	a2ensite nofuss1

# Optional: get Smarty

if you want to use Smarty as the template engine for your application, you have to download the latest version:
	
	cd /usr/local/src
	wget http://www.smarty.net/files/Smarty-3.1.21.tar.gz
	tar -xvzf Smarty-3.1.21.tar.gz
	cd Smarty-3.1.21
	mv libs /var/www/nofuss/library/php/classes/Smarty	
	
# Set directory permissions for Smarty

If you are going to use Smarty, you will need to allow the apache "www-data" user to write the compiled templates in his templates_c folder:

	chown -R www-data.www-data /var/www/nofuss/demosite/cache/templates_c
	
And you're good to go.