The Mysqli session handler expects this structure for the sessions table :

This example uses the name "sessions", but you can name how you want, just set it up in your config.ini.

Also, you can use the storage engine that you want, InnoDB, MyISAM, memory, whatever.

```
CREATE TABLE `sessions` (
  `id` varchar(32) COLLATE utf8_bin NOT NULL,
  `modified` timestamp NULL DEFAULT NULL,
  `lifetime` int(11) DEFAULT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```