// components/IsGoingOn.tsx

// components/IsGoingOn.tsx

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";



const IsGoingOn: React.FC = () => {
    const pathname = usePathname();
    // ... rest of your component
    // Check if 'write-exam' is not part of the pathname
    const isExamPage = !pathname.includes('write-exam');

    return (
        <>
            {isExamPage && (
                <div className="fixed top-0 left-0 w-full bg-red-500 animate-pulse  text-black text-sm text-center z-50 p-2">
                    Exam is going on ..<Badge>
                        <Link href={`/exam-instructions`}>Start Exam</Link>
                    </Badge>
                </div>
            )}
        </>
    );
};
// router.push(`)

export default IsGoingOn;
