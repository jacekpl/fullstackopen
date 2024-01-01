export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
