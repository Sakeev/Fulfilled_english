import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import api from '../../http';

const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#C5E5E2',
    color: '#006D77',
    textTransform: 'upper',
    '&:hover': {
        backgroundColor: '#9bd0cb',
        color: '#006D77',
    },
};

const textareaStyle = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '1rem',
    width: '70%',
    height: '50%',
    borderRadius: '16px',
    border: '2px solid #006D77',
    marginBottom: '1rem',
    padding: '0.5rem 0.75rem',
    resize: 'none',
};

const Essay = () => {
    const [essay, setEssay] = useState('');
    const [essayError, setEssayError] = useState(false);
    const [sent, setSent] = useState(false);
    const [editText, setEditText] = useState();
    const [highlightedParts, setHighlightedParts] = useState([]);
    const textRef = useRef();
    const colorInputRef = useRef();
    const text =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aperiam porro excepturi, impedit nostrum consequatura, omnis pariatur accusamus fugit, vitae id sint similiquerepellendus! Officia obcaecati molestiae iusto quibusdam.';

    const API = 'http://35.238.162.84/room/essa/';

    const renderText = () => {
        let textToHighlight = text;

        for (let highlightedPart of highlightedParts) {
            const spanPart = `<span style="background-color: ${
                highlightedPart.color
            }">${textToHighlight.slice(
                highlightedPart.start,
                highlightedPart.end
            )}</span>`;

            textToHighlight =
                textToHighlight.slice(0, highlightedPart.start) +
                spanPart +
                textToHighlight.slice(highlightedPart.end);
        }

        return textToHighlight;
    };

    const renderTexta = () => {
        let textToHighlight = text;
        let indexesToPass = 0;

        for (let highlightedPart of highlightedParts) {
            const spanPart = `<span style="background-color: ${
                highlightedPart.color
            }">${textToHighlight.slice(
                highlightedPart.start + indexesToPass,
                highlightedPart.end + indexesToPass
            )}</span>`;

            console.log('----------------------------------------------------');
            console.log(textToHighlight);
            console.log(
                textToHighlight.slice(
                    indexesToPass,
                    highlightedPart.start + indexesToPass
                )
            );
            console.log(spanPart);
            console.log(
                textToHighlight.slice(highlightedPart.end + indexesToPass)
            );

            textToHighlight =
                textToHighlight.slice(0, indexesToPass) +
                textToHighlight.slice(
                    indexesToPass,
                    highlightedPart.start + indexesToPass
                ) +
                spanPart +
                textToHighlight.slice(highlightedPart.end + indexesToPass);

            indexesToPass =
                spanPart.length - (highlightedPart.end - highlightedPart.start);
            console.log(indexesToPass);
        }

        return textToHighlight;
    };

    useEffect(() => {
        console.log(renderText());
        textRef.current.innerHTML = renderText();
    }, [highlightedParts]);

    const sendEssay = async (essay) => {
        if (essay.split(' ').length < 50) return setEssayError(true);

        const essayData = {
            title: 'Test title',
            description: essay,
        };

        const data = await api.post(API, essayData);
        console.log(data);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Box
                sx={{
                    paddingLeft: '20%',
                    paddingTop: '5%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        paddingBottom: '5%',
                        color: '#006D77',
                        fontWeight: 'bold',
                        fontSize: '32px',
                    }}
                >
                    Essay
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingBottom: '5%',
                    }}
                >
                    <Typography
                        sx={{
                            paddingRight: '51.5%',
                            color: '#006D77',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Тема:
                    </Typography>
                    <Button sx={btnStyle}>перевести</Button>
                </Box>
                <textarea
                    readOnly={sent}
                    onChange={(e) => setEssay(e.target.value)}
                    style={textareaStyle}
                ></textarea>
                {essayError && (
                    <p style={{ marginBottom: '1rem', color: '#006D77' }}>
                        Эссе должно состоять минимум из 50 слов.
                    </p>
                )}
                <Button
                    onClick={() => sendEssay(essay)}
                    sx={{
                        ...btnStyle,
                        width: '12%',
                    }}
                >
                    Отправить
                </Button>
                <input type="color" ref={colorInputRef} />
                <p
                    ref={textRef}
                    onMouseUp={(e) => {
                        const selection = window.getSelection();
                        const highlightedPart = {
                            start: selection.baseOffset,
                            end: selection.extentOffset,
                            color: colorInputRef.current.value,
                        };

                        setHighlightedParts((prev) => {
                            return [...prev, highlightedPart];
                        });
                    }}
                >
                    {text}
                </p>
            </Box>
        </div>
    );
};

export default Essay;
