// CandidateProfile.tsx
"use client";
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ProfilePhotoUploader from './profileUplaoder';

const CandidateProfile: React.FC = () => {
    const { setValue } = useFormContext();

    const handleUploadSuccess = (url: string) => {
        setValue("candidateProfile", url); // Update the form state with the profile photo URL
    };

    return (
        <div className="max-w-xs p-6 mx-auto mt-6 bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg md:max-w-lg">
            <ProfilePhotoUploader onUploadSuccess={handleUploadSuccess} />
        </div>
    );
};

export default CandidateProfile;
