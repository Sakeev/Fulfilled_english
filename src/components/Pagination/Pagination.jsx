import { useNavigate, useParams } from 'react-router-dom';
import PaginationBar from '@mui/material/Pagination';
import { styles } from './PaginationStyles';
import { useEffect, useState } from 'react';

const Pagination = ({ count }) => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/task/case/${id}/task/${page}`);
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
