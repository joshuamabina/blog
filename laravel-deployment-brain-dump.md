### Laravel Deployment - Brain Dump!

The following are some things I documented as a way to improve the laravel deployment process.

> **Heads up!** All opinions are mine. Find yours!

#### Server Requirements

The Laravel framework has a few system requirements.

Make sure you server meets the following server requirements:

- PHP >= 7.0.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

I wrote a script to test these server requirements.

See [gistfile](https://gist.github.com/joshuamabina/9575e46ba9e70a416ba80d6870fa846f).

#### Laravel environment variables are your friends.

What are they?

Dotenv files are ini files on steriods.

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
##### Why should you I use them?

Versioning your secret credentials is not such a smart thing to do. They should be stored some place else, your head, for instance.

PHPDotenv was designed to allow the use of different configuration values in different environments.

Use `.env` or `.env.production` or `.env.testing` (notice the convention) to store configuration values specific to the respective environment.

##### Why the convention?

Well, would be easier to explain this if we looked at some code:

```bash
#modify the .env APP_KEY value
$ php artisan key:generate

#modify the .env.testing APP_KEY value
$ php artisan key:generate --env=testing
```

A verbose example of `.env` file would look like:

```ini
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64_app_key
APP_DEBUG=true
APP_LOG_LEVEL=debug
APP_URL=http://laravel.dev:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forge
DB_USERNAME=forge
DB_PASSWORD=secret

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

PUSHER_APP_ID=pusher_app_id
PUSHER_APP_KEY=pusher_app_key
PUSHER_APP_SECRET=pusher_app_secret

GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
GOOGLE_REDIRECT=http://laravel.dev:8000/login/google/callback

FACEBOOK_CLIENT_ID=facebook_client_id
FACEBOOK_CLIENT_SECRET=google_client_secret
FACEBOOK_REDIRECT=http://laravel.dev:8000/login/facebook/callback
```
##### Caveats & ProTips

###### DO NOT EVER change `config/something.php` to store credentials.

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

I would literary give anyone a rope for which they hang themselves before letting them dump credentials in a `config/database.php` for whatsoever sane reason they think they have.

###### The `.env[.production|.testing|.environment]` file is (and must) not be versioned.

It is a common practice to stub all required environment variables in a `.env.example` file and version that file. So for testing, I would have (recall the convention) `.env.testing.example`.

#### No need to deploy the entire `vendor` directory.

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

#### No need need to deploy the `node_modules` directory.

##### A short walk down memory lane

Node drastically changed how JavaScript development took form.

While it is true that the concept of sanely managing 3rd-party code has been around for quite a long-time (git-submodules, for instance), this was not much of the case in the JavaScript ecosystem.

Node and affiliates ploughed the JavaScript planet for the better. Then [bower](https://bower.io), [ender](http://www.enderjs.com/), [volo](http://volojs.org/) and everything else, quickly errupted from JavaScript's volcanic core, shaking the Internet's crust, hard.

##### What is npm?

Their [website](https://npmjs.com) so eloquently states, **&ldquo;npm is not a node package manager&rdquo;**.

*Unrealated, **GNU** stands for **GNU's Not UNIX.***

Why npm does not stand for node package manager?

> To be more accurate, npm isn’t “the package manager for Node.js”, but “a package manager for JavaScript”.

[Read more](https://github.com/BloombergMedia/whatiscode/pull/34)

##### The Story of Yarn - Yet another package manager.

An npm alternative and a bower replacement.

> ...psst! While Bower is maintained, we recommend using Yarn and Webpack for front-end projects read how to migrate! - The Bower Website

Built to re-use the rich existing ecosystem of developers and libraries.

Developed by engineers at Facebook, Exponent, Google, Tilde and the World. Follow [link](https://github.com/yarnpkg/yarn/graphs/contributors) for a complete list of contributors.

Yarn engineers claim that it is fast, reliable, and a secure dependency manager.

However, not so fast, npm 5 is here **(tires screeching)**.

> **Disclaimer!** Much as I would love to, I have unfortunately not had the pleasure to work for Facebook, Google, Exponent or Tilde.

The re-work on how npm gets the exact same `node_modules` [puts it ahead](https://github.com/siddharthkp/npm-cache-benchmark) it slightly ahead.

> Determinism in the context of JavaScript package management is defined as always getting the exact same node_modules folder given a package.json and companion lock file.

[Read more on determinism - Yarn vs npm 5](HTTPs://yarnpkg.com/blog/2017/05/31/determinism/).

##### Deploying without `node_modules`

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

##### The `resources/assets` directory is your source assets' spouse.

> DO NOT USE `public/assets` to store your assets.

It is a generated directory.

[Read more - Introducing Laravel Mix](https://laravel.com/docs/5.4/mix).

In a nutshell:

- Use package-manager to install dependencies

    ```bash
    $ yarn install
    ```
- Bootstrap your vendor assets together with your source assets.

    ```js
    //resources/assets/js/bootstrap.js

    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
    ```

- Compile and dump to public directory

    ```bash
    $ yarn dev

    #or

    $ yarn production
    ```

Is it not easy to think about deploying already optimized `app.css` and `app.js`?

#### Database dumps

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

##### Cache and deploy

- Configurations
- Routes
- Assets

#### My last words

##### A good thing no closures is. Yes, hrrmmm.

Caching fails if I throw closures in my route files. So, I do not. Plus, there's nothing there for me to digest at run-time.

French [KISS](https://en.wikipedia.org/wiki/KISS_principle) your route and configuration files.

No closures is sometimes good thing.

##### Shared hosting, the culprit of laravel hosting!

- Common and straightforward
- Symlinking `public_html` to` public`
- Extending the \Illuminate\Foundation\Application class

#### Who should I yell at?

Do not forget to dump all your slimy disgust to mabinajoshua@gmail.com. He sometimes reads his mail.

Cheers!
