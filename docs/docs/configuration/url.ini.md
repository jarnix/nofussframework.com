Within a single application, you can have:

 - multiple versions (for example, your website, your administration back-office, your rest api)
 - multiple environments of course (dev, test, prod)
 - multiple languages (English, French, German), with or without a unique URL for each one
 
The "url.ini" is the file where you set up all these variables.
 
** Example **

```
[i18n]
defaultLocale=fr
defaultVersion=web

dev.localeSelectionOrder=cookie
test.localeSelectionMode=browser
prod.localeSelectionMode=url

[environments]
dev.regexp="/mydev\.local/"

[versions]
web="www"
admin=admin
api1=api

[suffixes]
fr=[version].homes.fr
en=[version].homes.com

[locales]
fr=fr_FR,fr_BE
en=en_US

[redirections]
iphone=
ipad=tablet
androidmobile=
androidtablet=
blackberry=

```

In the exampe above, which is a simple example, we define: 

 - a default locale: "fr" (the labels are in /labels/fr.ini)
 - a default version: "web" (the modules are in /application/web/...)
 
Then, we have the "localeSelectionOrder" that allows us to choose the requested locale automatically:
 
 - dev.localeSelectionOrder = cookie means that we decide of the locale to use with a cookie (cookie name: "_nfLc")
 - test and prod selection modes are set to browser or url, which means that the framework will decide of the correct locale with the browser's locale (meaning that we have to handle aliases, like en_US or en_GB) or the url (defined in the "suffixes" section, explained later)
 
We then define the next variables:
 
 - a dev environment with the regexp for checking "mydev.local"
 - three versions: web, admin, and api. The urls will be matched againts the versions and the suffixes...
 - two suffixes = two languages = two sets of labels (/labels/fr.ini and /labels/en.in)

** A little explanation**

We would have the French website hosted at www.homes.fr and the English version hosted at www.homes.com. We also have an API, hosted at api.homes.fr and api.homes.com (different labels, you can load them anyway using a single url, later in the code of your API).

The version is called "api1", so the modules (controllers, specific models, and views) must be in /application/api1/.

We also define two locales :
 - fr and en
 - we added aliases for the locales if we need to select the correct locale to use: fr is also fr_FR (French with cheese) and fr_BE (French with beers)

