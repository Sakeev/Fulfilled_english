import { useEffect, useState } from 'react'
import { API } from 'helpers/consts'
import api from 'http'

import styles from './Mistakes.module.scss'

const StaticMistakes = ({ essay, studentEssay }) => {
    const [mistakesArr, setMistakesArr] = useState([])

    useEffect(() => {
        if (essay) {
            console.log(essay)
            setMistakesArr(essay.user_essay[0].mistakes)
        }
    }, [essay])

    const onMistakeChange = (e, index) => {
        setMistakesArr((prev) => {
            const newMistakesArr = JSON.parse(JSON.stringify(prev))
            newMistakesArr[index].description = e.target.value
            return newMistakesArr
        })
    }

    const onMistakeBlur = async (index) => {
        const data = { ...mistakesArr[index] }

        await api.patch(
            `${API}room/essa/${studentEssay.id}/update_mistake/`,
            data
        )
    }

    // const saveMistakes = () => {
    //     for (let mistake of mistakesArr) {
    //         api.patch(
    //             `${API}room/essa/${studentEssay.id}/update_mistake/`,
    //             mistake
    //         )
    //     }
    // }

    return (
        <div className={styles.mistakesContainer}>
            {/* <div className={styles.mistakesWindow}> */}
            {/* <p>Here is the teachers corrections:</p> */}
            <ul>
                {mistakesArr.map((mistake, index) => {
                    return (
                        <li key={index} className={styles.mistake}>
                            <div className={styles.mistakeHeader}>
                                <div
                                    style={{
                                        backgroundColor: mistake.color,
                                    }}
                                />
                                <span>{mistake.title}</span>
                            </div>
                            <textarea
                                disabled={studentEssay?.checked}
                                onBlur={() => onMistakeBlur(index)}
                                onChange={(e) => {
                                    onMistakeChange(e, index)
                                }}
                                value={mistake.description}
                            />
                            {/* <div
                                    className={styles.textarea}
                                    contentEditable
                                    disabled={studentEssay?.checked}
                                    onBlur={() => onMistakeBlur(index)}
                                    onChange={(e) => {
                                        onMistakeChange(e, index)
                                    }}
                                    value={mistake.description}
                                ></div> */}
                        </li>
                    )
                })}
            </ul>
            {/* </div> */}
        </div>
    )
}

export default StaticMistakes
