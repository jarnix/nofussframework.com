# What can you expect from NoFussFramework

### A short learning curve

NoFussFramework was designed to be easy to use. There's no magic behind.<br>Also, though being a little bit opinionated, you can extend it easily.

### A complete MVC without all the fuss

The main reason for building the project was that we cannot find a performant yet useful framework to work on for our projects. Micro frameworks are way too limited for being used in a few environments where you have a lot of developers working on multiple projects. Big and fat frameworks like Symfony or Zend or Laravel have a long learning curve, have below-than-average performances so they are not usable on large websites without using a lot of servers. We also believe that we cannot build everything better than the others ;) so it will be up to you to include other php libraries for like creating pdf, connecting to an outdated SOAP api, etc.     

### Performance oriented

NoFussFramework is an MVC framework that will help you build small or large applications with performance in mind.

### What you will miss, or not

Obviously, NoFussFramework was not designed to do everything of what you can expect from a fat framework like Symfony or Zend Framework. For example, it doesn't handle user login, this task should be performed specifically by your code for your project, it's not included since there are a lot of different ways to authenticate/register a user. 

### A few benchmarks

When you have an "hello world" in 200 ms on an average small server on other frameworks (laravel, symfony, zend 2...), NoFussFramework will say "hello world" within 15 ms maximum after routing, session handling etc.

NoFussFramework is really efficient in CPU and memory usage, leveraging basic technologies like lazy loading, limiting the number of files, etc. And a constant benchmarking while developing it to fix the bottlenecks.

(TBC) 