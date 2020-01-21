const fs = require("fs");
const path = require("path");
const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");
const app = express();

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
      // inject: false
    })
  );
}

let renderer;

const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
renderer = createRenderer(serverBundle, {
  clientManifest
});

app.use("/dist", express.static(path.resolve(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const context = {
    url: req.url
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url);
      } else {
        // Render Error Page or Redirect
        res.status(500).end("500 | Internal Server Error");
        // tslint:disable-next-line: no-console
        console.error(`error during render : ${req.url}`);
        // tslint:disable-next-line: no-console
        console.error(err);
      }
    } else {
      res.status(context.HTTPStatus || 200);
      res.send(
        `<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" href="dist/css/chunk-vendors.css"></head><body>${html}<script src="dist/js/main.js"></script><script src="dist/js/chunk-vendors.js"></script></body></html>`
      );
    }
  });
});

module.exports = app;
