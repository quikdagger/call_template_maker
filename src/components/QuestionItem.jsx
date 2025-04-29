import React from 'react';

export default function QuestionItem({ question, answer, onChange }) {
  return (
    <div className="question-item">
      <label className="question-label">{question}</label>
      <input
        type="text"
        className="question-input"
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your answer here"
      />
    </div>
  );
}
