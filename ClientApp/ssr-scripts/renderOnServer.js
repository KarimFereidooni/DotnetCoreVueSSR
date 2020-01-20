const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
process.env.VUE_ENV = "server";
process.env.NODE_ENV = "production";

const serverBundle = require("../../wwwroot/dist/vue-ssr-server-bundle.json");
const clientManifest = require("../../wwwroot/dist/vue-ssr-client-manifest.json");

const bundleRenderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  clientManifest
  //inject: false
});

const prerendering = require("aspnet-prerendering");
module.exports = prerendering.createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    const context = {
      url: params.url,
      absoluteUrl: params.absoluteUrl,
      baseUrl: params.baseUrl,
      data: params.data,
      domainTasks: params.domainTasks,
      location: params.location,
      origin: params.origin
    };

    bundleRenderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err.message);
      }
      resolve({
        html: html
      });
    });
  });
});
