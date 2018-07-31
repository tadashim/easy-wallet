/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

importScripts(
  "precache-manifest.b63208f78c9bbf4a94e5c324720f85dd.js"
);

workbox.core.setCacheNameDetails({prefix: "easy-wallet"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "b1b7b33476ab27bcc4bb270cea9bd921"
  },
  {
    "url": "precache-manifest.0d6b5b494a1a346a80891e928fa1fd29.js",
    "revision": "0d6b5b494a1a346a80891e928fa1fd29"
  },
  {
    "url": "precache-manifest.8e18a23e2696642a750c4ce40ea50c84.js",
    "revision": "8e18a23e2696642a750c4ce40ea50c84"
  },
  {
    "url": "precache-manifest.d2ca735d2018d3130e11b66fd2baf579.js",
    "revision": "d2ca735d2018d3130e11b66fd2baf579"
  },
  {
    "url": "service-worker.js",
    "revision": "6e3dbfcf8b7cb2f92fdda786a9f335dc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
