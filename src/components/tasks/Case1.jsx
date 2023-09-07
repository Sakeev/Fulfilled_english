import WriteSentencesWithGivenInfo from './tasksType/WriteSentencesWithGivenInfo';
import BuildSentences from './tasksType/BuildSentences/BuildSentences';
import ContinueImageWord from '../tasks/tasksType/ContinueImageWord';
import { useTasks } from '../../contexts/TasksContextProvider';
import ContinueSentence from './tasksType/ContinueSentence';
import { useNavigate, useParams } from 'react-router-dom';
import Vocabulary from '../classwork/tasks/Vocabulary';
import BuildDialog from './tasksType/BuildDialog';
import Inputs from '../tasks/tasksType/Inputs';
import Dropdown from './tasksType/DropDown';
import { useEffect, useState } from 'react';
import Images from './tasksType/Images';
import Table from './tasksType/Table';
import PagBar from './PagBar';

import './Case1.css';

const Case1 = () => {
    const { id, task_id } = useParams();
    const [compl, setCompl] = useState([]);
    const inputValuesHook = useState({});

    const {
        handleCaseDetail,
        progObj,
        getProgress,
        handleCase,
        cases,
        editProgress,
        taskProgress,
        countTasksProgress,
        caseDetail,
        singleCase,
        oneCase,
        handleAnswer,
        infoCase,
        caseInfo,
    } = useTasks();

    const [count, setCount] = useState(0);
    const { tasks } = caseDetail;
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const taskId = caseInfo.tasks?.[task_id - 1].id;
    const [showVocab, setShowVocab] = useState(false);

    useEffect(() => {
        infoCase(id);
        handleCase();
    }, []);

    const checkCompl = () => {
        handleCase();
        if (oneCase?.passed_quantity == oneCase?.quantity_task) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    useEffect(() => {
        handleCaseDetail(id, task_id);
    }, [id, task_id]);

    useEffect(() => {
        singleCase(id);
        setCount(oneCase?.quantity_task);
    }, [oneCase?.quantity_task]);

    const [answer, setAnswer] = useState('');

    const answerObj = {
        answers: answer,
    };

    const checkRes = (newElement) => {
        const newCompl = [...compl, newElement];
        setCompl(newCompl);
    };

    const getVocabulary = () => {
        if (cases.length === 0) return null;

        let vocabulary;

        cases[0]?.case_tasks.forEach((caseTask) => {
            if (caseTask.title === 'vocabulary') vocabulary = caseTask;
        });

        return vocabulary || null;
    };

    useEffect(() => {
        singleCase(id);
        if (oneCase?.passed_quantity === oneCase?.quantity_task) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [oneCase?.passed_quantity]);

    let component = null;

    switch (caseDetail?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    key={taskId}
                    inputValuesHook={inputValuesHook}
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );
            break;
        case 'build sentence':
            component = (
                <BuildSentences
                    key={taskId}
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );

            break;
        case 'build dialog':
            component = (
                <BuildDialog
                    key={taskId}
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );

            break;
        case 'connect words':
            component = (
                <ContinueSentence
                    key={taskId}
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );

            break;
        case 'drop down':
            component = (
                <Dropdown
                    key={taskId}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                />
            );
            break;
        case 'table':
            component = (
                <Table
                    key={taskId}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                />
            );
            break;
        case 'describe image':
            component = (
                <Images
                    key={taskId}
                    caseDetail={caseDetail}
                    handleAnswer={handleAnswer}
                    taskId={taskId}
                />
            );
            break;

        case 'work with images':
            component = (
                <ContinueImageWord
                    key={taskId}
                    caseDetail={caseDetail}
                    handleAnswer={handleAnswer}
                    taskId={taskId}
                />
            );
            break;

        case 'write sentences with given info':
            component = (
                <WriteSentencesWithGivenInfo
                    key={taskId}
                    caseDetail={caseDetail}
                    handleAnswer={handleAnswer}
                    taskId={taskId}
                />
            );
            break;

        default:
            component = null;
            break;
    }

    console.log(caseDetail);

    const vocabulary = getVocabulary();

    return (
        <div className="case1-hw-page">
            <div className="case1-task-container">
                <div className="vocabulary-box-wrapper">
                    {vocabulary ? (
                        <div>
                            <Vocabulary
                                showVocab={showVocab}
                                setShowVocab={setShowVocab}
                                vocabTasks={[vocabulary]}
                            />
                        </div>
                    ) : null}
                </div>
                <div className="case1-task-condition">
                    {caseDetail?.condition}
                </div>
                <div className="case1-task">
                    {component}
                    <PagBar
                        count={count}
                        sx={{ alignSelf: 'center' }}
                        inputValuesHook={inputValuesHook}
                    />
                </div>
            </div>
        </div>
    );
};

export default Case1;
