/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // TODO=> convert this to new domain
        domains: ['confider-local-dev.s3.amazonaws.com'],
        domains: ['media.licdn.com'],
      },
};

export default nextConfig;
