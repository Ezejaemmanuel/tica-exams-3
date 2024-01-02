
import { FC } from 'react';
import { IconType } from 'react-icons';
import { Card, CardContent, CardHeader } from '../ui/card';

interface AppProps {
    title: string;
    subtitle: string;
    instructions: string;
    Icon: IconType;
}

const App: FC<AppProps> = ({ title, subtitle, instructions, Icon }) => {
    return (
        <Card className="max-w-[400px] w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mb-4 transition-colors duration-500">
            <CardHeader className="flex gap-3">
                <Icon size={40} className="text-blue-500 dark:text-blue-300" aria-label="Step Icon" />
                <div className="flex flex-col">
                    <p className="text-md text-black dark:text-white text-justify font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">{title}</p>
                    <p className="text-small text-gray-600 dark:text-gray-300 text-justify">{subtitle}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-black dark:text-white mb-4 text-justify">{instructions}</p>
            </CardContent>
        </Card>
    );
}

export default App;
