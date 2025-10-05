const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  config => {
    // Ignore node_modules in the client build
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "crypto": false,
      "stream": false,
      "assert": false,
      "http": false,
      "https": false,
      "os": false,
      "url": false,
      "zlib": false,
      "path": false,
      "querystring": false,
      "fs": false,
      "net": false,
      "tls": false,
      "buffer": false,
      "util": false,
      "process": false,
      "module": false,
      "child_process": false,
      "worker_threads": false
    };
    return config;
  }
);