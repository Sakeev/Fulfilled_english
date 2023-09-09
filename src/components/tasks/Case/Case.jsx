import WriteSentencesWithGivenInfo from '../tasksType/WriteSentencesWithGivenInfo';
import BuildSentences from '../tasksType/BuildSentences/BuildSentences';
import ContinueImageWord from '../tasksType/ContinueImageWord';
import { useTasks } from 'contexts/TasksContextProvider';
import Vocabulary from 'components/classwork/tasks/Vocabulary';
import ContinueSentence from '../tasksType/ContinueSentence';
import { useParams } from 'react-router-dom';
import BuildDialog from '../tasksType/BuildDialog';
import Inputs from '../tasksType/Inputs';
import Dropdown from '../tasksType/DropDown';
import Pagination from 'components/Pagination';
import { useEffect } from 'react';
import Images from '../tasksType/Images';
import Table from '../tasksType/Table';
import { getVocabulary } from './utils';

import './Case.css';

const Case = () => {
    const { caseId, taskId } = useParams();

    const {
        getTaskDetails,
        getCases,
        cases,
        caseDetail,
        handleAnswer,
        getCaseInfo,
        caseInfo,
    } = useTasks();

    const vocabulary = getVocabulary(cases);

    useEffect(() => {
        getCases();
        getCaseInfo(caseId);
        getTaskDetails(caseId, taskId);
    }, []);

    let component = null;

    switch (caseDetail?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    key={taskId}
                    descr={caseDetail?.description}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                />
            );
            break;
        case 'build sentence':
            component = (
                <BuildSentences
                    key={taskId}
                    descr={caseDetail?.description}
                    id={caseId}
                    task_id={taskId}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={getTaskDetails}
                />
            );

            break;
        case 'build dialog':
            component = (
                <BuildDialog
                    key={taskId}
                    descr={caseDetail?.description}
                    id={caseId}
                    task_id={taskId}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={getTaskDetails}
                />
            );

            break;
        case 'connect words':
            component = (
                <ContinueSentence
                    key={taskId}
                    descr={caseDetail?.description}
                    id={caseId}
                    task_id={taskId}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={getTaskDetails}
                />
            );

            break;
        case 'drop down':
            component = (
                <Dropdown
                    key={taskId}
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

    return (
        <div className="case1-hw-page">
            <div className="case1-task-container">
                <div className="vocabulary-box-wrapper">
                    {/* {vocabulary ? (
                        <div>
                            <Vocabulary
                                showVocab={showVocab}
                                setShowVocab={setShowVocab}
                                vocabTasks={[vocabulary]}
                            />
                        </div>
                    ) : null} */}
                </div>
                <div className="case1-task-condition">
                    {caseDetail?.condition}
                </div>
                <div className="case1-task">
                    {component}
                    <Pagination count={caseInfo.quantity_task} />
                </div>
            </div>
        </div>
    );
};

export default Case;
