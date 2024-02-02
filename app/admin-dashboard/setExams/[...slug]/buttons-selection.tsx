// components/SubjectButtons.tsx
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface SubjectButtonsProps {
    examId: string;
}

const SubjectButtons: React.FC<SubjectButtonsProps> = ({ examId }) => {
    const router = useRouter();
    const pathname = usePathname();

    const subjects = ['english', 'maths', 'generalStudies'];

    const isSubjectInPathname = (subject: string) => {
        return pathname?.includes(subject);
    };

    const handleRedirect = (subject: string) => {
        router.push(`/admin-dashboard/setExams/${subject}/${examId}`);
    };

    return (
        <div className="flex space-x-4">
            {subjects.map((subject) => (
                <Badge
                    key={subject}
                    className={`px-4 py-2 text-white font-bold ${isSubjectInPathname(subject) ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    onClick={() => handleRedirect(subject)}
                >
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </Badge>
            ))}
        </div>
    );
};

export default SubjectButtons;
