import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add an exercise to the database</h2>
            <p>Fill in all fields below to create a new exercise that will be added to the database.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset id="add">
                    
                    <label for="name">Exercise Name</label>
                    <input
                        type="text" required
                        placeholder="ex: Pull-ups"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Rep Count</label>
                    <input
                        type="number" required
                        value={reps}
                        placeholder="ex: 5"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input
                        type="number" required
                        placeholder="ex: 145"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    <label for="unit">Unit</label>
                    <select
                        type="text" required
                        placeholder="lbs"
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
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                    >Add</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;