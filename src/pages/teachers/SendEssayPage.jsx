import SendEssay from '../../components/teachers/SendEssay';
import Sidebar from '../../components/Sidebar';
import { Box } from '@mui/material';

const SendEssayPage = () => {
    return (
        <div>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'hidden',
                    display: 'flex',
                }}
            >
                <Sidebar />
                <SendEssay />
            </Box>
        </div>
    );
};

export default SendEssayPage;
