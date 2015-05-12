This is where you will setup your database connections, memcache, sessions, etc. It's a basic .ini file that can be read and written easily by any human. Definitely not a JSON or XML or even PHP which is worse of course.
 
#Error display
 
Note that the error level is of course set to E_ALL. 
 
| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| error.displayPHPErrors  | off<br>on  | <none>  | Should the application display the basic php errors (in dev environment you should set it to "on", and in production to "off"). The main exceptions will be catched, we are talking about the basic php errors like typos etc | 
| error.displayMethod  |  screen<br>forward  | <none>  | Display the errors on "screen" or within another controller/method ("forward") for friendly error reporting. |

# Error reporting and logging
 
 | Key   | Values   | Default  | Explanation |
|---|---|---|---|
| error.forward.module   | home  | <none> | The module to use when you forward errors. | 
| error.forward.controller  | error | <none>  | The controller to use in the specified module. |
| error.forward.action | error  | <none>  | The action to call in the specified controller. |

Note that you should use forward most of the time in a real application so you can display a friendly error message, hide all the code from your users, and most importantly: log the error in syslog/graylog/whatever.
 
#Forbidden pages / logging / display 

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| notfound.forward.module | home | <none> | The module to use when you forward from a forbidden access. | 
| notfound.forward.controller | error | <none> | The module to use. | 
| notfound.forward.module | notfound | <none> | The action to call. | 

#View engines

| Key   | Values   | Default  | Explanation |
|---|---|---|---|
| view.engine | smarty<br>php | php | The templating engine to use. | 
 
Smarty was the obvious choice because of the benchmarks of the latest versions on large templates. Should you use Twig or Blade, you will have to fork the code, nothing too difficult here.
 
#Default module, controller, action (aka "the home page")



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
