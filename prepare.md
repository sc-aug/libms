## Global Module Install
```
npm install -g typescript
npm install -g --unsafe-perm @angular/cli
```

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
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
```