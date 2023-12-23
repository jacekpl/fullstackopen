interface ResultInterface {
  getAverage: () => number
  getRating: () => number
  getRatingDescription: () => string
  getSuccess: () => boolean
  getTarget: () => number
  getTrainingDays: () => number
  getPeriodLength: () => number
}

class Result implements ResultInterface {
  private readonly average: number
  private readonly periodLength: number
  private readonly rating: number
  private readonly ratingDescription: string
  private readonly success: boolean
  private readonly target: number
  private readonly trainingDays: number

  constructor (average: number, periodLength: number, rating: number, ratingDescription: string, success: boolean, target: number, trainingDays: number) {
    this.average = average
    this.periodLength = periodLength
    this.rating = rating
    this.ratingDescription = ratingDescription
    this.success = success
    this.target = target
    this.trainingDays = trainingDays
  }

  getAverage (): number {
    return this.average
  }

  getPeriodLength (): number {
    return this.periodLength
  }

  getRating (): number {
    return this.rating
  }

  getRatingDescription (): string {
    return this.ratingDescription
  }

  getSuccess (): boolean {
    return this.success
  }

  getTarget (): number {
    return this.target
  }

  getTrainingDays (): number {
    return this.trainingDays
  }
}

export function ratingDescription (rating: number): string {
  switch (rating) {
    case 1:
      return 'Poor'
    case 2:
      return 'Could be better'
    case 3:
      return 'Great'
    default:
      throw new Error('Invalid description')
  }
}

interface Arguments {
  target: number
  period: number[]
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) {
    throw new Error('Wrong number of arguments')
  }

  const argumentsSlice: string[] = args.slice(2)
  const period: number[] = []

  for (const i of argumentsSlice) {
    if (isNaN(Number(argumentsSlice[i]))) {
      throw new Error('Argument is not a number')
    }

    period.push(Number(argumentsSlice[i]))
  }

  return {
    target: Number(argumentsSlice[0]),
    period: period.slice(1)
  }
}

const calculateExercises = (period: number[], target: number): ResultInterface => {
  const sum: number = period.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue
  })

  const periodLength: number = period.length
  const average: number = sum / periodLength
  const success: boolean = average >= target
  const trainingDays: number = period.filter((value: number): boolean => value > 0).length
  let rating: number = 2

  if (average < target && trainingDays < periodLength) {
    rating = 1
  } else if (average >= target && trainingDays >= periodLength) {
    rating = 3
  }

  return new Result(average, periodLength, rating, ratingDescription(rating), success, target, trainingDays)
}

try {
  const { target, period } = parseArguments(process.argv)
  console.log(calculateExercises(period, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
