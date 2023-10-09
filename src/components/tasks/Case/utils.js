import { useParams } from 'react-router-dom';
import { useTasks } from 'contexts/TasksContextProvider';
import * as tasksType from '../tasksType';

export const getVocabulary = (cases) => {
    if (!cases.length) return null;

    let vocabulary;

    cases[0]?.case_tasks.forEach((caseTask) => {
        if (caseTask.title === 'vocabulary') vocabulary = caseTask;
    });

    return vocabulary || null;
};

export const useTaskComponent = () => {
    const { taskId } = useParams();
    const { taskDetails, handleAnswer, caseInfo, getTaskDetails } = useTasks();

    const props = {
        key: taskId,
        taskId: taskId,
        descr: taskDetails?.description,
        handleAnswer: handleAnswer,
        caseInfo: caseInfo,
        taskDetails: taskDetails,
        getTaskDetails: getTaskDetails, // need to remove and check tasksType components
    };

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
    };

    return taskComponents[taskDetails?.implemented_case];
};
