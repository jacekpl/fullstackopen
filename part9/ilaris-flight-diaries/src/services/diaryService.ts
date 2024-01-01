import diaries from "../../data/entries";
import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from "../types";

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility,
    }));
}

const findById = (id: number): DiaryEntry | undefined => {
    return diaries.find(d => d.id === id);
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary,
    findById
};