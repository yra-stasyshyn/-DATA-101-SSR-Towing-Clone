/** @type {import('next').NextConfig} */
const withPwa = require ('next-pwa')({
  dest: '/',
});
const nextConfig = withPwa({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // images: {
  //   domains: [
  //     'avico-global-domain-images.s3.amazonaws.com',
  //     'avico-global-template-images.s3.ap-northeast-1.amazonaws.com',
  //     'bucket-pratham.s3.ap-south-1.amazonaws.com',
  //   ],
  // },
  env: {
    IMAGE_PATH: 'https://avico-global-domain-images.s3.amazonaws.com/images/',
  },
});
module.exports = nextConfig;
