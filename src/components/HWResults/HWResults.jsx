import { useTasks } from '../../contexts/TasksContextProvider';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RenderTask from './RenderTask';

import './HWResults.css';

const HWResults = () => {
    const { caseInfo, infoCase } = useTasks();
    const { id, task_id } = useParams();
    const [tasksQuan, setTasksQuan] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        infoCase(id);
    }, []);

    useEffect(() => {
        setTasksQuan(caseInfo?.quantity_task);
        setCurrentTask(caseInfo?.tasks?.[activePage - 1] || null);
    }, [caseInfo]);

    useEffect(() => {
        setCurrentTask(caseInfo?.tasks?.[activePage - 1] || null);
    }, [activePage]);

    const handlePaginationBtn = (direction) => {
        if (
            (tasksQuan <= activePage && direction !== -1) ||
            (activePage <= 1 && direction !== 1)
        ) {
            return;
        }
        setActivePage(activePage + direction);
    };

    const checkHW = () => {
        if (currentTask) {
            if (currentTask.answers.length === 0) return true;

            return currentTask.answers[currentTask.answers.length - 1].accepted;
        } else return false;
    };

    // console.log(currentTask);

    return (
        <div className="hw-results">
            <div className="slider__pagination">
                <button
                    onClick={() => handlePaginationBtn(-1)}
                    disabled={activePage === 1 ? true : false}
                >
                    &#8249;&#8249;
                </button>
                <h5>{activePage}</h5>
                <button
                    onClick={() => handlePaginationBtn(1)}
                    disabled={activePage === tasksQuan ? true : false}
                >
                    &#8250;&#8250;
                </button>
            </div>
            <div className="hw-results-container">
                <p className="hw-results-condition">{currentTask?.condition}</p>
                <div className="hw-results-student">
                    <div className="hw-results-task">
                        <RenderTask
                            task={currentTask}
                            id={id}
                            task_id={task_id}
                            displayDataType={'student'}
                        />
                        <p className="hw-results-accuracy">
                            {checkHW() ? 'O' : 'X'}
                        </p>
                    </div>
                </div>
                {!checkHW() && (
                    <div className="hw-results-teacher">
                        <div className="hw-results-task">
                            <RenderTask
                                task={currentTask}
                                id={id}
                                task_id={task_id}
                                displayDataType={'teacher'}
                            />
                            <p className="hw-results-accuracy">O</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HWResults;
