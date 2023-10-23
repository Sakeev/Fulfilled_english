import { Input } from 'components/ui';

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

export const renderInputs = (row, handler) => {
    const splittedRow = row.split('__inp__');

    return (
        <p>
            {splittedRow.map((value, index) => {
                const [id, string] = parseId(value);

                return (
                    <>
                        {string}
                        {index < splittedRow.length - 1 && (
                            <Input
                                onChange={(event) => {
                                    handler(event, id);
                                }}
                            />
                        )}
                    </>
                );
            })}
        </p>
    );
};

export const renderOutput = (row, classes, answers) => {
    const splittedRow = row.split('__inp__');

    return (
        <p>
            {splittedRow.map((value, index) => {
                const [id, string] = parseId(value);

                return (
                    <>
                        {string}
                        {index < splittedRow.length - 1 && (
                            <span className={classes}>
                                {(typeof answers[id] === 'object'
                                    ? answers[id][0]
                                    : answers[id]) || ''}
                            </span>
                        )}
                    </>
                );
            })}
        </p>
    );
};

const parseId = (string) => {
    if (!isNumeric(string[string.length - 1])) return [0, string];
    let id = '';
    let i = 1;

    while (isNumeric(string[string.length - i])) {
        id = string[string.length - i] + id;

        i++;
    }

    return [+id, string.slice(0, string.length - (i - 1))];
};

function isNumeric(str) {
    return /^\d+$/.test(str);
}
