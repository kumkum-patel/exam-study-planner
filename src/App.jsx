import { useState } from 'react';
import StudyForm from './components/StudyForm';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log('Form submitted:', data);
  };

  return (
    <div className="App">
      <h1>Exam Study Planner</h1>
      <StudyForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;