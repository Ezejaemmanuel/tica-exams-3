export enum SubjectName {
    English = 'English',
    GeneralStudies = 'General Studies',
    Mathematics = 'Mathematics',
}

export interface ExamSubject {
    name: SubjectName;
    questionCount: number;
}

export interface ExamInstructionsProps {
    subjects: ExamSubject[];
    examDuration: number; // in minutes
}