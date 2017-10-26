# Laravel Deployment - Brain Dump!

> **Heads up!** All opinions are mine. Find yours!

The following are some lessons I documented on deploying Laravel applications, mostly based on a shared-hosting context.

## Contents

- Laravel server requirements
- Laravel dotenv is your friend
- The resource directory
- No need to deploy the entire `node_modules` directory
- No need to deploy the entire `vendor` directory
- Database dumps
- Caching
- Last words

## Laravel server requirements

The Laravel framework has a few system requirements. Make sure you server meets the following:

- PHP >= 7.0.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

I wrote a script to test these server requirements.

See [gistfile](https://gist.github.com/joshuamabina/9575e46ba9e70a416ba80d6870fa846f).

## Laravel dotenv is your friend.

### What is it?

Dotenv files are **.ini files** on steriods.

PHP uses ini files for configurations. Basically, simple text files composed of sections with key-value properties that define how a system is (should be) setup.

Here's a section copied from my php.ini file:

```ini
#/path/to/php/lib/php.ini

;;;;;;;;;;;;;;;;
; File Uploads ;
;;;;;;;;;;;;;;;;

; Whether to allow HTTP file uploads.
; http://php.net/file-uploads
file_uploads = On
```
### Why should you I use them?

Including your secret credentials in your source files, is not such a smart thing to do. They should be stored some place else. In your head, for instance.

PHPDotenv was designed to allow the use of different configuration values in different environments.

A simple example of a `.env` file:

```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64_application_key

DB_DATABASE=forge
DB_USERNAME=forge
DB_PASSWORD=secret
```

Use `.env` or `.env.production` or `.env.testing` (notice the convention) to store configuration values specific to the respective dot-environment.

### Why the convention?

Lets look at some code:

```bash
#modify the .env APP_KEY value
$ php artisan key:generate

#modify the .env.testing APP_KEY value
$ php artisan key:generate --env=testing
```

Convetions are good. They just work!

### Caveat: Don't source your credentials

DO NOT EVER change `config/something.php` to store credentials.

```php
#good
'mysql' => [
    'driver' => 'mysql',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'fake_db'),
    'username' => env('DB_USERNAME', 'fake_user'),
    'password' => env('DB_PASSWORD', 'fake_secret'),
    //...
],
```

I would gladly give anyone a rope for which they hang themselves before letting them dump credentials in a `config/database.php` for whatsoever sane reason they think they have.

### Caveat: Don't version your .env files

The `.env[.production|.testing|.environment]` file is (and must) not be versioned.

It is a common practice to stub all required environment variables in a `.env.example` file and version that file. So for testing, I would have (recall the convention) `.env.testing.example`.

## No need to deploy the entire `vendor` directory.

The vendor directory stores dependencies specified in your `composer.json`.

The dependencies include stuff you would use in production, development, testing e.t.c. We wouldn't want development or testing suff to clout our production environment, or would we?

If your answer is, *NO we wouldn't*, read on.

```bash
#install dependencies specified in composer.json
$ composer install

#estimate file and folder space usage
$ du vendor/
100M   vendor/

#ignore dependencies specified as require-dev
$ composer install --no-dev

#new size estimation
$ du vendor/
30M    vendor/

#deploy a production optimized vendor directory
$ tar -zcvf /tmp/source.tar.gz .
```

Safe and easy on the bandwidth. My boss would love this.

## No need need to deploy the `node_modules` directory.

### A short walk down memory lane

Node drastically changed how JavaScript development took form.

While it is true that the concept of sanely managing 3rd-party code has been around for quite a long-time (git-submodules, for instance), this was not much of the case in the JavaScript ecosystem.

Node and affiliates ploughed the JavaScript planet for the better. Then [bower](https://bower.io), [ender](http://www.enderjs.com/), [volo](http://volojs.org/) and everything else, quickly errupted from JavaScript's volcanic core, shaking the Internet's crust, hard.

### What is npm?

Their [website](https://npmjs.com) so eloquently states, **&ldquo;npm is not a node package manager&rdquo;**.

*Unrealated, **GNU** stands for **GNU's Not UNIX.***

Why npm does not stand for node package manager?

> To be more accurate, npm isn’t “the package manager for Node.js”, but “a package manager for JavaScript”.

\- [For more, read this long thread.](https://github.com/BloombergMedia/whatiscode/pull/34)

### The Story of Yarn - Yet another package manager.

An npm alternative and a bower replacement.

> ...psst! While Bower is maintained, we recommend using Yarn and Webpack for front-end projects read how to migrate!

\- [The Bower Folks!](https://bower.io)

Built to re-use the rich existing ecosystem of developers and libraries.

Developed by engineers at Facebook, Exponent, Google, and Tilde.

Yarn engineers claim that it is fast, reliable, and a secure dependency manager.

However, not so fast, npm 5 is here **(tires screeching)**.

The re-work on how npm gets the exact same `node_modules` everytime puts it slightly ahead ([not my words](https://github.com/siddharthkp/npm-cache-benchmark)).

> Determinism in the context of JavaScript package management is defined as always getting the exact same node_modules folder given a package.json and companion lock file.

[Read more on determinism - Yarn vs npm 5](HTTPs://yarnpkg.com/blog/2017/05/31/determinism/).

### Deploying without `node_modules`

```bash
#install dependencies specified in package.json
$ yarn install

#this should work for most cases.
$ yarn production

#it is now safe to...
$ rm -rf node_modules/

#Go bezerk!
tar -zcvf /tmp/source.tar.gz .
```

The size of the `node_modules` directory is almost always frantically huge. With this simple optimization, off you go Santa's naughty list.

## The resource directory

Your `project/resources/assets` directory is your source's assets spouse. Do not set them apart.

In other words, **DO NOT USE** `public/assets` to store your source assets. It should be generated by your laravel-mix setup.

Here is a link to a nice article [Introducing Laravel Mix](https://mattstauffer.com/blog/introducing-laravel-mix-new-in-laravel-5-4/).

In a nutshell:

- Use package-manager to install dependencies

    ```bash
    $ yarn install
    ```
- Bootstrap your vendor assets together with your source assets.

    ```js
    //project/resources/assets/js/bootstrap.js

    window.$ = window.jQuery = require('jquery');
    require('bootstrap-sass');
    ```

- Compile and dump to public directory

    ```bash
    $ yarn production #or yarn dev
    ```

Is it not easy and nice to just think about deploying already optimized `app.css` and `app.js`?

## Database dumps

Dump the latest snapshot of the database. Inspired by [lally elias](https://github.com/lykmapipo).

Useful (I think) to have a dump of the latest database snapshot i.e. schema + real-seed data, altogether, ready for deployment.

So, how we would do it...

```bash
$ php artisan migrate:fresh --seed

$ mysqldump -u root -p laravel > storage/dumps/yyyy-mm-dd.sql
```

Now, imagine dragons...

```bash
$ php artisan dump-database

Created Database Dump: yyyy-mm-dd-hh-mm-ss.sql
```

## Caching

- [ ] Assets
- [ ] Configurations
- [ ] Routes

## Last words

### A good thing no closures is. Yes, hrrmmm.

Caching fails if I throw closures in my route files. So, I do not. Plus, there's nothing there for me to digest at run-time.

French [KISS](https://en.wikipedia.org/wiki/KISS_principle) your route and configuration files.

No closures is sometimes a good thing.

### Shared hosting, the culprit of laravel hosting!

- [ ] Common and straightforward
- [ ] Symlinking `public_html` to` public`
- [ ] Extending the \Illuminate\Foundation\Application class

### Who should I yell at?

Do not forget to dump all your slimy disgust to mabinajoshua@gmail.com. He sometimes reads his mail.

Found a typo? I accept pull requests.

Cheers!
