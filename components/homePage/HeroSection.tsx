
// import React from 'react'
// import Link from 'next/link'
// const Header = () => {
//     return (
//         <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour1.jpg?itok=8vycfFcs)" }}>
//             <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r ">
//             </div>

//             <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
//                 <div className="max-w-xl text-center sm:text-left ">
//                     <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
//                         Welcome to Tansi International College
//                         <strong className="block font-extrabold text-red-700">
//                             Online Examination Platform.
//                         </strong>
//                     </h1>

//                     <p className="mt-4 max-w-lg sm:text-xl/relaxed text-black">
//                         We provide a seamless and convenient platform for prospective students living far from our college to write entrance examinations online.
//                     </p>

//                     <div className="mt-8 flex flex-wrap gap-4 text-center">
//                         <Link href="/register" className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
//                             Register Now

//                         </Link>

//                         <Link href="/learn-more" className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
//                             Learn More

//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Header;


import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import { SignedIn, SignedOut } from '@clerk/nextjs'
import RegisteredOrNot from './registeredOrNot'
import ButtonSkeleton from './buttonSkeleton'

const Header = () => {
    return (
        <div className="relative bg-cover bg-center bg-no-repeat">
            <Image
                src="https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour1.jpg?itok=8vycfFcs"
                fill
                priority={true}
                quality={100}
                // loading='lazy'
                className="absolute z-0" alt={''} />
            <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r ">
            </div>

            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl text-center sm:text-left ">
                    <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
                        Welcome to Tansi International College
                        <strong className="block font-extrabold text-red-700">
                            Online Examination Platform.
                        </strong>
                    </h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed text-black">
                        We provide a seamless and convenient platform for prospective students living far from our college to write entrance examinations online.
                    </p>
                    <Suspense fallback={<ButtonSkeleton />}>
                        <RegisteredOrNot />
                    </Suspense>

                </div>
            </div>
        </div>
    )
}

export default Header;

// "use client";
// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import Link from 'next/link';
// import Image from 'next/image';
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

// export function Header() {
//     const [autoplay, setAutoplay] = React.useState(null);

//     React.useEffect(() => {
//         setAutoplay(Autoplay({ delay: 2000 }));
//     }, []);

//     const images = [
//         "https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour1.jpg?itok=8vycfFcs",
//         "https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour2.jpg?itok=UvWrQvQx",
//         "https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour5.jpg?itok=Zcng1ESv",
//         "https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour6.jpg?itok=SsRpY2wM",
//         "https://tansicollege.edu.ng/sites/default/files/styles/media_gallery_large/public/new_tour9.jpg?itok=6ARP4LjJ"
//         // Add more image URLs here...
//     ];

//     return (
//         <div className="relative bg-cover bg-center bg-no-repeat">
//             <Carousel
//                 plugins={[autoplay]}
//                 className="w-full h-screen absolute z-0"
//             // onMouseEnter={plugin.current.stop}
//             // onMouseLeave={plugin.current.reset}


//             >
//                 <CarouselContent>
//                     {images.map((url, index) => (
//                         <CarouselItem key={index}>
//                             <Image
//                                 src={url}
//                                 quality={100}
//                                 className="absolute z-0 h-screen w-full"
//                                 alt={'dfjksjk'}
//                                 // placeholder="blur"
//                                 loading="lazy"
//                                 onLoad={(e) => console.log("IT HAS LLOADEDED")}
//                                 width={1000}
//                                 height={1000}
//                             />
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>

//             <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r ">
//             </div>

//             <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
//                 <div className="max-w-xl text-center sm:text-left ">
//                     <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
//                         Welcome to Tansi International College
//                         <strong className="block font-extrabold text-red-700">
//                             Online Examination Platform.
//                         </strong>
//                     </h1>

//                     <p className="mt-4 max-w-lg sm:text-xl/relaxed text-black">
//                         We provide a seamless and convenient platform for prospective students living far from our college to write entrance examinations online.
//                     </p>

//                     <div className="mt-8 flex flex-wrap gap-4 text-center">
//                         <Link href="/register" className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
//                             Register Now
//                         </Link>

//                         <Link href="/learn-more" className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
//                             Learn More
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;
