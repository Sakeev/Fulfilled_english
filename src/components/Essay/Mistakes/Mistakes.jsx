import { useEssay } from 'contexts/EssayContextProvider';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'components/ui';
import { API } from 'helpers/consts';
import api from 'http';

import styles from './Mistakes.module.scss';

const Mistakes = ({ essay, studentEssay }) => {
    const { getLesson } = useEssay();
    const [showPicker, setShowPicker] = useState(false);
    const [mistakesArr, setMistakesArr] = useState(
        essay?.user_essay[0].mistakes || []
    );
    const params = useParams();

    useEffect(() => {
        if (essay) {
            setMistakesArr(essay.user_essay[0].mistakes);
        }
    }, [essay]);

    const onCreateMarker = async () => {
        setShowPicker((prev) => !prev);
    };

    const createMistake = async (color) => {
        const data = {
            color: color,
            description: '',
        };

        await api.post(`${API}room/essa/${studentEssay.id}/add_mistake/`, data);
        setShowPicker(false);
        getLesson(params.studentId);
    };

    const onMistakeChange = (e, index) => {
        setMistakesArr((prev) => {
            const newMistakesArr = JSON.parse(JSON.stringify(prev));
            newMistakesArr[index].description = e.target.value;
            return newMistakesArr;
        });
    };

    const onMistakeBlur = async (index) => {
        const data = { ...mistakesArr[index] };

        await api.patch(
            `${API}room/essa/${studentEssay.id}/update_mistake/`,
            data
        );
    };

    const deleteMistake = async (index) => {
        const data = { data: { id: mistakesArr[index].id } };

        await api.delete(
            `${API}room/essa/${studentEssay.id}/delete_mistake/`,
            data
        );

        getLesson(params.studentId);
    };

    return (
        <div className={styles.mistakesContainer}>
            <div className={styles.mistakesWindow}>
                <p>Here is the teachers corrections:</p>
                <ul>
                    {mistakesArr.map((mistake, index) => {
                        return (
                            <li key={index} className={styles.mistake}>
                                <div
                                    style={{
                                        backgroundColor: mistake.color,
                                    }}
                                />
                                <input
                                    disabled={studentEssay?.checked}
                                    onBlur={() => onMistakeBlur(index)}
                                    onChange={(e) => {
                                        e.target.style.width =
                                            e.target.value.length + 'ch';
                                        onMistakeChange(e, index);
                                    }}
                                    value={mistake.description}
                                    type="text"
                                />
                                {studentEssay?.checked ? null : (
                                    <img
                                        onClick={() => deleteMistake(index)}
                                        src={require('assets/images/delete.png')}
                                        alt="delete"
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles.colorPicker}>
                <Button
                    disabled={studentEssay?.checked}
                    onClick={onCreateMarker}
                >
                    Create marker
                </Button>
                <div
                    className={`${styles.markers} ${
                        showPicker ? styles.show : ''
                    }`}
                >
                    <div
                        onClick={() => createMistake('orange')}
                        className={`${styles.marker} ${styles.orange}`}
                    ></div>
                    <div
                        onClick={() => createMistake('red')}
                        className={`${styles.marker} ${styles.red}`}
                    ></div>
                    <div
                        onClick={() => createMistake('green')}
                        className={`${styles.marker} ${styles.green}`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Mistakes;
