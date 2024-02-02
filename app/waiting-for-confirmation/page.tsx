// pages/no-exam.tsx
import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import Link from 'next/link';
import { MdInfoOutline } from 'react-icons/md'; // Import the icon from react-icons

const NoExamPage: NextPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black p-4">
            <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl text-center overflow-hidden">
                <div className="flex flex-col items-center p-6">
                    <MdInfoOutline className="h-12 w-12 text-rose-500 dark:text-rose-400" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
                        Payment an registeration no confirmed
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        The payment and registeration has not been confirmed yet,please be patient as it would be confirmed within 24 hours if not confirmed after that then contact support at <a href=''>tica.com</a>
                    </p>
                </div>
                <div className="flex justify-center pb-6">
                    <Link href="/" passHref>
                        <Button className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800 rounded-lg transition-colors">
                            Go Back
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoExamPage;
