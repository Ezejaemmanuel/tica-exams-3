// useFormStore.ts
import { create } from 'zustand';
import { StorageValue, persist } from 'zustand/middleware';
import superjson from 'superjson';
import { ExamInstructionsProps } from '@/app/api/exam-Summary/types';
import { User } from '@prisma/client';
import { UserExamStatus } from '../api/redis/exam-status';
export interface FormValues {
    questionAcronym?: string;
    questionId?: string;
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
        questionAcronym: "",
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
// stores/useExamStore.ts



// stores/useExamStore.ts
interface QuestionState {
    questionAcronym: string;
    currentQuestionAcronym: string;
    currentSubject: string;
    currentQuestionNumber: number;
    setQuestionAcronym: (acronym: string) => void;
    setCurrentQuestionAcronym: (acronym: string) => void;
    setCurrentSubject: (subject: string) => void;
    setCurrentQuestionNumber: (number: number) => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
    questionAcronym: 'E-1',
    currentQuestionAcronym: '',
    currentSubject: '',
    currentQuestionNumber: 0,
    setQuestionAcronym: (acronym) => set({ questionAcronym: acronym }),
    setCurrentQuestionAcronym: (acronym) => set({ currentQuestionAcronym: acronym }),
    setCurrentSubject: (subject) => set({ currentSubject: subject }),
    setCurrentQuestionNumber: (number) => set({ currentQuestionNumber: number }),
}));

interface ExamStoreState {
    examData: ExamInstructionsProps | undefined;
    setExamData: (data: ExamInstructionsProps, expireInMinutes?: number) => void;
    clearExamData: () => void;
}

