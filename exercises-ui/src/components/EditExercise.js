import React from 'react';
import Exercise from './ExerciseRow';

function EditExercise({ exercises, onDelete, onEditExercise }) {
    return (
        <table id="exercises">
            <caption>Add and Edit Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercises, i) => 
                    <Exercise 
                        exercises={exercises} 
                        key={i}
                        onDelete={onDelete}
                        onEditExercise={onEditExercise} 
                    />)}
            </tbody>
        </table>
    );
}

export default EditExercise;
