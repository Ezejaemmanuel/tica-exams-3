"use client";
import React from 'react';
import { FaTimesCircle, FaCheckCircle, FaPlayCircle, FaRegCheckCircle } from 'react-icons/fa';
import CustomCard from './customCard';

interface StatusComponentProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    content: string;
}


// Exam Not Available Component
export const ExamNotAvailable: React.FC<StatusComponentProps> = ({ setIsOpen, content }) => {
    return (
        <CustomCard
            icon={FaTimesCircle}
            title="Exam Not Available"
            content={content}
            buttonOneText="Go Back"
            buttonOneAction={() => setIsOpen(false)}
            cardColor="bg-rose-500"
            buttonOneColor="bg-red-500"
            ringColor="ring-red-300"
        />
    );
};

// Exam Available Component
export const ExamAvailable: React.FC<StatusComponentProps> = ({ setIsOpen, content }) => {
    return (
        <CustomCard
            icon={FaCheckCircle}
            title="Exam Available"
            content={content}
            buttonOneText="Accept"
            buttonTwoText="Go Back"
            buttonOneAction={() => {/* Accept exam action */ }}
            buttonTwoAction={() => setIsOpen(false)}
            cardColor="bg-green-400"
            buttonOneColor="bg-green-500"
            buttonTwoColor="bg-yellow-500"
            ringColor="ring-yellow-300"
        />
    );
};

// Exam Ongoing Component
export const ExamOngoing: React.FC<StatusComponentProps> = ({ content, setIsOpen }) => {
    return (
        <CustomCard
            icon={FaPlayCircle}
            title="Exam Ongoing"
            content={content}
            buttonOneText="Start Exam"
            buttonOneAction={() => {/* Start exam action */ }}
            cardColor="bg-red-500 animate-pulse"
            buttonOneColor="bg-blue-500"
            ringColor="ring-blue-300"
        />
    );
};

// Exam Completed Component
export const ExamCompleted: React.FC<StatusComponentProps> = ({ setIsOpen, content }) => {
    return (
        <CustomCard
            icon={FaRegCheckCircle}
            title="Exam Completed"
            content={content}
            buttonOneText="Check Results"
            buttonTwoText="Go Back"
            buttonOneAction={() => {/* Check results action */ }}
            buttonTwoAction={() => setIsOpen(false)}
            cardColor="bg-green-900"
            buttonOneColor="bg-green-500"
            buttonTwoColor="bg-gray-500"
            ringColor="ring-green-300"
        />
    );
};
