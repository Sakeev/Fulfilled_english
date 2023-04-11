import ViewEssay from '../../components/teachers/TeacherEssay/ViewEssay';
import Sidebar from '../../components/Sidebar';

const container = {
    width: '100%',
    display: 'flex',
};

const ViewEssayPage = () => (
    <div style={container}>
        <Sidebar />
        <ViewEssay />
    </div>
);

export default ViewEssayPage;
