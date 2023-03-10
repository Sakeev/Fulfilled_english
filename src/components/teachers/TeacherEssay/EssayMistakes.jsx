import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

const EssayMistakes = ({ mistakeColors }) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [isColorSelected, setIsColorSelected] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [mistakeDescription, setMistakeDescription] = useState('');

    const addMistakeWithDescription = () => {
        if (!selectedColor || !mistakeDescription) return;

        const newMistakes = [...mistakes];
        const newMistake = {
            color: selectedColor,
            description: mistakeDescription,
        };

        newMistakes.push(newMistake);
        setMistakes(newMistakes);
    };

    const removeMistakeWithDescription = (mistakeIndex) => {
        const newMistakes = mistakes.filter(
            (mistake, index) => mistakeIndex !== index
        );

        setMistakes(newMistakes);
    };

    return (
        <div className="mistakes">
            <div className="mistakes-header">
                <IconButton
                    onClick={addMistakeWithDescription}
                    sx={{ color: 'black' }}
                >
                    <AddCircleOutlineRoundedIcon fontSize="inherit" />
                </IconButton>

                <div className="mistakes-colors">
                    {mistakeColors.map((color, index) => {
                        return (
                            <div
                                onClick={() => {
                                    if (
                                        selectedColorIndex === index &&
                                        isColorSelected
                                    ) {
                                        setIsColorSelected(false);
                                        setSelectedColor('');
                                    } else {
                                        setIsColorSelected(true);
                                        setSelectedColor(color);
                                    }
                                    setSelectedColorIndex(index);
                                }}
                                className={`mistake-color ${
                                    selectedColorIndex === index &&
                                    isColorSelected
                                        ? 'color-selected'
                                        : ''
                                }`}
                                style={{ backgroundColor: color }}
                                key={index}
                            ></div>
                        );
                    })}
                </div>
                <TextField
                    variant="outlined"
                    value={mistakeDescription}
                    onChange={(e) => setMistakeDescription(e.target.value)}
                />
            </div>
            <div className="mistakes-colored-mistakes">
                {mistakes.map(({ color, description }, index) => {
                    return (
                        <div className="mistakes-colored-mistake" key={index}>
                            <div className="mistakes-color-description">
                                <div
                                    className="mistakes-colored-circle"
                                    style={{ backgroundColor: color }}
                                ></div>
                                <p> - {description}</p>
                            </div>
                            <IconButton
                                onClick={() =>
                                    removeMistakeWithDescription(index)
                                }
                                sx={{ color: 'black' }}
                            >
                                <DeleteOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EssayMistakes;
