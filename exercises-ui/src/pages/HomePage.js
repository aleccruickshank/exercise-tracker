import React from 'react';
// import Exercise from '../components/ExerciseRow';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercise] = useState([]);

    // Load all exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercise(exercises);
    } 
    

    // Update an exercise
    const onEditExercise = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        history.push("/edit-exercise");
    }


    // Delete an exercise
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercise(exercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // Load the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // Display all exercises
    return (
        <>
            <article>
                <header>
                    <h1>Track your exercises by adding them to the database.</h1>
                    <p>Once an exercise is added to the database it will appear in the table below.</p>
                </header>
                <ExerciseTable 
                    exercises={exercises}
                    onDeleteExercise={onDeleteExercise}
                    onEditExercise={onEditExercise}
                />
            </article>
        </>
    );
}

export default HomePage;