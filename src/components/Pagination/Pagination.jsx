import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from 'contexts/TasksContextProvider';
import PaginationBar from '@mui/material/Pagination';
import { styles } from './PaginationStyles';
import { useEffect, useState } from 'react';

const Pagination = ({ count }) => {
    const { caseId } = useParams();
    const [page, setPage] = useState(1);
    const { getTaskDetails } = useTasks();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/task/case/${caseId}/task/${page}`);
        getTaskDetails(caseId, page);
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
