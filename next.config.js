const withPlugins = require("next-compose-plugins");
/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");
const app = require('./src/integrations/socket.io/index.js');
const { argv } = require("process");

if (!(process.argv && process.argv.includes("build"))) {

  if(process.env.DEBUG_ENV){
    console.log("ENV ATUAL:",process.env)
  }

  if (!process.env.SOCKETURL) {
    const port = process.env.CUSTOM_PORT ?? 3001//Math.floor((new Date().getTime() % 10000) + 1000);
    const host = process.env.CUSTOM_HOST ?? process.env.HOST ?? '127.0.0.1'
    const urlSock = host + ":" + port;
    process.env.SOCKETURL = urlSock;

    app.listen(port)
    console.log("listening socket on http://" + urlSock)
  } else {
    const port = process.env.CUSTOM_PORT_SEC ?? 3002//Math.floor((new Date().getTime() % 10000) + 1000);
    const host = process.env.CUSTOM_HOST ?? process.env.HOST ?? '127.0.0.1'
    const urlSock = host + ":" + port;
    process.env.SOCKETURL = urlSock;

    app.listen(port)
    console.log("listening socket on http://" + urlSock)
  }
}

const nextConfig = {
  experimental: {
    serverActions: true,
  }
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
