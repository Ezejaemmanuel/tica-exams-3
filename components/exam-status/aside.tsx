import { ExamNotAvailable, ExamAvailable, ExamOngoing, ExamCompleted } from "@/components/card-status";
import { Dialog, DialogContent } from "../ui/dialog";
import React, { Dispatch, SetStateAction } from 'react';

type ExamState = 'notAvailable' | 'available' | 'ongoing' | 'completed';

interface ExamStatusProps {
    examState: ExamState;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ExamStatus: React.FC<ExamStatusProps> = ({ examState, isOpen, setIsOpen }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                {(() => {
                    switch (examState) {
                        case 'notAvailable':
                            return <ExamNotAvailable setIsOpen={setIsOpen} />;
                        case 'available':
                            return <ExamAvailable setIsOpen={setIsOpen} />;
                        case 'ongoing':
                            return <ExamOngoing elapsedTime="30 minutes" setIsOpen={setIsOpen} />;
                        case 'completed':
                            return <ExamCompleted setIsOpen={setIsOpen} />;
                        default:
                            return null;
                    }
                })()}
            </DialogContent>
        </Dialog>
    );
};
