/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  buildModules: ["@nuxt/postcss8"],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  css: ["@/assets/css/main.css"],
};

module.exports = nextConfig;
