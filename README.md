# laravel-stencil

Laravel back end with a StencilJS front PWA

# Laravel (back end) installation

Clone this repository, configure the webserver to serve from `/public`

Install dependencies:

`composer install`

Configure database credentials in `.env` then run migrations

`php artisan key:generate`

`php artisan dev:refresh`

To seed apartments for development call:

`php artisan db:seed --class=ApartmentSeeder`

Link Storage

`php artisan storage:link`

Clear caches

`php artisan cache:clear`

# Stripe integration

Add a webhook in stripe for `[url]/api/booking/stripe_webhook` for the `charge.succeeded` event type

Add the webhook signing secret key to the .env file

Ensure cron is set: `* * * * * cd /path/to/docroot && php artisan schedule:run >> /dev/null 2>&1`

# Plaid integration

Test credentials: user_good / pass_good

# PWA (front end)

## Installation

The front end is a StencilJS PWA located in `/frontend` which will build to the `/public` directory

Install the node_modules dependencies

Node version: 10.16.1

    cd frontend
    npm install

Copy the `/frontend/config.app.json.example` to `/frontend/config.app.json` and add/update the required variables

## MySQL Version

This application requires MySQL 5.7 or higher.

## Production Build

    cd frontend
    npm install
    npm run prod
    
    cd ..
    php artisan cache:clear

## Development Serve

This starts the front end with hot module replacement for live updating during development

    cd frontend
    npm start

## Config Variables

Instance config variables are stored in `/frontend/config.app.json` and are substituted into the app at compile time.

When adding new config variables to the project add them to the `config.app.json.example` to self-document for other devs.

Add the key to `/frontend/src/services/environment/environment-config.ts` interface:

    export interface EnvironmentConfig {
        API_URL: string;
        BASE_URL: string;
    }

Add the key to `/frontend/src/global/app.ts` in the `setupConfig` function args encapsulated by `<@` and `@>`:

    setupConfig({
        API_URL: '<@API_URL@>',
        BASE_URL: '<@BASE_URL@>'
    });

Now any component in the project can access the variables by importing the config service:

    import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
    
    const API_URL = EnvironmentConfigService.getInstance().get('API_URL');

## Artisan Scripts

The application includes a handful of artisan scripts used for everything from clearing stale images to mapping and important listings from a CSV file. 

To see a list of scripts, execute `php artisan list` from the root of the application. To execute a script, run `php artisan apt212:scriptname`. 

- apt212:MapNeighborhoods       Maps all apartment listing neighborhoods
- apt212:clearOldImages         Deletes uploaded images that are unattached after 24hrs
- apt212:listing_import         Import listings from the old mongodb dump
- apt212:map_imported_listings  Create csv mapping between original webId and new webId for imported listings
- apt212:regenerateMarkers      Regenerate map markers for all apartments
- apt212:setApartmentRates      Sets all apartment rates based on the current month and next available date

## Coding Standards

#### File Structure

- One component per file.
- One component per directory. Though it may make sense to group similar components into the same directory, we've found it's easier to document components when each one has its own directory.
- Implementation (.tsx) and styles (.scss) of a component should live in the same directory.
- All styles should be scoped to the component and included in the components style definition .scss). No styles are allowed within the component (.tsx) definition. 

#### Third-Party Scripts

- This application was originally designed for optimal performance. Generally speaking, third-party scripts and resources should be  avoided. If a script or service is deemed absolutely necessary, it should be asynchronously loaded via the Script Loader service provided by the application.
- All UI development should be done within the StencilJS ecosystem. No additional UI libraries (e.g. jquery) are necessary or permitted.

#### Assets

- All images and videos should be properly compressed and encoded for the web prior to being added to the site.
- Image assets should generally be lazy loaded via the `<lazy-image>` component.
- Video assets should be off-loaded to a third-party streaming service.
