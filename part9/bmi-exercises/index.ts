import express from 'express'
import { calculateBmi } from './bmiCalculator'
import {calculateExercises} from "./exerciseCalculator";
import * as z from 'zod';
import {ZodError} from "zod";

const app = express()
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/hello', (_req, res) => {
  res.send('hello fullstack')
})

app.get('/bmi', (req, res) => {
  const height = req.query.height
  const weight = req.query.weight

  try {
    if (isNaN(Number(weight)) || isNaN(Number(height))) {
      throw new Error('Provided values were not numbers!')
    }

    const bmi = calculateBmi(Number(height), Number(weight))
    res.send(bmi)
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.send(errorMessage)
  }
})

app.post('/exercises', (req, res) => {
  const requestSchema = z.object({
    daily_exercises: z.array(z.number().nonnegative()),
    target: z.number().nonnegative()
  })

  try {
    requestSchema.parse(req.body)
  } catch (error) {
    if(error instanceof ZodError) {
      res.send("parameters missing or malformatted parameters")
    } else {
      res.send("Error " + error.message)
    }
  }

  const {daily_exercises, target} = req.body
  const result = calculateExercises(daily_exercises, target)

  res.send(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
