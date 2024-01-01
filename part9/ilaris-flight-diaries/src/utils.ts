import {NewDiaryEntry} from './types';

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        date: object.date,
        weather: object.weather,
        visibility: object.visibility,
        comment: object.comment,
    };

    return newEntry;
};

export default toNewDiaryEntry;