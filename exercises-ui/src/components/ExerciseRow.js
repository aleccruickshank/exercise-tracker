import React from 'react';
import { MdHighlightOff, MdInfoOutline } from 'react-icons/md';


function Exercise({ exercises, onEditExercise, onDeleteExercise }) {
    return (
        <tr>
            <td>{exercises.name}</td>
            <td>{exercises.reps}</td>
            <td>{exercises.weight}</td>
            <td>{exercises.unit}</td>
            <td>{exercises.date.slice(0,10)}</td>
            <td id="delete"><MdHighlightOff onClick={() => onDeleteExercise(exercises._id)} /></td>
            <td id="edit"><MdInfoOutline onClick={() => onEditExercise(exercises)} /></td>
        </tr>
    );
}

export default Exercise;