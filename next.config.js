/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { newNextLinkBehavior: false, largePageDataBytes: 128 * 100000 },
  typescript: { ignoreBuildErrors: true },
  publicRuntimeConfig: { version },
  pageExtensions: ['page.tsx'],
};

module.exports = nextConfig;
