const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
process.env.VUE_ENV = "server";
process.env.NODE_ENV = "production";

const serverBundle = require("../../wwwroot/dist/vue-ssr-server-bundle.json");
const clientManifest = require("../../wwwroot/dist/vue-ssr-client-manifest.json");

const template = require("fs").readFileSync(
  path.join(__dirname, "./index.template.html"),
  "utf-8"
);

const bundleRenderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template,
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
      origin: params.origin,
      sampleData: paramas.data.sampleData
    };

    bundleRenderer.renderToString(context, (err, _html) => {
      if (err) {
        reject(err.message);
      }
      resolve({
        html: _html
      });
    });
  });
});
