import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const ButtonComponent: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (subject: string) => {
        router.push(`/${subject}`);
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={() => handleClick('english')}
                className={`px-4 py-2 ${pathname.includes('english') ? 'bg-red-500' : 'bg-green-500'} rounded`}
            >
                English
            </button>
            <button
                onClick={() => handleClick('maths')}
                className={`px-4 py-2 ${pathname.includes('maths') ? 'bg-red-500' : 'bg-green-500'} rounded`}
            >
                Maths
            </button>
            <button
                onClick={() => handleClick('generalStudies')}
                className={`px-4 py-2 ${pathname.includes('generalStudies') ? 'bg-red-500' : 'bg-green-500'} rounded`}
            >
                General Studies
            </button>
        </div>
    );
};

export default ButtonComponent;
