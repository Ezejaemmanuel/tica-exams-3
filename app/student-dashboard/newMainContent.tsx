"use client";
import React, { useState } from 'react';
import { useUserInfo } from '@/lib/tenstack-hooks/userInfo';
import { addMinutes, format, isAfter, isBefore } from 'date-fns';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ExamStatusPage } from '@/components/exam-status/aside';
import { Button } from '@/components/ui/button';

export default function MainContents() {
    const { data: userInfo, isLoading, isError } = useUserInfo();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="flex w-full lg:w-[90%] flex-col md:flex-row gap-6 md:gap-12">
            <div className="w-full lg:w-[90%] md:w-1/3">
                <ExamStatusPage
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    classLevel={userInfo.classLevel.toLowerCase() as "jss1" | "ss1" | "jss2"} />
                <Card className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                    <Avatar className="w-32 h-32 mt-4">
                        <AvatarImage alt="User Avatar" src={userInfo.candidateProfile || "/placeholder-avatar.jpg"} />
                        <AvatarFallback>{userInfo.name}</AvatarFallback>
                    </Avatar>
                    <Button className="w-full px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring dark:bg-yellow-700 dark:hover:bg-yellow-800 sm:w-auto md:w-auto lg:w-auto xl:w-auto" name="button1" onClick={() => setIsOpen(true)}>Exam status</Button>

                    <CardContent>
                        <h2 className="text-2xl font-bold text-yellow-500 md:text-3xl lg:text-4xl">{userInfo.name}</h2>
                        <div className="text-left text-gray-500 dark:text-gray-400 md:text-sm lg:text-base">
                            <p><strong className="font-semibold text-green-300">Name:</strong> {userInfo.name}</p>
                            <p><strong className="font-semibold text-green-300">Present Class:</strong> {userInfo.presentClass}</p>
                            <p><strong className="font-semibold text-green-300">Class:</strong> {userInfo.class}</p>
                            <p><strong className="font-semibold text-green-300">Date of Birth:</strong> {format(new Date(userInfo.dateOfBirth), 'PPP')}</p>
                            <p><strong className="font-semibold text-green-300">Official Phone or Whatsapp Number:</strong> {userInfo.officialPhoneOrWhatsappNumber}</p>
                            <p><strong className="font-semibold text-green-300">Full Address:</strong> {userInfo.fullAddress}</p>
                            <p><strong className="font-semibold text-green-300">State:</strong> {userInfo.state}</p>
                            <p><strong className="font-semibold text-green-300">Home Address:</strong> {userInfo.homeAddress}</p>
                            <p><strong className="font-semibold text-green-300">Class Level:</strong> {userInfo.classLevel}</p>
                            <p><strong className="font-semibold text-green-300">Date of Baptism:</strong> {userInfo.dateOfBaptism ? format(new Date(userInfo.dateOfBaptism), 'PPP') : 'N/A'}</p>
                            <p><strong className="font-semibold text-green-300">Date of Holy Communion:</strong> {userInfo.dateOfHolyCommunion ? format(new Date(userInfo.dateOfHolyCommunion), 'PPP') : 'N/A'}</p>
                            <p><strong className="font-semibold text-green-300">Date of Holy Confirmation:</strong> {userInfo.dateOfHolyConfirmation ? format(new Date(userInfo.dateOfHolyConfirmation), 'PPP') : 'N/A'}</p>
                            <p><strong className="font-semibold text-green-300">Present School:</strong> {userInfo.presentSchool}</p>
                            <p><strong className="font-semibold text-green-300">Finished Primary:</strong> {userInfo.finishedPrimary}</p>
                            <p><strong className="font-semibold text-green-300">Mass Server:</strong> {userInfo.massServer}</p>
                            <p><strong className="font-semibold text-green-300">Pious Society:</strong> {userInfo.piousSociety}</p>
                            <p><strong className="font-semibold text-green-300">Name of Father:</strong> {userInfo.fathersName}</p>
                            <p><strong className="font-semibold text-green-300">Name of Mother:</strong> {userInfo.mothersName}</p>
                            <p><strong className="font-semibold text-green-300">Local Government Area:</strong> {userInfo.localGovernmentArea}</p>
                            <p><strong className="font-semibold text-green-300">Parent Deceased:</strong> {userInfo.parentDeceased}</p>
                            <p><strong className="font-semibold text-green-300">Catholic:</strong> {userInfo.catholic}</p>
                            <p><strong className="font-semibold text-green-300">Denomination:</strong> {userInfo.denomination}</p>
                            <p><strong className="font-semibold text-green-300">Supports Entry:</strong> {userInfo.supportsEntry}</p>
                            <p><strong className="font-semibold text-green-300">Can Sponsor:</strong> {userInfo.canSponsor}</p>
                        </div>

                    </CardContent>
                </Card>
            </div>
            <div className="w-full md:w-2/3">
                {/* Assuming userExam is an array with details for each exam. Adjust as necessary. */}

                {/* Assuming userExam is an array with details for each exam. Adjust as necessary. */}
                {userInfo.userExam?.map((examInfo, index) => {
                    const examDate = new Date(examInfo.exam.date);
                    const currentDate = new Date();
                    const examEndDate = addMinutes(examDate, examInfo.exam.lengthOfExam ?? 0);
                    let examStatus = '';

                    if (isBefore(examDate, currentDate) && isBefore(currentDate, examEndDate)) {
                        examStatus = 'is currently going on';
                    } else if (isBefore(currentDate, examDate)) {
                        examStatus = 'will take place';
                    } else {
                        examStatus = 'took place';
                    }

                    return (
                        <Card key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mt-6">
                            <CardHeader>
                                <CardTitle className="text-yellow-500 md:text-2xl lg:text-3xl">Exam Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-gray-700 dark:text-gray-300 md:text-sm lg:text-base">The exam for {examInfo.exam.classLevel} {examStatus} on {format(examDate, 'PPP')} at {format(examDate, 'p')} and will last for {examInfo.exam.lengthOfExam} minutes.</p>
                            </CardContent>
                        </Card>
                    );
                })}

                {userInfo.paymentConfirmation && (
                    <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mt-6">
                        <CardHeader>
                            <CardTitle className="text-yellow-500 md:text-2xl lg:text-3xl">Payment Confirmation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300 md:text-sm lg:text-base">
                                <strong className="font-semibold text-green-300">Payment Status:</strong>
                                {userInfo.paymentConfirmation.paymentConfirmed ? 'Confirmed' :
                                    <span className="text-red-500 animate-pulse">Pending</span>}
                            </p>

                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
