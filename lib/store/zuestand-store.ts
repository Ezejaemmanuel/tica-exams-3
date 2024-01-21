// useFormStore.ts
import { create } from 'zustand';

export interface FormValues {
    questionId: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: 'A' | 'B' | 'C' | 'D';
}

interface FormStore {
    formValues: FormValues;
    setFormValues: (newValues: FormValues) => void;
    allQuestionsLength: number;
    setAllQuestionsLength: (length: number) => void;
}

export const useFormStore = create<FormStore>((set) => ({
    formValues: {
        questionNumber: 0,
        questionId: "",
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: 'A',
    },
    setFormValues: (newValues: FormValues) => set({ formValues: newValues }),
    allQuestionsLength: 0,
    setAllQuestionsLength: (length: number) => set({ allQuestionsLength: length }),
}));
