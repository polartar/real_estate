# laravel-stencil
Laravel back end with a StencilJS front PWA

# Laravel (back end) installation

Clone this repository, configure the webserver to serve from `/public`

Install dependencies:

`composer install`

Install passport (api auth back end):

`php artisan passport:install`

# PWA (front end)

## Installation
The front end is a StencilJS PWA located in `/frontend` which will build to the `/public` directory

Install the node_modules dependencies

Node version: 10.16.1

    cd frontend
    npm install

Copy the `/frontend/config.app.json.example` to `/frontend/config.app.json` and add/update the required variables

## Production Build

    cd frontend
    npm run prod

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
