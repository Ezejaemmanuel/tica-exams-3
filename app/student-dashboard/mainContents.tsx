// "use client";
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { useUserInfo } from '@/lib/tenstack-hooks/userInfo'
// import { useUser } from '@clerk/nextjs';
// import React, { useState } from 'react'
// import Image from 'next/image';
// import { ExamNotAvailable, ExamAvailable, ExamOngoing, ExamCompleted } from '@/components/card-status';
// import { Button } from '@/components/ui/button';
// import { ExamStatusPage } from '@/components/exam-status/aside';
// const MainContents = () => {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [isOpen, setIsOpen] = useState(false);




//     const { data: userInfo } = useUserInfo();
//     console.log("this is the data returned from the backend useUserInfo hook", userInfo);

//     if (!isLoaded || !isSignedIn) {
//         return null;
//     }
//     return (
//         <main className="flex-1 p-4  mx-auto">
//             <Card className="max-w-md mx-auto shadow-lg border bg-white dark:bg-black rounded-lg">
//                 <CardHeader className="flex items-center space-x-4">
//                     <div className="relative rounded-full w-24 h-24 overflow-hidden"> {/* Adjust width and height as needed */}
//                         <Image
//                             alt="Avatar"
//                             className="rounded-full"
//                             src={user.imageUrl}
//                             quality={60}
//                             width={100} // These width and height are used for aspect ratio calculation
//                             height={100}
//                         />
//                     </div>
//                     <div>
//                         <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">{userInfo.name}</CardTitle>
//                         <CardDescription className="text-gray-500 dark:text-gray-400">
//                             class: {userInfo.class}
//                         </CardDescription>
//                     </div>
//                 </CardHeader>

//                 <CardContent className="space-y-2">
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span> {userInfo.locality}
//                     </p>
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span> {userInfo.fullAddress}
//                     </p>
//                 </CardContent>
//             </Card>
//             <Card className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 bg-white dark:bg-black dark:border-gray-700 rounded-lg">
//                 <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="flex flex-wrap justify-between gap-2">
//                         <Button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring dark:bg-blue-700 dark:hover:bg-blue-800 sm:w-auto md:w-auto lg:w-auto xl:w-auto" name="button1" onClick={() => setIsOpen(true)}>Exam status</Button>
//                         <Button className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring dark:bg-green-700 dark:hover:bg-green-800 sm:w-auto md:w-auto lg:w-auto xl:w-auto" name="button2">Button 2</Button>
//                         <Button className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring dark:bg-red-700 dark:hover:bg-red-800 sm:w-auto md:w-auto lg:w-auto xl:w-auto" name="button3">Button 3</Button>
//                         <Button className="w-full px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring dark:bg-yellow-700 dark:hover:bg-yellow-800 sm:w-auto md:w-auto lg:w-auto xl:w-auto" name="button4">Button 4</Button>
//                     </div>
//                     <ExamStatusPage
//                         isOpen={isOpen}
//                         setIsOpen={setIsOpen}
//                         classLevel={userInfo.classLevel.toLowerCase() as "jss1" | "ss1" | "jss2"} />
//                 </CardContent>

//             </Card>
//             <Card className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 bg-white dark:bg-black dark:border-gray-700 rounded-lg">
//                 <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">SUBJECTS</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                     <div>
//                         <span className=" text-gray-700 dark:text-gray-300 font-extrabold text-lg">Subjects:</span>
//                         <ul>
//                             {['English', 'Maths', 'General Studies'].map((subject, index) => (
//                                 <li key={index} className="text-gray-700 dark:text-gray-300">{subject}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     {/* <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Course:</span> Computer Science
//                     </p>
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Start Date:</span> September 1, 2024
//                     </p> */}
//                 </CardContent>
//             </Card>

//             <Card className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 bg-white dark:bg-black dark:border-gray-700 rounded-lg">
//                 <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">Exam Schedule</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Next Exam:</span> Calculus I
//                     </p>
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Date:</span><Badge className='rounded-lg'>not available yet</Badge>
//                     </p>
//                     <p>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300">Time:</span> <Badge className='rounded-lg'>not available yet</Badge>
//                     </p>
//                 </CardContent>
//             </Card>

//         </main>
//     )
// }

// export default MainContents







