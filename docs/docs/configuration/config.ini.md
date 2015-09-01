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
```
error.logger.class=\App\Logger
```

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

Should you use Twig or Blade, you will have to fork the view class. Note that we may add native support for these two template engines soon, or not, but a merge request will make us happy :)

# All the other settings are optional

You can see the other configuration options in the next page!