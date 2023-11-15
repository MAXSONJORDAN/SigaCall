const withPlugins = require("next-compose-plugins");
/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");
const app = require('./src/integrations/socket.io/index.js');

if (!process.env.SOCKETURL) {
  const port = 3001//Math.floor((new Date().getTime() % 10000) + 1000);
  const urlSock = "127.0.0.1:" + port;
  process.env.SOCKETURL = urlSock;

  app.listen(port)
  console.log("listening socket on http://" + urlSock)
}else{
  const port = 3002//Math.floor((new Date().getTime() % 10000) + 1000);
  const urlSock = "127.0.0.1:" + port;
  process.env.SOCKETURL = urlSock;

  app.listen(port)
  console.log("listening socket on http://" + urlSock)
}


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


module.exports = withPlugins(
  [
    [withFonts],
    // your plugins go here.
  ],
  nextConfig
);
