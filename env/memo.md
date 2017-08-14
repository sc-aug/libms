# Front-end
```
npm install -g typescript
npm install -g --unsafe-perm @angular/cli
```

# Back-end
```
npm install -g nodemon
npm install --save bcryptjs
npm install --save jsonwebtoken
npm install --save mongoose-searchable
```
* nodemon: auto restart service when server-side file changes
* bcryptjs: password encryption
* jwt: for authentication
* mongoose-searchable: different fields search (e.g. book title & author)

---

# Trifle Content

## Issues
install angular cli on docker[node:8.2.1-wheezy]
- infinite loop
```
#[cause infinite loop] npm install -g @angular/cli
npm install -g --unsafe-perm @angular/cli
```
- service not work on host machine
```
#[error] ng serve --port 3000
ng serve --port 3000 --host 0.0.0.0
```

## Angular with Bootstrap
Install packages
```
npm install bootstrap@3 jquery --save
```

In `.angular-cli.json`, add
```
...
"styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "styles.css"
],
"scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
]
...
```

## Angular Combine Express
```
npm install --save express body-parser
```

## Using mongoose validator

```
mongoose-unique-validator
```

## Angular App URL with hash sign `#`
[link](https://stackoverflow.com/questions/41687562/angular-2-remove-hash-from-the-url)

