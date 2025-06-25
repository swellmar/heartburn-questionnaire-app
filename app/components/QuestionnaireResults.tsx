import React from "react";
import {ArrowLeft, Calendar} from "lucide-react";
import {ProgressBar} from "@/app/components/ProgressBar";
import {Outcome} from "@/app/types/questionnaire";

interface QuestionnaireResultsProps {
    outcome: Outcome;
    onBookAppointment: () => void;
    onRestartQuestionnaire: () => void;
}

export const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({outcome, onBookAppointment, onRestartQuestionnaire}) => {
    return (
        <div className="mobile-container">
            <div className="app-header">
                <button
                    onClick={onRestartQuestionnaire}
                    className="icon-btn mr-3"
                    aria-label="Restart questionnaire from beginning"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">
                    Heartburn checker
                </h1>
            </div>

            <ProgressBar percentage={100} label="Assessment Complete" />

            <div className="questionnaire-content">
                <div className="questionnaire-section">
                    <h2 className="heading-xl mb-4">
                        Thank you for answering the questions!
                    </h2>
                    <p className="body-text">
                        {outcome.text}
                    </p>
                </div>

                {outcome.show_booking_button && (
                    <button
                        onClick={onBookAppointment}
                        className="btn-primary mb-4"
                        aria-label="Book appointment with healthcare provider"
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book a meeting
                    </button>
                )}

                <button
                    onClick={onRestartQuestionnaire}
                    className="btn-secondary"
                    aria-label="Start questionnaire over from the beginning"
                >
                    Back to the start screen
                </button>
            </div>
        </div>
    );
};