Getting more of the config.ini

## Sections

Usually you will need to use the sections in the config.ini. They are like an object in OOP with (single) inheritance.

You usually begin to write your config.ini with a "common" section that all of the versions and languages of your application will share.

```
[common]
app.name = "My first app"

db.app.adapter = Mysqli
db.app.params.charset = "utf8"
```

Here we set an adapter for our database server and a charset, that will be common obviously.

Then in dev environment, you will set a host and database with user/password. We create the "dev" section. This will be shared by all languages and versions in our developement environment. 

```
[dev:common]
db.app.params.hostname = "mysql-dev-server.internal"
db.app.params.username = "development-user"
db.app.params.password = "development-password"
db.app.params.database = "app_dev"
```

Then you will have to configure the other sections that the framework will read for bootstrapping the various languages and versions that you will develop.

In this example, we are just using the (default) en_US locale and three versions :
 - cli (our cron tasks will be here)
 - api (our REST api)
 - web (our front app)

```
[en_US-dev-cli:dev]

[en_US-dev-api:dev]

[en_US-dev-web:dev]
```

The three sections do not overwrite anything but just inherit from our "dev" section and will therefore share the same values for our database "db.app".

## Naming the sections

You have to name the sections with this syntax:

- locale: (en_US in this example), the same as in the url.ini
- environment: dev, prod, test, etc (also the same as in the url.ini)
- version: the versions that you define in the url.ini (cli is auto defined, and then you can use the name that you want)

## Extending

Then we will publish our application on the production servers, so we need a "prod" section:

```
[prod:common]
db.app.params.hostname = "db-prod-1.internal"
db.app.params.username = "app_prod"
db.app.params.password = "production-password"
db.app.params.database = "app_prod"
```

We overwrite with the production hostname, user, password, database's name.

This section ("prod") will be extended for our various languages and versions in production environment.

```
[en_US-prod-cli:prod]

[en_US-prod-api:prod]

[en_US-prod-web:prod]
``` 

We are just inheriting from prod that contains already the right settings since our example app shares the same database server obviously.

## Other settings

In the previous page the parameter for disabling cache was explained. In production we will need the cache.

So in the prod section, enable it with:

```
[prod]
cache.enabled=true
```