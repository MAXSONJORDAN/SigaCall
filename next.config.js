const withPlugins = require("next-compose-plugins");
/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");

const portAletoria = Math.floor((new Date().getTime() % 10000) + 1000);
const app = require('./src/integrations/socket.io/index.js');
app.listen(portAletoria)
console.log("listening socket on http://127.0.0.1:" + portAletoria)

global.socketUrl = "127.0.0.1:" + portAletoria;

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: 'http://127.0.0.1:' + portAletoria,
  //     },
  //   ]
  // }
};

console.log("Global antes",global.socketUrl)



module.exports = withPlugins(
  [
    [withFonts],
    // your plugins go here.
  ],
  nextConfig
);
