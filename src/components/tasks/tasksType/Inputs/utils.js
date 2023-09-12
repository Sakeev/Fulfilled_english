export const formAnswer = (inputValues) => {
    const values = Object.values(inputValues);

    console.log({ answers: values.length ? values : [''] });

    return { answers: values.length ? values : [''] };
};
