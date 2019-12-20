import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from 'rollup-plugin-replace';
import { sass } from '@stencil/sass';
import configValues from './config.app.json';

export const config: Config = {
  outputTargets: [{
    type: 'www',
    baseUrl: configValues.BASE_URL,
    dir: '../public',
    empty: false,
    serviceWorker: null
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.scss',
  plugins: [
    nodePolyfills(),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: configValues
    }),
    sass()
  ]
};
