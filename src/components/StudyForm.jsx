import { useState } from 'react';

function StudyForm({ onSubmit }) {
  const [subject, setSubject] = useState('');
  const [chapters, setChapters] = useState('');
  const [examDate, setExamDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !chapters || !examDate) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit({
      subject,
      chapters: parseInt(chapters, 10),
      examDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="subject">Subject Name</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Data Structures"
        />
      </div>

      <div>
        <label htmlFor="chapters">Number of Chapters</label>
        <input
          id="chapters"
          type="number"
          min="1"
          value={chapters}
          onChange={(e) => setChapters(e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <div>
        <label htmlFor="examDate">Exam Date</label>
        <input
          id="examDate"
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />
      </div>

      <button type="submit">Generate Study Plan</button>
    </form>
  );
}

export default StudyForm;