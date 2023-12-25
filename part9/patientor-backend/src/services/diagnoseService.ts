import diagnoses from "../../data/diagnoses";
import {Diagnosis} from "../types";

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};