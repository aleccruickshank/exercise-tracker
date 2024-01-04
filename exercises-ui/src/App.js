// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import ExerciseTable from './components/ExerciseTable';

// Define the function that renders the content in routes using State.
function App() {

  const [exercises, setExercise] = useState([]);
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <>
      <Router>

          {/* <header>
            <h1>Track your exercises by adding them to the database.</h1>
            <p>Once an exercise is added to the database it will appear in the table below.</p>
          </header> */}
          <header>
            
          </header>

          <Navigation />

          <main>
          
            <Route path="/" exact>
              <HomePage setExerciseToEdit={setExerciseToEdit} />
            </Route>

            <Route path="/exercises">
              <ExerciseTable exercises={exercises}/>
            </Route>

            <Route path="/add-exercise">
              <AddExercisePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditExercisePage exerciseToEdit={exerciseToEdit}/>
            </Route>
          </main>

          <footer>
            <p>Copyright statement Alec Cruickshank</p>
          </footer>

      </Router>
    </>
  );
}

export default App;