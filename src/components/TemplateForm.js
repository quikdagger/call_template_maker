import React, { useState } from 'react';

const TemplateForm = ({ questions, darkMode }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGeneralCopy = () => {
    const textOutput = questions.map((item) => {
      if (item.type === 'header') {
        return `${item.text}`;
      } else {
        const answer = answers[item.text]?.trim() || 'N/A';
        return `${item.text}: ${answer}`;
      }
    }).join('\n');

    navigator.clipboard.writeText(textOutput).then(() => {
      alert('Copied as plain text.');
    });
  };

  const handleIepCopy = () => {
    const htmlOutput = questions.map((item) => {
      if (item.type === 'header') {
        return `<div><strong>${item.text}</strong></div>`;
      } else {
        const answer = answers[item.text]?.trim() || 'N/A';
        return `<div><strong>${item.text}:</strong> ${answer}</div>`;
      }
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

      {questions.map((item, index) => (
        <div key={index}>
          {item.type === 'header' ? (
            <h3 className="section-header">{item.text}</h3>
          ) : (
            <div className="question-block">
              <label>{item.text}</label>
              <textarea
                value={answers[item.text] || ''}
                onChange={(e) => handleChange(item.text, e.target.value)}
                placeholder="Type your answer here..."
              />
            </div>
          )}
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