// export function addBaseURL(url: string): string {
//     const env = process.env.NODE_ENV;

//     if (env === 'development') {
//         return `http://localhost:3000/${url}`;
//     } else {
//         // if (process.env.VERCEL_URL) {
//         return `/${url}`;
//         // }
//     }
// }


export function addBaseURL(url: string): string {
    const env = process.env.NODE_ENV;

    const vercelUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    console.log("thsi is hte serversiide vercel url ", process.env.VERCEL_URL);
    console.log("this is the client side vercel url", process.env.NEXT_PUBLIC_VERCEL_URL);
    console.log("this is the general verclUrl", vercelUrl);
    if (env === 'development') {
        return `http://localhost:3000/${url}`;
    } else {
        if (vercelUrl) {
            return `/${url}`;
        } else {
            throw new Error('VERCEL_URL or NEXT_PUBLIC_VERCEL_URL environment variable is not set');
        }
    }
}
