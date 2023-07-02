import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useTasks } from '../../contexts/TasksContextProvider';
import { useRenderTask } from './utils';

import './HWResults.css';

const HWResults = () => {
    const { caseInfo, infoCase } = useTasks();
    const { id, task_id } = useParams();
    const [tasksQuan, setTasksQuan] = useState(0);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        infoCase(id);
    }, []);

    useEffect(() => {
        setTasksQuan(caseInfo?.quantity_task);
    }, [caseInfo]);

    const handlePaginationBtn = (direction) => {
        if (
            (tasksQuan <= activePage && direction !== -1) ||
            (activePage <= 1 && direction !== 1)
        ) {
            return;
        }
        setActivePage(activePage + direction);
    };

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
            <p>{caseInfo.tasks?.[activePage - 1].condition}</p>
            <div className="hw-results-container">
                <div className="case1-task">
                    {useRenderTask(
                        caseInfo?.tasks
                            ? caseInfo?.tasks[activePage - 1]
                            : null,
                        id,
                        task_id
                    )}
                </div>
            </div>
        </div>
    );
};

export default HWResults;
