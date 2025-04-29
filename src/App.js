import React, { useState } from 'react';
import questions from './questions.json';
import TemplateForm from './components/TemplateForm';
import './styles.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('Consultation');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const templateOptions = Object.keys(questions);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className={`App-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Template Generator - QuikAssistant</h1>
        <h2>
          Choose the template you wish to use and fill in the particular information. 
          If there is not an answer to a particular question, leave it blank. Then hit 
          "Copy All to Clipboard" to ensure 100% documentation.
        </h2>
        <nav className="template-nav">
          {templateOptions.map((templateName) => (
            <button
              key={templateName}
              onClick={() => setSelectedTemplate(templateName)}
              className={selectedTemplate === templateName ? 'active' : ''}
            >
              {templateName}
            </button>
          ))}
          <button className="toggle-mode-btn" onClick={toggleDarkMode}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </nav>
      </header>

      <main className={darkMode ? 'dark-mode' : ''}>
        <TemplateForm
          templateName={selectedTemplate}
          questions={questions[selectedTemplate]?.questions || []}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}

export default App;
