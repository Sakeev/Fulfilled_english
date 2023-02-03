import ViewEssay from '../../components/teachers/ViewEssay';
import Sidebar from '../../components/Sidebar';

const container = {
    width: '100%',
    display: 'flex',
};

const ViewEssayPage = () => {
    return (
        <div style={container}>
            <Sidebar />
            <ViewEssay />
        </div>
    );
};

export default ViewEssayPage;
