# ionic v3 version mismatch

Simple script to fix the problem of version mismatch in Ionic v3. The problem is caused by a configuration file in modules that contains version 4 instead of 3. The script basically find json metadata files into node_modules and changes the version 4 to 3 in them. The change doesn't affect module operation and app can be build with --prod flag.

```
$ cd /path/to/project
$ node version-mismatch.js
Updating /var/www/app/node_modules/ionic-long-press/ionic-long-press.metadata.json
Updating /var/www/app/node_modules/ionic-angular/index.metadata.json
Updating /var/www/app/node_modules/ionic-angular/module.metadata.json
...
```
