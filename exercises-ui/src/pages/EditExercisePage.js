import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exerciseToEdit }) => {
 
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date.slice(0,10));
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit an existing exercise in the database</h2>
            <p>Changes to the selected exercise will be reflected upon returning to the exercise list.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    
                    <label for="name">Exercise Name</label>
                    <input
                        type="text" required
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number" required
                        value={reps}
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />
                    
                    <label for="weight">Weight</label>
                    <input
                        type="number" required
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    <label for="unit">Unit</label>
                    <select
                        type="text" required
                        value={unit}
                        onChange={e => setUnit(e.target.value)} 
                        id="unit"
                    >
                        <option value="lbs">Lbs</option>
                        <option value="kgs">Kgs</option>
                        <option value="mi">Miles</option>
                        <option value="km">Km</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date" required
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;