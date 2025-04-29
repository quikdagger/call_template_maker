import React, { useState } from "react";
import "./styles.css";

const questions = [
  { type: "question", label: "Contact Name:" },
  { type: "question", label: "Email:" },
  { type: "question", label: "Phone:" },
  { type: "question", label: "What time zone is the customer in:" },
  { type: "question", label: "What State does the business operate in?" },
  { type: "question", label: "Do they have employees that live/work in other states?" },
  { type: "question", label: "If working in other states, do they have a work location address or do employees work from home?" },
  { type: "header", label: "Payroll History" },
  { type: "question", label: "Previous Payroll Provider(s):" },
  { type: "question", label: "Ask if Migration is complete if coming from DT and notify the client that all work completed by onboarding will not affect the Chart of Accounts." },
  { type: "question", label: "# of employees to key in/paid in this year (include both active/inactive):" },
  { type: "question", label: "Payroll frequency:" },
  { type: "question", label: "First payroll check date:" },
  { type: "question", label: "Do you pay via DD or checks?" },
  { type: "question", label: "What is the highest DD net payroll for the company?" },
  { type: "question", label: "What is the highest DD net paid employee per check run?" },
  { type: "question", label: "Are there any special tax exemptions for the company or for the employees, or do you pay all applicable payroll taxes?" },
  { type: "question", label: "Do you offer Vacation/Sick/PTO? If so, how are the hours accrued?" },
  { type: "question", label: "Do you offer Healthcare/Retirement? Is the healthcare pre/post tax deduction?" },
  { type: "question", label: "Do you have a company match for healthcare/retirement?" },
  { type: "question", label: "Do you have other deductions/wage garnishments we need to be aware of?" },
  { type: "header", label: "Payroll History" },
  { type: "question", label: "Any unusual payroll circumstances this year?" },
  { type: "question", label: "Unscheduled payrolls (bonus, term, etc.)" },
  { type: "question", label: "Missing payroll (started in Q2, etc.)" },
  { type: "question", label: "Large gaps in payroll" },
  { type: "header", label: "Current Quarter Tax Payments" },
  { type: "question", label: "What taxes have been paid (941/944, State WH, 940, etc.):" },
  { type: "question", label: "Of the taxes paid, what paycheck date are taxes paid through?" },
  { type: "question", label: "Who is handling outstanding tax payments?" },
  { type: "question", label: "Past due taxes to discuss with customer (if applicable):" },
  { type: "header", label: "Attachments" },
  { type: "question", label: "QB Time (Currently using/Want to use):" },
  { type: "question", label: "Workers Comp:" },
  { type: "question", label: "Checks:" },
  { type: "question", label: "Posters:" },
  { type: "question", label: "*Admin Login/PW for QB Desktop portable file:" },
  { type: "header", label: "Other Call Notes" },
  { type: "question", label: "Documents uploaded during call? Y/N/Partial" },
  { type: "question", label: "If not uploaded, due date for documents to meet EFP" },
];

export default function App() {
  const [answers, setAnswers] = useState({});

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleCopy = () => {
    const compiledText = questions.map((item, index) => {
      if (item.type === "header") {
        return `\n${item.label.toUpperCase()}\n`;
      } else if (item.type === "question") {
        const answer = answers[index]?.trim() || "N/A";
        return `${item.label} ${answer}`;
      }
      return "";
    }).join("\n");

    navigator.clipboard.writeText(compiledText).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Client Onboarding Questionnaire</h1>
      {questions.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          {item.type === "header" ? (
            <strong style={{ display: "block", marginTop: "1.5rem", fontSize: "1.1rem" }}>
              {item.label}
            </strong>
          ) : (
            <>
              <label style={{ fontWeight: "bold", display: "block" }}>{item.label}</label>
              <input
                type="text"
                placeholder="Enter answer or leave blank for N/A"
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              />
            </>
          )}
        </div>
      ))}

      <button
        onClick={handleCopy}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "1.5rem"
        }}
      >
        Copy All to Clipboard
      </button>
    </div>
  );
}
