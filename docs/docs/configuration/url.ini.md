Within a single application, you can have:

 - multiple versions (for example, your website, your administration back-office, your REST api)
 - multiple environments of course (dev, test, prod)
 - multiple languages (English, French, German), with or without a unique URL for each one
 
The "url.ini" is the file where you set up all these variables.
 
** Example **

```
[defaults]
locale=en_US
version=web
environment=dev

[localeSelectionOrder]
dev=domain
test=cookie, browser
prod=domain

[regexps]
en_US-dev-web="/myapp\.dev\.example\.com/"
en_US-dev-api="/api\.myapp\.dev\.example\.com/"
fr_FR-dev-web="/fr\.myapp\.dev\.example\.com/"
fr_FR-dev-api="/fr\.api\.myapp\.dev\.example\.com/"

en_US-test-web="/myapp\.jenkins\.internal/"
en_US-test-api="/api\.myapp\.jenkins\.internal/"

en_US-prod-web="/www\.example\.com/"
fr_FR-prod-web="/fr\.example\.com/"
en_US-prod-web="/api\.example\.com/"
fr_FR-prod-web="/fr\.api\.example\.com/"
```

In the exampe above, which is a simple example, we define: 

 - a default locale: "en_US" (the labels are in /labels/en_US.ini)
 - a default version: "web" (the modules are in /application/web/...)
 
Then, we have the "localeSelectionOrder" that allows us to choose the requested locale automatically:
 
 - dev: domain means that we decide of the locale to use with the domain name
 - test: we decide of the locale to use with a cookie (cookie name: "_nfLc"), or the browser locale. Ultimately, if we don't have a match, we will use the default language.
 - prod: domain means that we decide of the locale to use with the domain name
  
We then define the regexps for matching with the domain names:
 
 - a dev environment with the regexp for checking "myapp.dev.example.com", and "fr..." for the French language of the dev environment in the web version.
 - two versions are defined: web, and api. We define also the domain names for each version and language. 

