import { FormControl, MenuItem, Paper, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useClassWork } from '../../contexts/ClassWorkContextProvider';

const Notes = () => {
    const { getNotes, notes } = useClassWork();
    const [note, setNote] = useState(null);
    console.log(note);

    useEffect(() => {
        getNotes();
    }, []);

    const handleSelect = (event) => {
        setNote(event.target.value);
    };

    const formatText = () => {
        const regex = /(&nbsp;)+/g;
        const textWithoutTags = note.body.replace(regex, '\n');

        return textWithoutTags.trim().replace(/\s+/g, ' ');
    };

    return (
        <>
            <Box sx={{ width: '80%' }}>
                <Paper
                    elevation={1}
                    sx={{
                        m: 5,
                        height: '78vh',
                        width: '95%',
                        p: 2,
                        bgcolor: '#f2fcff',
                        borderRadius: '10px 10px 10px 10px',
                    }}
                >
                    <h2>Список заметок</h2>
                    <Box
                        sx={{
                            width: '100%',
                            marginBlock: '1em',
                        }}
                    >
                        <FormControl sx={{ width: '10vw' }}>
                            <Select
                                sx={{
                                    '.MuiSelect-select': {
                                        paddingBlock: '0.5em',
                                    },
                                }}
                                value={note || ''}
                                onChange={handleSelect}
                            >
                                {notes.map((note) => {
                                    return (
                                        <MenuItem key={note.id} value={note}>
                                            Lesson {note.lesson}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    {note ? (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: formatText(),
                            }}
                        ></p>
                    ) : (
                        <h4>Choose the lesson</h4>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default Notes;
