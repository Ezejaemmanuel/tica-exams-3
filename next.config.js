/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tansicollege.edu.ng',
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "degyimrmcgeswvlkrasq.supabase.co",
            }

        ],
    },
}

module.exports = nextConfig
