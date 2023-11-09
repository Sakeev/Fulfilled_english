import { count } from '../utils';

export const formAnswer = (inputValues, taskDetails) => {
    const values = Object.values(inputValues);
    const inpCount = count(taskDetails.description, '__inp__');

    for (let i = 0; i < inpCount; i++) {
        if (!values[i]) {
            values[i] = 'No answer';
        }
    }

    console.log(values);

    return { answers: values };
};
