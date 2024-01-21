"use client";
import { FaExclamationTriangle } from 'react-icons/fa';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AlertDialogOnlyOnDesktop() {
    return (
        <AlertDialog open={true}>

            <AlertDialogContent className="text-red-700 bg-red-100">
                <AlertDialogHeader className="flex items-center space-x-2">
                    <FaExclamationTriangle className="text-red-500" />
                    <AlertDialogTitle>Access Denied</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    You cannot view this page on mobile screens. Please use a desktop.
                </AlertDialogDescription>

            </AlertDialogContent>
        </AlertDialog>
    )
}
