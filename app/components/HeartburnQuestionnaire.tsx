"use client"
import React, {useState} from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';
import {QuestionnaireResults} from "@/app/components/QuestionnaireResults";
import questionnaireData from '@/app/data/questionnaire-data.json';
import type {Answer, Outcome, QuestionnaireData} from '@/app/types/questionnaire';

export default function HeartburnQuestionnaire() {
    const [currentQuestionId, setCurrentQuestionId] = useState<string>("is_heartburn_known");
    const [totalScore, setTotalScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [outcome, setOutcome] = useState<Outcome | null>(null);

    const questionnaire: QuestionnaireData = questionnaireData;
    const currentQuestion = questionnaire.questions.find(q => q.id === currentQuestionId);

    const handleAnswerSelect = (answer: Answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (!selectedAnswer || !currentQuestion) return;

        // Update total score
        const newTotalScore = totalScore + selectedAnswer.score;
        setTotalScore(newTotalScore);

        // Find next action
        const nextAction = currentQuestion.next.find(action => {
            if (action.answered) return action.answered === selectedAnswer.id;
            if (action.max_score) return newTotalScore <= action.max_score;

            return true;
        });

        // Navigate based on the action
        if (nextAction?.outcome) {
            const foundOutcome = questionnaire.outcomes.find(o => o.id === nextAction.outcome);
            if (foundOutcome) {
                setOutcome(foundOutcome);
            }
        } else if (nextAction?.next_question) {
            setCurrentQuestionId(nextAction.next_question);
            setSelectedAnswer(null);
        }
    };

    const handleBookAppointment  = () => {
        alert("Booking system would be integrated here. Meeting request sent!");
    };

    const handleRestartQuestionnaire  = () => {
        setCurrentQuestionId("is_heartburn_known");
        setTotalScore(0);
        setSelectedAnswer(null);
        setOutcome(null);
    };

    if (outcome) {
        return (
            <QuestionnaireResults
                outcome={outcome}
                onBookAppointment={handleBookAppointment}
                onRestartQuestionnaire={handleRestartQuestionnaire}
            />
        );
    }

    return (
        <div className="mobile-container">
            <div className="app-header">
                <button onClick={handleRestartQuestionnaire} className="icon-btn mr-3" aria-label="Restart questionnaire">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">
                    Heartburn checker
                </h1>
            </div>

            <ProgressBar percentage={currentQuestion?.progress || 0} />

            <div className="questionnaire-content">
                <div className="questionnaire-section">
                    <h2 className="heading-xl mb-6">
                        {currentQuestion?.question_text}
                    </h2>

                    <div className="answer-list">
                        {currentQuestion?.answers.map((answer) => (
                            <button
                                key={answer.id}
                                onClick={() => handleAnswerSelect(answer)}
                                className={`answer-btn ${selectedAnswer?.id === answer.id ? 'selected' : ''}`}
                                aria-pressed={selectedAnswer?.id === answer.id}
                            >
                                {answer.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="btn-primary"
                    aria-label={!selectedAnswer ? "Select an answer to continue" : "Continue to next question"}
                >
                    Next
                </button>
            </div>

            {/* Debug info (remove in production) */}
            <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500" aria-hidden="true">
                Current Score: {totalScore} | Question: {currentQuestionId}
            </div>
        </div>
    );
}