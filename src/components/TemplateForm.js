import React, { useState } from 'react';

const TemplateForm = ({ questions, darkMode }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const generateOutput = () => {
    return questions.map((question) => {
      const answer = answers[question]?.trim() || 'N/A';
      return `${question}: ${answer}`;
    }).join('\n');
  };

  const handleCopy = () => {
    const textToCopy = generateOutput();
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Template copied to clipboard!');
    });
  };

  return (
    <div className={`template-form ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Fill in the Template</h2>
      <p>Please provide answers for the following questions:</p>

      {questions.map((question, index) => (
        <div key={index} className="question-block">
          <label>{question}</label>
          <textarea
            value={answers[question] || ''}
            onChange={(e) => handleChange(question, e.target.value)}
            placeholder="Type your answer here..."
          />
        </div>
      ))}

      <button className="copy-btn" onClick={handleCopy}>Copy All to Clipboard</button>
    </div>
  );
};

export default TemplateForm;
