import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaSchool, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-teal-600 dark:text-teal-300">
                        <FaSchool className="h-8" aria-label="School Icon" />
                    </div>

                    <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
                        <li>
                            <Link href="https://www.facebook.com/TansiInternationalCollege" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                <span className="sr-only">Facebook</span>
                                <FaFacebook className="h-6 w-6" aria-hidden="true" />
                            </Link>
                        </li>

                        <li>
                            <Link href="https://www.instagram.com/tansiinternationalcollege" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                <span className="sr-only">Instagram</span>
                                <FaInstagram className="h-6 w-6" aria-hidden="true" />
                            </Link>
                        </li>

                        <li>
                            <Link href="https://twitter.com/tansi_college" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                <span className="sr-only">Twitter</span>
                                <FaTwitter className="h-6 w-6" aria-hidden="true" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/tansiinternationalcollege" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                <span className="sr-only">Youtube</span>
                                <FaYoutube className="h-6 w-6" aria-hidden="true" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 dark:border-gray-800 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">About Us</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Our Mission
                                </Link>
                            </li>

                            <li>
                                <Link href="/about/history" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    History
                                </Link>
                            </li>

                            <li>
                                <Link href="/about/staff" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Staff
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Academics</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/academics/curriculum" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Curriculum
                                </Link>
                            </li>

                            <li>
                                <Link href="/academics/extracurriculars" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Extracurriculars
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Admissions</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/admissions/apply" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Apply
                                </Link>
                            </li>

                            <li>
                                <Link href="/admissions/tuition" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Tuition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Contact Us</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/contact" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                    Contact Information
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Tansi International College, Awka. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
