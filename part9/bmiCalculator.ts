const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height/100 * height/100)

    if (bmi <= 16) {
        return 'Underweight (Severe thinness)';
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

}

console.log(calculateBmi(180, 74))