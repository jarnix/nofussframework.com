A short note on the index.php file

Really, this page is about configuring the autoloader :)

# Library path and Application path

**NB**

**Please note that if you cloned the nofussframework's empty site [nofussframework empty site example](https://github.com/jarnix/nofussframework-emptysite), then everything is already setup and you don't need to do anything. This page is just here so you understand how the framework works internally.**

This framework was designed to be used by multiple applications so the framework and other classes may be stored outside of your application's directory and be shared by tour multiple applications.

The libraryPath contains the folder of your "library" that may contain for example the nofuss framework.

Usually (if you used composer from the [nofussframework empty site example](https://github.com/jarnix/nofussframework-emptysite) you will have a line like this:
```
$libraryPath = realpath(dirname(__FILE__) . '/../vendor/nofussframework/nofussframework/Nf');
```

But you can change it to:

```
$libraryPath = realpath(dirname(__FILE__) . '/../../library');
```
and put the Nf folder of the framework in a subfolder of this library directory.

You just have to change the require of the autoloader then:
```
require ($libraryPath . '/Nf/Autoloader.php');
```

# Define the namespace of your app

In the file called index.php located in /html, you can change the default namespace of your app. We use "App" in the whole examples.

```
$applicationNamespace='App';
```

This name is the root namespace of all your models, controllers, middlewares.  

# Autoloader

The autoloader of nofussframework is compatible with both the (old) PSR-0 and the PSR-1 file hierarchy.

# Add other folders for dependencies

You might want to use external php classes or helpers for your application. You have to tell the framework how to find them in the index.php file.

## Example on how to add a properly named PSR-1 dependency:
```
$autoloader->addNamespaceRoot('', $applicationPath . '/vendor');
```

In this example, you want to add the library "Buzz" to your project. Just copy the Buzz folder in your /vendor folder and this line will try to autoload the files from Buzz here.

You don't need to add anything else really.

You can however add multiple directories like this:
```
$autoloader->addNamespaceRoot('', $libraryPath . '/vendor');
```

The order in which you define the namespace roots will be used sequentially to autoload a class.

## Example on how to add another dependency:
```
$autoloader->addNamespaceRoot('somethingElse', $applicationPath . '/vendor/somethingElse');
```

This will tell the autoloader to also use this folder.

## How to add a classmap

For example we would like to add the classmap of Impala, we use the addMap method:
```
$autoloader->addMap($applicationPath . '/vendor/php-impala-classmap.php');
```
