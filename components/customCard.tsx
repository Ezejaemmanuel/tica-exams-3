"use client";
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

interface CustomCardProps {
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    content: string;
    buttonOneText?: string;
    buttonTwoText?: string;
    buttonOneAction?: () => void;
    buttonTwoAction?: () => void;
    cardColor?: string;
    buttonOneColor?: string;
    buttonTwoColor?: string;
    ringColor?: string;
    height?: string;
    width?: string;
    contentTextSize?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
    icon: Icon,
    title,
    content,
    buttonOneText = 'Cancel',
    buttonTwoText = 'Confirm',
    buttonOneAction,
    buttonTwoAction,
    cardColor = 'dark:bg-black bg-slate-200',
    buttonOneColor = 'text-white bg-blue-500',
    buttonTwoColor = 'text-white bg-red-500',
    ringColor = 'ring-2 ring-rose-300 dark:ring-rose-700',
    height = 'auto',
    width = 'max-w-md',
    contentTextSize = "text-sm md:text-base"
}) => {
    return (
        <div className="flex justify-center items-center ">
            <Card className={`${cardColor} mx-auto gap-y-5 flex flex-col items-center justify-center ${height} ${width} p-4 rounded-md shadow-md ${ringColor}`}>
                {Icon && (
                    <CardHeader className="flex justify-center items-center space-x-2">
                        <Icon className="h-6 w-6" />
                    </CardHeader>
                )}
                <CardTitle className="text-center">{title}</CardTitle>

                <CardContent className={`min-w-0 ${contentTextSize} text-cente`}>
                    <p>{content}</p>
                </CardContent>
                {(buttonOneAction || buttonTwoAction) && (
                    <CardFooter className="flex justify-center space-x-2">
                        {buttonOneAction && (
                            <Button onClick={buttonOneAction} className={`border-white ${buttonOneColor}`} variant="outline">
                                {buttonOneText}
                            </Button>
                        )}
                        {buttonTwoAction && (
                            <Button onClick={buttonTwoAction} className={`border-white ${buttonTwoColor}`} variant="outline">
                                {buttonTwoText}
                            </Button>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default CustomCard;


export const CustomSmallerCard: React.FC<CustomCardProps> = ({
    icon: Icon,
    title,
    content,
    buttonOneText = 'Cancel',
    buttonTwoText = 'Confirm',
    buttonOneAction,
    buttonTwoAction,
    cardColor = 'dark:bg-black bg-slate-200',
    buttonOneColor = 'text-white bg-blue-500',
    buttonTwoColor = 'text-white bg-red-500',
    ringColor = 'ring-2 ring-rose-300 dark:ring-rose-700',
    height = 'auto',
    width = 'max-w-md',
}) => {
    return (
        <div className="flex justify-center items-center ">
            <Card className={`${cardColor} mx-auto gap-y-5 flex flex-col items-center justify-center ${height} ${width} p-4 rounded-md shadow-md ${ringColor}`}>
                {Icon && (
                    <CardHeader className="flex justify-center items-center space-x-2">
                        <Icon className="h-6 w-6" />
                    </CardHeader>
                )}
                <CardTitle className="text-center">{title}</CardTitle>

                <CardContent className="min-w-0 text-sm md:text-base text-center">
                    <p>{content}</p>
                </CardContent>
                {(buttonOneAction || buttonTwoAction) && (
                    <CardFooter className="flex justify-center space-x-2">
                        {buttonOneAction && (
                            <Button onClick={buttonOneAction} className={`border-white ${buttonOneColor}`} variant="outline">
                                {buttonOneText}
                            </Button>
                        )}
                        {buttonTwoAction && (
                            <Button onClick={buttonTwoAction} className={`border-white ${buttonTwoColor}`} variant="outline">
                                {buttonTwoText}
                            </Button>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};
