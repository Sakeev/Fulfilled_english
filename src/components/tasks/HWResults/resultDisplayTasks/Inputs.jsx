import { parseId } from 'components/tasks/tasksType/utils'
import { Fragment } from 'react'

import styles from 'components/tasks/tasksType/Inputs/Inputs.module.scss'

const Inputs = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer

    if (answers.length < answer.right_answer.length) {
        for (let i = 0; i < answer.right_answer.length - answers.length; i++) {
            answers.push('No answer')
        }
    }

    const listItems = taskDetails.description.split('\\li')
    const answersCopy = JSON.parse(JSON.stringify(answers))

    const output = listItems.map((listItem, outerInd) => {
        const splittedRows = listItem
            .split('\r\n')
            .filter((splittedRow) => splittedRow.length > 0)

        return (
            <li className={styles.input} key={outerInd}>
                {splittedRows.map((rows, index) => {
                    const splittedRow = rows.split('__inp__')

                    return (
                        <div className={styles.row} key={index}>
                            {splittedRow.map((value, innerInd) => {
                                let temp = ''
                                const [id, string] = parseId(value)

                                if (string.length === 0 && id === -1)
                                    return null

                                if (innerInd < splittedRow.length - 1) {
                                    temp = answersCopy.shift()
                                }

                                return (
                                    <Fragment key={innerInd}>
                                        <span>{string}</span>
                                        {innerInd < splittedRow.length - 1 && (
                                            <span className={styles.answer}>
                                                {(typeof temp === 'object'
                                                    ? temp[0]
                                                    : temp) || ''}
                                            </span>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </div>
                    )
                })}
            </li>
        )
    })

    return (
        <div className={styles.inputsContainer}>
            <ol
                className={`${styles.inputs} ${
                    listItems.length === 1 ? styles.hideOrdering : ''
                }`}
            >
                {output}
            </ol>
        </div>
    )
}

export default Inputs
