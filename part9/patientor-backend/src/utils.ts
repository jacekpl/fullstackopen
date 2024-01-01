import {Gender, Patient} from './types';

const toNewPatientEntry = (id: string, object: any): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (!('name' in object) || !('dateOfBirth' in object) || !('gender' in object) || !('occupation' in object) || !('ssn' in object)) {
        throw new Error('Incorrect data: some fields are missing');
    }

    if(!isString(object.name)) {
        throw new Error('Incorrect "name" data');
    }

    if(!isString(object.dateOfBirth)) {
        throw new Error('Incorrect "dateOfBirth" data');
    }

    if(!isString(object.gender) || !isGender(object.gender)) {
        throw new Error('Incorrect "gender" data');
    }

    if(!isString(object.occupation)) {
        throw new Error('Incorrect "occupation" data');
    }

    if(!isString(object.ssn)) {
        throw new Error('Incorrect "ssn" data');
    }

    const newEntry: Patient = {
        id: object.id,
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        gender: object.gender,
        occupation: object.occupation,
        ssn: object.ssn
    };

    return newEntry;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

export default toNewPatientEntry;