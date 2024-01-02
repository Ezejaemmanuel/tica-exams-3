/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tansicollege.edu.ng',
            },

        ],
    },
}

module.exports = nextConfig
