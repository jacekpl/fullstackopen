import {Patient} from './types';
import {v1} from "uuid/index";

const toNewPatientEntry = (id: typeof v1, object: any): Patient => {
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

export default toNewPatientEntry;