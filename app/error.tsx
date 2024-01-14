"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX, SVGProps, useEffect } from "react";

export default function ErrorNextjs({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="dark:bg-black bg-slate-200">
            <Card className="bg-red-500 dark:bg-red-700 text-white max-w-md mx-auto p-4 rounded-md shadow-md">
                <CardHeader className="flex items-center space-x-2">
                    <AlertCircleIcon className="h-6 w-6" />
                    <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent className="min-w-0 text-sm md:text-base">
                    <p className=" font-extrabold">{error.name}</p>
                    <p className="break-words sm:text-xs">{error.message}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={() => reset} className="border-white text-white" variant="outline">
                        reset
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}


function AlertCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    )
}
