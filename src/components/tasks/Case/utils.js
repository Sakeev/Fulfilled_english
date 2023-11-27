import { useParams } from 'react-router-dom'
import { useTasks } from 'contexts/TasksContextProvider'
import * as tasksType from '../tasksType'

export const renderCondition = (condition) => {
    if (condition) {
        return condition
            .split('\r\n')
            .map((row, index) =>
                row.length ? <p key={index}>{row}</p> : <br key={index} />
            )
    }
    return null
}

export const getVocabulary = (cases) => {
    if (!cases.length) return null

    let vocabulary

    cases[0]?.case_tasks.forEach((caseTask) => {
        if (caseTask.title === 'vocabulary') vocabulary = caseTask
    })

    return vocabulary || null
}

export const useTaskComponent = (nextTask = null) => {
    const { caseId, taskId } = useParams()
    const { taskDetails, handleAnswer } = useTasks()

    const props = {
        key: taskId,
        handleAnswer: handleAnswer,
        taskDetails: taskDetails,
        ids: { caseId, taskId },
        nextTask: nextTask,
    }

    const taskComponents = {
        'missing word': <tasksType.Inputs {...props} />,
        'build sentence': <tasksType.BuildSentences {...props} />,
        'build dialog': <tasksType.BuildDialog {...props} />,
        'connect words': <tasksType.ConnectWords {...props} />,
        table: <tasksType.Table {...props} />,
        'describe image': <tasksType.DescribeImage {...props} />,
        'work with images': <tasksType.WorkWithImages {...props} />,
        'write sentences with given info': (
            <tasksType.WriteSentences {...props} />
        ),
    }

    return taskComponents[taskDetails?.implemented_case]
}
