/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['img.bbystatic.com', 'anotherdomain.com'], // Add any other external image domains as needed
  },
  // Remove the 'output: "export"' if it's present
};

module.exports = nextConfig;