"use client";
import React, { useEffect } from 'react';
import { IoBatteryFull, IoBatteryHalf, IoBatteryDead, IoBatteryCharging } from 'react-icons/io5';
import { useBattery } from '@uidotdev/usehooks';
import { toast } from 'sonner';

const BatteryStatus: React.FC = () => {
    const { loading, level, charging, supported } = useBattery();

    useEffect(() => {
        if (level !== null) {
            const percentage = Math.round(level * 100);
            let message = '';
            let emoji = '';
            let showToast = true;
            let className = 'text-green-600';


            switch (percentage) {
                case 100:
                    message = 'Fully charged and ready to go! 🎉 No worries about losing work.';
                    emoji = '💯';
                    className = "";
                    break;
                case 80:
                    message = 'Battery looking good at 80%! Keep it up! 🌟';
                    emoji = '🔋';

                    break;
                case 60:
                    message = 'Battery at 60%, a comfortable level. 😌';
                    emoji = '🔋';
                    className = 'text-yellow-400';

                    break;
                case 40:
                    message = 'Battery at 40%, consider charging soon to avoid work interruption. ⏳';
                    emoji = '🔋';
                    className = 'text-yellow-600';
                    break;
                case 30:
                case 20:
                case 15:
                case 10:
                case 5:
                case 4:
                case 3:
                case 2:
                case 1:
                    message = `Battery at ${percentage}%. Charge immediately to prevent work loss! 🚨`;
                    emoji = '🔋';
                    className = "text-red-500"
                    break;
                default:
                    showToast = false;
                    break;
            }

            if (showToast) {
                toast.info(`${emoji} ${message}`, {
                    position: "top-right",
                    className: "sm:text-xs",
                    duration: 3000
                });
            }
        }
    }, [level]);

    if (!supported) {
        return null; // Do not render the component if the Battery Status API is not supported
    }

    if (loading) {
        return <div className="fixed top-20 right-0 m-4 text-xs md:text-sm">Loading...</div>;
    }

    const getBatteryIcon = (level: number | null) => {
        if (charging) return <IoBatteryCharging className="text-blue-500 dark:text-blue-400 text-xs md:text-sm" size={24} />;
        if (level === null) return <IoBatteryDead className="text-gray-500 dark:text-gray-400 text-xs md:text-sm" size={24} />;
        if (level > 0.8) return <IoBatteryFull className="text-green-600 dark:text-green-500 text-xs md:text-sm" size={24} />;
        if (level > 0.6) return <IoBatteryHalf className="text-green-500 dark:text-green-400 text-xs md:text-sm" size={24} />;
        if (level > 0.4) return <IoBatteryHalf className="text-yellow-500 dark:text-yellow-400 text-xs md:text-sm" size={24} />;
        if (level > 0.2) return <IoBatteryHalf className="text-orange-500 dark:text-orange-400 text-xs md:text-sm" size={24} />;
        return <IoBatteryDead className="text-red-600 dark:text-red-500 text-xs md:text-sm" size={24} />;
    };

    const batteryPercentage = level !== null ? Math.round(level * 100) : 'N/A';

    return (
        <div className="fixed z-50 top-20 right-0 m-4 flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-xs md:text-sm font-medium text-gray-900 dark:text-gray-200">
            {getBatteryIcon(level)}
            <span>
                <div className='text-xs md:text-sm'>
                    {batteryPercentage}%
                </div>
            </span>
        </div>
    );
};

export default BatteryStatus;
