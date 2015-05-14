This is where you will setup your application:

* database connections
* memcache
* session handler
* etc

It's a basic .ini file that can be read and written easily by any human. Definitely not a JSON or XML or even PHP which is worse of course.
 
#Error display
 
Note that the error level is of course set to E_ALL. 
 
| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| error.displayPHPErrors  | off<br>on  | (none)  | Should the application display the basic php errors (in dev environment you should set it to "on", and in production to "off"). The main exceptions will be catched, we are talking about the basic php errors like typos etc | 
| error.displayMethod  |  screen<br>forward  | (none)  | Display the errors on "screen" or within another controller/method ("forward") for friendly error reporting. |

# Error reporting
 
| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| error.forward.module   | home  | (none) | The module to use when you forward errors. | 
| error.forward.controller  | error | (none)  | The controller to use in the specified module. |
| error.forward.action | error  | (none)  | The action to call in the specified controller. |

Note that you should use forward most of the time in a real application so you can display a friendly error message, hide all the code from your users.

# Error logging

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| error.logger.class  | ....  | Syslog/(none) | The class to instantiate for error logging. | 

NoFussFramework will by default (no error logger specified) report the error to syslog so you will find the error in your apache2 error log (depending on your virtual host configuration).

If you want to customize error loggin, you can create a class in your "models" folder call, for example, "Logger", and specify in the config.ini:
	error.logger.class=\App\Logger

You will need to create a method called "log", follow the example in Nf\Error\Logger\Syslog.php.
 
#Forbidden pages / logging / display 

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| notfound.forward.module | home | (none) | The module to use when you forward from a forbidden access. | 
| notfound.forward.controller | error | (none) | The module to use. | 
| notfound.forward.module | notfound | (none) | The action to call. | 

#View engines

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| view.engine | smarty<br>php | php | The templating engine to use. | 
 
Smarty was the obvious choice, along with php, because of the benchmarks of the latest versions on large templates.

Should you use Twig or Blade, you will have to fork the view class. Note that we will soon add native support for these two template engines.
 
#Default module, controller, action (aka "the home page")

This is where you setup the default controller.

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| front.default.module  | ... | (none) | You have to specify a default module, for example "home" | 
| front.default.controller  | ... | (none) | You have to specify a default controller in the default module, for example "index" | 
| front.default.action  | ... | (none) | You have to specify the default action, for example "index" | 

If you specify another route in your routes / _root.php file, the framework will use the latest route and not this config.ini entry.

#Database connection parameters


 
#Session handler
 
#Enabling/disabling cache
 
#Multiple cache handlers

Well of course, you can use only one or none.
 
#Cache key prefix
 
#Security options
 
 
 
 You can add there every other configuration you might need for your application like :
 
 * your CSS/less files to include in the head
 * your js files to include in the bottom of your pages
 * an API key for using Google Cloud Services
 * the email recipient address for your contact form
 * the IP of your redis cluster servers
 * etc
