import { Input } from 'components/ui'
import { Fragment } from 'react'

export const formResultTemplate = (splittedDescription) => {
    const resultTemplate = {}

    splittedDescription.forEach((string, outerInd) => {
        string.split('|').forEach((row, innerInd) => {
            const splittedRow = row.split('__inp__')

            splittedRow.forEach((_, index) => {
                if (index < splittedRow.length && row.includes('__inp__')) {
                    resultTemplate[
                        outerInd * splittedDescription.length + innerInd
                    ] = 'No answer'
                }
            })
        })
    })

    return resultTemplate
}

export const transformObj = (obj) => {
    return Object.values(obj).reduce((prev, curr, index) => {
        prev[index] = curr
        return prev
    }, {})
}

export const count = (string, toCount) => {
    let n = 0,
        j = 0

    while (true) {
        j = string.indexOf(toCount, j)
        if (j >= 0) {
            n++
            j++
        } else break
    }
    return n
}

export const renderInputs = (row, handler, key) => {
    const splittedRow = row.split('__inp__')

    return (
        <p key={key}>
            {splittedRow.map((value, index) => {
                const [id, string] = parseId(value)

                return (
                    <Fragment key={index}>
                        {string}
                        {index < splittedRow.length - 1 && (
                            <Input
                                onChange={(event) => {
                                    handler(event, id)
                                }}
                            />
                        )}
                    </Fragment>
                )
            })}
        </p>
    )
}

export const renderOutput = (row, classes, answers, key) => {
    const splittedRow = row.split('__inp__')

    return (
        <p key={key}>
            {splittedRow.map((value, index) => {
                const [id, string] = parseId(value)

                return (
                    <Fragment key={index}>
                        {string}
                        {index < splittedRow.length - 1 && (
                            <span className={classes}>
                                {(typeof answers[id] === 'object'
                                    ? answers[id][0]
                                    : answers[id]) || ''}
                            </span>
                        )}
                    </Fragment>
                )
            })}
        </p>
    )
}

export const parseId = (string) => {
    if (!isNumeric(string[string.length - 1])) return [0, string]
    let id = ''
    let i = 1

    while (isNumeric(string[string.length - i])) {
        id = string[string.length - i] + id

        i++
    }

    return [
        id.length === 0 ? -1 : +id,
        string.slice(0, string.length - (i - 1)),
    ]
}

function isNumeric(str) {
    return /^\d+$/.test(str)
}
