/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");

const nextConfig = {};

module.exports = withPlugins(
  [
    [withFonts],
    // your plugins go here.
  ],
  nextConfig
);
