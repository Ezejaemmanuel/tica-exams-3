// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// // export default authMiddleware({});
// export default authMiddleware({
//   // "/" will be accessible to all users
//   publicRoutes: ["/", "/api/webhook", "/sync-user", "/api/register", "/register", "/tica-exams-3-64dlonnwe-ezejaemmanuel.vercel.app/api/register", "/api/manual-setting-questions", "/student-dashboard", "/make-payment"]
// });


// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

import { authMiddleware } from "@clerk/nextjs";

// This configuration effectively disables the middleware, allowing all routes to be public
export default authMiddleware({
  // By not specifying any publicRoutes, or setting an empty array, we're not restricting any routes
  publicRoutes: [],
});

export const config = {
  // This matcher configuration is set to match all routes universally
  matcher: ['*'],
};
