interface BmiArguments {
  height: number
  weight: number
}

export const parseArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) {
    throw new Error('Wrong number of arguments')
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}
export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100 * height / 100)

  if (bmi <= 16) {
    return 'Underweight (Severe thinness)'
  }

  if (bmi <= 16.9) {
    return 'Underweight (Moderate thinness)'
  }

  if (bmi <= 18.4) {
    return 'Underweight (Mild thinness)'
  }

  if (bmi <= 24.9) {
    return 'Normal range'
  }

  if (bmi <= 29.9) {
    return 'Overweight (Pre-obese)'
  }

  if (bmi <= 34.9) {
    return 'Obese (Class I)'
  }

  return 'Too big to handle'
}
