import diaries from "../../data/entries";
import {DiaryEntry, NonSensitiveDiaryEntry} from "../types";

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = () => {
    return null;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility,
    }));
}
export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary
};