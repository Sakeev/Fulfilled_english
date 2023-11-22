import { count } from '../utils';

export const formAnswer = (inputValues, taskDetails) => {
    const values = [];
    const inpCount = count(taskDetails.description, '__inp__');

    for (let i = 0; i < inpCount; i++) {
        if (i in inputValues) {
            values.push(
                inputValues[i].trim() !== '' ? inputValues[i] : 'No answer'
            );
        } else {
            values.push('No answer');
        }
    }

    return { answers: values };
};
