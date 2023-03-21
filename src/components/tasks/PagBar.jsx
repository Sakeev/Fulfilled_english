import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function PagBar({count}) {
  const { id  , task_id} = useParams();

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(page);
  const navigate = useNavigate();

  React.useEffect(()=>{
    navigate(`/task/case/${id}/task/${page}`);
  },[page])

  return (
    <Stack spacing={2}>

      <Pagination count={count} page={page} variant="outlined" color="primary" onChange={handleChange} />
    
    </Stack>
  );
}