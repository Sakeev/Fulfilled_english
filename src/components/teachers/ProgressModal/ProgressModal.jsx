import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { Modal } from 'components/ui';
import api from '../../../http';

import './ProgressModal.css';

const ProgressModal = ({ room, useStateHook }) => {
    const [age, setAge] = useState('');
    const [units, setUnits] = useState([]);
    const [currentUnit, setCurrentUnit] = useState(null);

    useEffect(() => {
        setUnits([]);
        if (room) {
            for (let unitURL of room.lessons) {
                api.get(unitURL).then((response) =>
                    setUnits((prev) => [...prev, response.data])
                );
            }
        }
    }, [room?.lessons]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Modal useStateHook={useStateHook}>
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
                {currentUnit?.case_tasks.map((caseTask, index) => (
                    <div className="pm-modal-row" key={index}>
                        <p>{caseTask.title}</p>
                        <span>
                            {caseTask.passed_quantity}/{caseTask.quantity_task}
                        </span>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default ProgressModal;
