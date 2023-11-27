import * as TaskResults from '../resultDisplayTasks'

export const useTaskResultsComponent = (taskDetails, displayDataType) => {
    const props = {
        key: taskDetails?.id,
        taskDetails: taskDetails,
        displayDataType: displayDataType,
        answer: taskDetails?.answers[taskDetails.answers.length - 1] || null,
    }

    const taskComponents = {
        'missing word': <TaskResults.Inputs {...props} />,
        'build sentence': <TaskResults.BuildSentences {...props} />,
        'build dialog': <TaskResults.BuildDialog {...props} />,
        'connect words': <TaskResults.ConnectWords {...props} />,
        table: <TaskResults.Table {...props} />,
        'describe image': <TaskResults.Images {...props} />,
        'work with images': <TaskResults.WorkWithImages {...props} />,
        'write sentences with given info': (
            <TaskResults.WriteSentencesWithGivenInfo {...props} />
        ),
    }

    return taskComponents[taskDetails?.implemented_case]
}
