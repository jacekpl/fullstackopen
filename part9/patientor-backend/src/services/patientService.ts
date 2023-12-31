import patients from "../../data/patients";
import {NonSensitivePatient, Patient} from "../types";

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: Patient) => {
    return patients.push(patient);
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};