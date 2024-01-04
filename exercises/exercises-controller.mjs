import 'dotenv/config';
import express from 'express';
import validator from 'express-validator';
import * as exercise from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************

const { body, validationResult} = validator;

app.post ('/exercises', 

    body('name').isString(),
    body('reps').isInt(),
    body('weight').isInt(),
    body('unit').isIn(['lbs', 'kgs', 'mi', 'km']),
    body('date').isDate(),

    (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    exercise.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(exercise => {
            // Confirm exercise creation
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        });
});


// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercise.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET exercises filtered 
app.get('/exercises', (req, res) => {
    const filter = {};
    
    exercise.findExercises(filter)
        .then(exercise => {
            res.send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', 
    
    body('name').isString(),
    body('reps').isInt(),
    body('weight').isInt(),
    body('unit').isIn(['lbs', 'kgs', 'mi', 'km']),
    body('date').isDate(),

    (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    exercise.replaceExercise(
        req.params._id,
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({
                _id: req.params._id,
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight, 
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});