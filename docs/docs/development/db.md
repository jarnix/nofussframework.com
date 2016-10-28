Let's go back to our example from the "Helpers" page.

The Db class gives you a database connection. Declare your database in the config.ini. For example:

```
db.app.adapter = Mysqli
db.app.params.charset = "utf8"
db.app.params.hostname = "mydbserver"
db.app.params.username = "dbuser"
db.app.params.password = "dbpass"
db.app.params.database = "dbname"
```

In your code, get the db connection with:

```
$db = Db::getConnection('app');
```

# Make a basic query

TODO

# Escape the values

TODO

# Update, Insert, Upsert with auto escaping

TODO

