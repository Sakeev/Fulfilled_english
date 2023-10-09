import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import { useEssay } from '../../../contexts/EssayContextProvider';
import EditIcon from '@mui/icons-material/Edit';

const EditEssayTitle = ({ essayTitleObj, student, index }) => {
    const { updateEssay, loading, getStudentEssay } = useEssay();

    const { editTitle, setEditTitle } = essayTitleObj;
    const { editTitleId, setEditTitleId } = essayTitleObj;
    const { essayTitle, setEssayTitle } = essayTitleObj;

    const onClickEditIcon = (studentId, index) => {
        if (editTitle && index === editTitleId) {
            if (getStudentEssay(studentId).title !== essayTitle) {
                updateEssay(getStudentEssay(studentId).id, {
                    title: essayTitle,
                });
            }
            setEditTitle(false);
        } else if (!editTitle) {
            setEditTitle(true);
            setEditTitleId(index);
            setEssayTitle(getStudentEssay(studentId).title);
        } else {
            setEditTitle(false);
            setEditTitleId(null);
            setEssayTitle('');
        }
    };

    return (
        <div>
            {loading && index === editTitleId ? (
                <Box sx={{ width: '60%' }}>
                    <CircularProgress size="1.5rem" thickness={6} />
                </Box>
            ) : (
                <TextField
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            onClickEditIcon(student.id, index);
                        }
                    }}
                    onChange={(e) => setEssayTitle(e.target.value)}
                    disabled={!(editTitle && index === editTitleId)}
                    variant="standard"
                    value={
                        editTitle && index === editTitleId
                            ? essayTitle
                            : getStudentEssay(student.id).title
                    }
                />
            )}

            <IconButton
                disabled={
                    getStudentEssay(student.id).checked ||
                    (loading && index === editTitleId) ||
                    !getStudentEssay(student.id).id
                }
                onClick={() => onClickEditIcon(student.id, index)}
                color={editTitle && index === editTitleId ? 'primary' : ''}
                sx={{ marginLeft: '0.25em' }}
            >
                <EditIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
};

export default EditEssayTitle;
