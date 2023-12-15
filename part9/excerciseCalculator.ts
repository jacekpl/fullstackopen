interface ResultInterface {
    getAverage(): number
    getRating(): number
    getRatingDescription(): string
    getSuccess(): boolean
    getTarget(): number
    getTrainingDays(): number
    getPeriodLength(): number
}

class Result implements ResultInterface {
    private average: number;
    private periodLength: number;
    private rating: number;
    private ratingDescription: string;
    private success: boolean;
    private target: number;
    private trainingDays: number;

    constructor(average: number, periodLength: number, rating: number, ratingDescription: string, success: boolean, target: number, trainingDays: number) {
        this.average = average;
        this.periodLength = periodLength;
        this.rating = rating;
        this.ratingDescription = ratingDescription;
        this.success = success;
        this.target = target;
        this.trainingDays = trainingDays;
    }

    getAverage(): number {
        return this.average;
    }

    getPeriodLength(): number {
        return this.periodLength;
    }

    getRating(): number {
        return this.rating;
    }

    getRatingDescription(): string {
        return this.ratingDescription;
    }

    getSuccess(): boolean {
        return this.success;
    }

    getTarget(): number {
        return this.target;
    }

    getTrainingDays(): number {
        return this.trainingDays;
    }
}

class RatingDescription {
    static description(rating: number): string {
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
}

const calculateExercises = (period: number[], target: number): Result => {
    const sum: number = period.reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue
    })

    const periodLength: number = period.length
    const average: number = sum / periodLength
    const success: boolean = average >= target
    const trainingDays: number = period.filter((value: number): boolean => value > 0).length
    let rating: number = 2

    if(average < target && trainingDays < periodLength) {
        rating = 1
    } else if (average >= target && trainingDays >= periodLength) {
        rating = 3
    }

    return new Result(average, periodLength, rating, RatingDescription.description(rating), success, target, trainingDays)
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))