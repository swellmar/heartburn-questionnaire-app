import React from 'react';

interface ProgressBarProps {
    percentage: number;
    label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({percentage, label = "Progress"}) => {
    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-label">
                    {label}
                </span>
                <span className="progress-percentage">
                    {percentage}%
                </span>
            </div>
            <div className="progress-track">
                <div className="progress-fill" style={{width: `${percentage}%`}} />
            </div>
        </div>
    );
};