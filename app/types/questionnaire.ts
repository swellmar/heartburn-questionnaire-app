export interface Answer {
    id: string;
    label: string;
    score: number;
}

export interface NextAction {
    answered?: string;
    max_score?: number;
    next_question?: string;
    outcome?: string;
}

export interface Question {
    id: string;
    question_text: string;
    progress: number;
    answers: Answer[];
    next: NextAction[];
}

export interface Outcome {
    id: string;
    text: string;
    show_booking_button: boolean;
}

export interface QuestionnaireData {
    questions: Question[];
    outcomes: Outcome[];
}