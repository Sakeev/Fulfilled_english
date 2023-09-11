export const formAnswer = (inputValues) => {
    const values = Object.values(inputValues);

    return { answers: values.length ? values : [''] };
};
