import express from 'express'
import {calculateBmi} from "./bmiCalculator";

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('hello fullstack');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    try {
        if (isNaN(Number(weight)) || isNaN(Number(height))) {
            throw new Error('Provided values were not numbers!');
        }


        const bmi = calculateBmi(Number(height), Number(weight));
        res.send(bmi);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.send(errorMessage);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
