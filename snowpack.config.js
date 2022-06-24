// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  root: ".",
  mount: {
    ".": {url: '/', resolve: false,},
    "./build": {url: '/build', static: true, resolve: false, },
    "./build/assets": {url: '/build/assets', static: true, resolve: false, },
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
