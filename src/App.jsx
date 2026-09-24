import { useState } from 'react';
import StudyForm from './components/StudyForm';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [completed, setCompleted] = useState({});

  const calculateDaysRemaining = (examDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);

    const diffMs = exam - today;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return days;
  };

  const generateSchedule = (totalChapters, days) => {
    if (days <= 0) return [];

    const chaptersPerDay = Math.ceil(totalChapters / days);
    const plan = [];
    let chapterCounter = 1;

    for (let day = 1; day <= days; day++) {
      if (chapterCounter > totalChapters) break;

      const startChapter = chapterCounter;
      const endChapter = Math.min(
        chapterCounter + chaptersPerDay - 1,
        totalChapters
      );

      plan.push({
        day,
        chapters:
          startChapter === endChapter
            ? `Chapter ${startChapter}`
            : `Chapters ${startChapter}–${endChapter}`,
      });

      chapterCounter = endChapter + 1;
    }

    return plan;
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    const days = calculateDaysRemaining(data.examDate);
    setDaysRemaining(days);

    const plan = generateSchedule(data.chapters, days);
    setSchedule(plan);
    setCompleted({});
  };

  const toggleDay = (day) => {
    setCompleted((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const doneCount = Object.values(completed).filter(Boolean).length;
  const progressPercent =
    schedule.length > 0 ? Math.round((doneCount / schedule.length) * 100) : 0;

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

      {schedule.length > 0 && (
        <div className="schedule-list">
          <div className="schedule-header">
            <h3>Study Plan</h3>
            <span className="progress-label">
              {doneCount}/{schedule.length} done
            </span>
          </div>

          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {schedule.map((item) => (
            <label
              key={item.day}
              className={`schedule-item ${
                completed[item.day] ? 'schedule-item-done' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={!!completed[item.day]}
                onChange={() => toggleDay(item.day)}
              />
              <span className="day-badge">Day {item.day}</span>
              <span className="chapter-text">{item.chapters}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;