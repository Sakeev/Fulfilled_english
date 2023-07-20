export const formResultTemplate = (splittedDescription) => {
    const resultTemplate = {};

    splittedDescription.forEach((string, outerInd) => {
        string.split('|').forEach((row, innerInd) => {
            const splittedRow = row.split('__inp__');

            splittedRow.forEach((_, index) => {
                if (index < splittedRow.length && row.includes('__inp__')) {
                    resultTemplate[
                        outerInd * splittedDescription.length + innerInd
                    ] = 'No answer';
                }
            });
        });
    });

    return resultTemplate;
};

export const transformObj = (obj) => {
    return Object.values(obj).reduce((prev, curr, index) => {
        prev[index] = curr;
        return prev;
    }, {});
};

export const count = (string, toCount) => {
    let n = 0,
        j = 0;

    while (true) {
        j = string.indexOf(toCount, j);
        if (j >= 0) {
            n++;
            j++;
        } else break;
    }
    return n;
};
