import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({});
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/", "/api/webhook", "/api/register", "/register", "/tica-exams-3-64dlonnwe-ezejaemmanuel.vercel.app/api/register", "/api/manual-setting-questions"]
});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};