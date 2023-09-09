export const getVocabulary = (cases) => {
    if (cases.length) return null;

    let vocabulary;

    cases[0]?.case_tasks.forEach((caseTask) => {
        if (caseTask.title === 'vocabulary') vocabulary = caseTask;
    });

    return vocabulary || null;
};
