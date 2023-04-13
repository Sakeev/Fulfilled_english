import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../http';

import './ProgressModal.css';

const ProgressModal = ({ room, setShowModal }) => {
    const [age, setAge] = useState('');
    const [units, setUnits] = useState([]);
    const [currentUnit, setCurrentUnit] = useState(null);

    useEffect(() => {
        setUnits([]);
        for (let unitURL of room.lessons) {
            api.get(unitURL).then((response) =>
                setUnits((prev) => [...prev, response.data])
            );
        }
    }, [room.lessons]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const backgroundClick = () => {
        setShowModal(false);
    };

    console.log(units);

    return (
        <div className="pm-background" onClick={backgroundClick}>
            <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="pm-modal-selects">
                    <p>Select the unit</p>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        onChange={handleChange}
                        placeholder="dsa"
                    >
                        {units.map((unit, index) => (
                            <MenuItem
                                onClick={() => setCurrentUnit(unit)}
                                key={index}
                                value={unit.title}
                            >
                                {unit.title}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="pm-modal-tasks">
                    <h2>{currentUnit?.title}</h2>
                    {currentUnit?.case_tasks.map((caseTask) => (
                        <div className="pm-modal-row">
                            <p>{caseTask.title}</p>
                            <span>
                                {caseTask.passed_quantity}/
                                {caseTask.quantity_task}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressModal;