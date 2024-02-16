/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "lagom-spaces.fra1.digitaloceanspaces.com",
      //   port: "",
      //   pathname: "/**",
      // },
      // example of locallly hosted images
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**", // anpassen!!!!!!!!!!!!!!!!
        // this translates to:
        // http://localhost:3000/uploads/** (which is the default)
      },
    ],
    domains: ['127.0.0.1'],
  },
}

module.exports = nextConfig
