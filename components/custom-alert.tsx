import React, { FC, ReactNode } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CustomAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    Icon?: ReactNode; // Optional, as we might use a custom component instead
    title?: string;
    description?: string;
    bgColor: string;
    textColor: string;
    onConfirm: () => void;
    CustomComponent?: FC | ReactNode; // New prop for the custom component
}

export const CustomAlert: FC<CustomAlertProps> = ({
    open,
    onOpenChange,
    Icon,
    title,
    description,
    bgColor,
    textColor,
    onConfirm,
    CustomComponent,
}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <button className="hidden">Open</button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`${bgColor} ${textColor} p-4 rounded-lg`}>
                {CustomComponent ? (
                    <>{CustomComponent}</>
                ) : (
                    <>
                        <AlertDialogHeader className="flex items-center space-x-2">
                            {Icon && Icon}
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                        <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                            <AlertDialogCancel asChild>
                                <button className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">Cancel</button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <button className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600" onClick={onConfirm}>Confirm</button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};
