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
                return (
                    <>
                        {index < splittedRow.length - 1
                            ? value.slice(0, value.length - 1)
                            : value}
                        {index < splittedRow.length - 1 && (
                            <input
                                onChange={(event) => {
                                    handler(
                                        event,
                                        +value.slice(value.length - 1)
                                    );
                                }}
                            />
                        )}
                    </>
                );
            })}
        </p>
    );
};
