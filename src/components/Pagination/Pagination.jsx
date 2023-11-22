import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from 'contexts/TasksContextProvider';
import PaginationBar from '@mui/material/Pagination';
import { styles } from './PaginationStyles';
import { useEffect } from 'react';

// THIS PAGINATION ONLY FOR HOMEWORKS!!!

const Pagination = ({ count, pagination, pageHook }) => {
    const { caseId } = useParams();
    const [page, setPage] = pageHook;
    const { getTaskDetails } = useTasks();
    const navigate = useNavigate();

    useEffect(() => {
        if (pagination.type === 'results') {
            pagination.cb(page);
        } else {
            getTaskDetails(caseId, page);
            navigate(`/task/case/${caseId}/task/${page}`);
        }
    }, [page]);

    const handleChange = (_, value) => {
        setPage(value);
    };

    return (
        <PaginationBar
            sx={styles}
            count={count}
            page={page}
            onChange={handleChange}
        />
    );
};

export default Pagination;
