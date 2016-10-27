# Namespacing

The autoloader expects your classes (in the whole application) to use the PSR-1 notation.

Therefore you will need to declare your models (that are shared within your application): 

- in the **/models** directory
- be namespaced with the root of your app (defaults to "App")
- and use the same hierarchy than your namespace's one

So: **App\Article\Review** will be located in : **/models/Article/Review**.

# Getting input data from a model

TODO

If you need to get the input data from a model:

# Other useful functions

TODO