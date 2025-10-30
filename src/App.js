import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import TemplateForm from './components/TemplateForm';
import './styles.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('Consultation');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Reflect dark mode on the <body> so page gutters match theme
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const templateOptions = Object.keys(questions);
  // Always-on offline modal. Set to `true` to display the non-dismissible overlay.
  // const showOfflineModal = true;

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {/* {showOfflineModal && (
        <div className="offline-overlay" role="dialog" aria-modal="true">
          <div className="offline-modal">
            <h2>This application has been brought offline</h2>
            <p>
              This application has been brought offline until further notice in protest of a company's
              claim to ownership in clear violation of the license for usage of this application.
            </p>
            <p className="offline-sign">Daniel 'Quik' Mason. 10/20/2025</p>
          </div>
        </div>
      )} */}
      <header className={`App-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Template Generator - QuikAssistant</h1>
        <h2>
          Choose the template you wish to use and fill in the particular information. 
          If there is not an answer to a particular question, leave it blank. Then hit 
          "IEP Copy" to ensure 100% documentation. If you need to copy to a standard text area
          you will use "General Copy" instead.
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
