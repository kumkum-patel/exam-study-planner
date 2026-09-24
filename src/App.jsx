import { useState } from 'react';
import StudyForm from './components/StudyForm';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const calculateDaysRemaining = (examDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);

    const diffMs = exam - today;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return days;
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    const days = calculateDaysRemaining(data.examDate);
    setDaysRemaining(days);
  };

  return (
    <div className="app">
      <h1>📚 Exam Study Planner</h1>
      <StudyForm onSubmit={handleFormSubmit} />

      {formData && (
        <div className="result-card">
          <h2>{formData.subject}</h2>
          {daysRemaining > 0 ? (
            <p className="days-count">
              <span className="days-number">{daysRemaining}</span> days remaining
            </p>
          ) : daysRemaining === 0 ? (
            <p className="days-count today">Exam is today! 🔥</p>
          ) : (
            <p className="days-count past">This date has already passed.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;