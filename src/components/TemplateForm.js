import React, { useState } from 'react';

const TemplateForm = ({ questions, darkMode }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleGeneralCopy = () => {
    const textOutput = questions.map((question) => {
      const answer = answers[question]?.trim() || 'N/A';
      return `${question}: ${answer}`;
    }).join('\n');

    navigator.clipboard.writeText(textOutput).then(() => {
      alert('Copied as plain text.');
    });
  };

  const handleIepCopy = () => {
    const htmlOutput = questions.map((question) => {
      const answer = answers[question]?.trim() || 'N/A';
      return `<div><strong>${question}:</strong> ${answer}</div>`;
    }).join('');

    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({ 'text/html': blob });

    navigator.clipboard.write([clipboardItem])
      .then(() => alert('Copied as formatted HTML for IEP.'))
      .catch((err) => {
        console.error('HTML Copy failed:', err);
        alert('Copy failed.');
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

      <div className="button-group">
        <button className="copy-btn" onClick={handleGeneralCopy}>General Copy</button>
        <button className="copy-btn" onClick={handleIepCopy}>IEP Copy</button>
      </div>
    </div>
  );
};

export default TemplateForm;