export const useExamStore = create<ExamStoreState>()(
    persist(
        (set) => ({
            examData: undefined,
            setExamData: (data: ExamInstructionsProps, expireInMinutes = 5) => {
                const currentTime = new Date().getTime();
                const expiryTime = expireInMinutes * 60 * 1000; // Convert minutes to milliseconds
                const dataWithExpiry = { ...data, timestamp: currentTime, expiryTime };
                const stringValue = superjson.stringify(dataWithExpiry);
                sessionStorage.setItem('exam-data-storage', stringValue);
                set({ examData: data });
            },
            clearExamData: () => set({ examData: undefined }),
        }),
        {
            name: 'exam-data-storage',
            storage: {
                getItem: (name: string): StorageValue<ExamStoreState> | Promise<StorageValue<ExamStoreState> | null> | null => {
                    const item = sessionStorage.getItem(name);
                    if (item) {
                        const parsedItem = superjson.parse(item) as StorageValue<ExamStoreState> & { timestamp: number, expiryTime: number };
                        const currentTime = new Date().getTime();
                        if (currentTime - parsedItem.timestamp > parsedItem.expiryTime) {
                            sessionStorage.removeItem(name);
                            return null;
                        }
                        return parsedItem;
                    }
                    return null;
                },
                setItem: (name, value) => {
                    // This method is now handled by setExamData and is not directly used.
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            }
        }
    )
);

// store/useExamStatusStore.ts


export interface ExamStatusZustand {
    examDateTime?: Date;
    length?: number;
}


interface ExamStatusStoreState {
    examStatusData: ExamStatusZustand | undefined;
    setExamStatusData: (data: ExamStatusZustand, expireInMinutes?: number) => void;
    clearExamStatusData: () => void;
}

export const useExamStatusStore = create<ExamStatusStoreState>()(
    persist(
        (set) => ({
            examStatusData: undefined,
            setExamStatusData: (data: ExamStatusZustand, expireInMinutes = 5) => {
                const currentTime = new Date().getTime();
                const expiryTime = expireInMinutes * 60 * 1000; // Convert minutes to milliseconds
                const dataWithExpiry = { ...data, timestamp: currentTime, expiryTime };
                const stringValue = superjson.stringify(dataWithExpiry);
                sessionStorage.setItem('exam-status-storage-v2', stringValue);
                set({ examStatusData: data });
            },
            clearExamStatusData: () => set({ examStatusData: {} as ExamStatusZustand })
        }),
        {
            name: 'exam-status-storage-v2',
            storage: {
                getItem: (name: string): StorageValue<ExamStatusStoreState> | Promise<StorageValue<ExamStatusStoreState> | null> | null => {
                    const item = sessionStorage.getItem(name);
                    if (item) {
                        const parsedItem = superjson.parse(item) as StorageValue<ExamStatusStoreState> & { timestamp: number, expiryTime: number };
                        const currentTime = new Date().getTime();
                        if (currentTime - parsedItem.timestamp > parsedItem.expiryTime) {
                            sessionStorage.removeItem(name);
                            return null;
                        }
                        return parsedItem;
                    }
                    return null;
                },
                setItem: (name, value) => {
                    // This method is now handled by setExamStatusData and is not directly used.
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            }
        }
    )
);


export interface UserAnswers {
    [key: string]: string; // Question  as key and selected option as value
}

interface UserAnswersStoreState {
    userAnswersData: UserAnswers | undefined;
    setUserAnswersData: (data: UserAnswers) => void;
    updateUserAnswer: (questionAcronym: string, selectedOption: string) => void;
    clearUserAnswersData: () => void;
}

export const useUserAnswersStore = create<UserAnswersStoreState>()(
    persist(
        (set, get) => ({
            userAnswersData: {},
            setUserAnswersData: (data: UserAnswers) => set({ userAnswersData: data }),
            updateUserAnswer: (questionAcronym: string, selectedOption: string) => {
                console.log("this is the selected option inside the update", selectedOption);
                console.log("this is the question acronym inside the update", questionAcronym);
                const currentData = get().userAnswersData || {};
                console.log("this is the current data", currentData);
                const updatedData = { ...currentData, [questionAcronym]: selectedOption };
                set({ userAnswersData: updatedData });
            },
            clearUserAnswersData: () => set({ userAnswersData: {} }),
        }),
        {
            name: 'user-answers-storage',
            storage: {
                getItem: (name: string): Promise<StorageValue<UserAnswersStoreState> | null> | StorageValue<UserAnswersStoreState> | null => {
                    const item = sessionStorage.getItem(name);
                    return item ? Promise.resolve(superjson.parse(item)) : null;
                },
                setItem: (name: string, value: StorageValue<UserAnswersStoreState>): void => {
                    const stringValue = superjson.stringify(value);
                    sessionStorage.setItem(name, stringValue);
                },
                removeItem: (name: string): void => {
                    sessionStorage.removeItem(name);
                },
            }
            // serialize: superjson.stringify,
            // deserialize: superjson.parse,
        }
    )
);

// stBadgeestionStore.ts
// stores/useUserStore.ts

// interface UserStoreState {
//     userData: User | null;
//     setUserData: (data: User | null) => void;
//     clearUserData: () => void;
// }

// export const useUserStore = create<UserStoreState>()(
//     persist(
//         (set) => ({
//             userData: null,
//             setUserData: (data: User | null) => set({ userData: data }),
//             clearUserData: () => set({ userData: null }),
//         }),
//         {
//             name: 'user-data-storage',
//             storage: {
//                 getItem: (name: string): StorageValue<UserStoreState> | Promise<StorageValue<UserStoreState> | null> | null => {
//                     const item = sessionStorage.getItem(name);
//                     return item ? (superjson.parse(item) as StorageValue<UserStoreState>) : null;
//                 },
//                 setItem: (name, value) => {
//                     const stringValue = superjson.stringify(value);
//                     sessionStorage.setItem(name, stringValue);
//                 },
//                 removeItem: (name) => {
//                     sessionStorage.removeItem(name);
//                 },
//             }
//         }
//     )
// );

// store/useExamSubmitStore.ts

// Step 1: Define an enum for the submission states
export enum SubmitState {
    NotSubmit = 'NotSubmit',
    ShouldSubmit = 'ShouldSubmit',
    Submitted = 'Submitted',
}

// Step 2: Update the interface to use the enum
interface ExamSubmitStoreState {
    shouldSubmit: SubmitState;
    setShouldSubmit: (value: SubmitState) => void;
}

// Step 3: Adjust the store to use the enum
export const useExamSubmitStore = create<ExamSubmitStoreState>((set) => ({
    shouldSubmit: SubmitState.NotSubmit, // Initial state
    setShouldSubmit: (value: SubmitState) => set({ shouldSubmit: value }),
}));



interface UserExamStatusStoreState {
    userExamStatusData: UserExamStatus | undefined;
    setUserExamStatusData: (data: UserExamStatus) => void;
    clearUserExamStatusData: () => void;
    updateUserExamStatus: (status: UserExamStatus) => void;
}

export const useUserExamStatusStore = create<UserExamStatusStoreState>()(
    persist(
        (set) => ({
            userExamStatusData: undefined,
            setUserExamStatusData: (data: UserExamStatus) => set({ userExamStatusData: data }),
            clearUserExamStatusData: () => set({ userExamStatusData: undefined }),
            updateUserExamStatus: (status: UserExamStatus) => set((state) => ({
                userExamStatusData: state.userExamStatusData
            })),
        }),
        {
            name: 'user-exam-status-storage',
            storage: {
                getItem: (name: string): StorageValue<UserExamStatusStoreState> | Promise<StorageValue<UserExamStatusStoreState> | null> | null => {
                    const item = sessionStorage.getItem(name);
                    return item ? (superjson.parse(item) as StorageValue<UserExamStatusStoreState>) : null;
                },
                setItem: (name, value) => {
                    const stringValue = superjson.stringify(value);
                    sessionStorage.setItem(name, stringValue);
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            }
            // serialize: superjson.stringify,
            // deserialize: superjson.parse,
        }
    )
);


// stores/useUserCurrentAnswerStore.ts

interface UserCurrentAnswer {
    questionAcronym: string;
    selectedOption: 'A' | 'B' | 'C' | 'D';
}

interface UserCurrentAnswerStore {
    userCurrentAnswer: UserCurrentAnswer | null;
    setUserCurrentAnswer: (questionAcronym: string, selectedOption: 'A' | 'B' | 'C' | 'D') => void;
    clearUserCurrentAnswer: () => void;
}

export const useUserCurrentAnswerStore = create<UserCurrentAnswerStore>((set) => ({
    userCurrentAnswer: null,
    setUserCurrentAnswer: (questionAcronym, selectedOption) => set(() => ({
        userCurrentAnswer: { questionAcronym, selectedOption },
    })),
    clearUserCurrentAnswer: () => set(() => ({ userCurrentAnswer: null })),
}));

// Add to the interface in stores/useQuestionStore.ts
interface ClickedQuestionBadgeState {
    // Existing states...
    isSubmitMode: boolean;
    toggleSubmitMode: (isSubmit: boolean) => void;
}

// Update the store
export const useClickedQuestionBadgeStore = create<ClickedQuestionBadgeState>((set) => ({
    // Existing states...
    isSubmitMode: false,
    toggleSubmitMode: (isSubmit) => set(() => ({ isSubmitMode: isSubmit })),
}));

// store/useDrawerStore.ts

interface DrawerState {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
    isOpen: false,
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
    toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));
