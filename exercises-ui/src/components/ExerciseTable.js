import React from 'react';
import Exercise from './ExerciseRow';

function ExerciseTable({ exercises, onEditExercise, onDeleteExercise }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Delete</th>   
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercises, i) => 
                    <Exercise 
                        exercises={exercises} 
                        key={i} 
                        onEditExercise={onEditExercise}
                        onDeleteExercise={onDeleteExercise}
                        />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;