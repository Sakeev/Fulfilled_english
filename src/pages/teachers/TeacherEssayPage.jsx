import TeacherEssay from '../../components/teachers/TeacherEssay/TeacherEssay';
import Sidebar from '../../components/Sidebar';
import { Box } from '@mui/material';

const TeacherEssayPage = () => (
    <div>
        <Box
            sx={{
                height: '100vh',
                overflowY: 'hidden',
                display: 'flex',
            }}
        >
            <Sidebar />
            <TeacherEssay />
        </Box>
    </div>
);

export default TeacherEssayPage;
