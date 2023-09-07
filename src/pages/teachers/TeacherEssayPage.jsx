import TeacherEssay from '../../components/teachers/TeacherEssay/TeacherEssay';
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
            <TeacherEssay />
        </Box>
    </div>
);

export default TeacherEssayPage;
