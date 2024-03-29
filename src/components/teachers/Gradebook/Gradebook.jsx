import { useSchedule } from 'contexts/ScheduleContextProvider'
import React, { useEffect, useState } from 'react'
import styles from './Gradebook.module.scss'
import { useAuth } from 'contexts/AuthContextProvider'
import { calculateAverageGrade, getGrade } from './utils'
import { MenuItem, ProgressBar, Select } from 'components/ui'
import { API } from 'helpers/consts'

const LessonRow = ({ lessonKey, date, grades, selectedUser }) => {
    const filteredGrades = grades.filter(
        (grade) =>
            selectedUser === null || grade.user === +selectedUser.user?.id
    )
    return (
        <tr key={lessonKey}>
            {/* <td>{date}</td> */}
            {selectedUser.user ? (
                <td>{lessonKey.replace('lesson', '')}</td>
            ) : (
                ''
            )}
            <td>{getGrade(filteredGrades, 'hw')}</td>
            <td>{getGrade(filteredGrades, 'essay')}</td>
            <td>{getGrade(filteredGrades, 'cw')}</td>
        </tr>
    )
}

const Gradebook = () => {
    const { getRoomOrRooms } = useAuth()
    const { gradebook, getGradebook } = useSchedule()

    const [selectedUser, setSelectedUser] = useState({})

    // Стейт для группировки оценок по лессонам
    const [groupedGrades, setGroupedGrades] = useState({})
    const [rurooms, setRuroom] = useState([])

    useEffect(() => {
        // innitialize load
        getGradebook()
        getRoomOrRooms().then((res) => setRuroom(res))
    }, [])

    useEffect(() => {
        // сразу получить количество лессонов
        const newGroupedGrades = gradebook.reduce((acc, grade) => {
            const lessonKey = `lesson${grade.lesson}`

            if (!acc[lessonKey]) {
                acc[lessonKey] = {
                    grades: [],
                    date: grade.created,
                }
            }

            acc[lessonKey].grades.push(grade)

            return acc
        }, {})

        setGroupedGrades(newGroupedGrades)
        getRoomOrRooms().then((res) => setRuroom(res))
    }, [gradebook])

    const handleSelect = (value) => {
        setSelectedUser(value)
    }

    const getPercents = () => {
        if (selectedUser?.progress_classwork == 0) return 0
        return Math.round(
            (100 / selectedUser?.lessons?.length) *
                selectedUser?.progress_classwork
        )
    }

    return (
        <div className={styles.gradebook_container}>
            <div className={styles.wrapper}>
                <h2 className={styles.gradebook_title}>Gradebook</h2>
                <div className={styles.gradebook_profile}>
                    {/* <label htmlFor="userSelect">Выберите пользователя: </label> */}
                    <Select
                        id="userSelect"
                        // className={styles.gradebook_select}
                        onSelect={handleSelect}
                        // label={selectedUser.user?.email}
                    >
                        {rurooms.length > 0
                            ? rurooms.map((userData) => (
                                  <MenuItem
                                      id={userData.user.id}
                                      value={userData}
                                      key={userData.id}
                                  >
                                      {userData?.user?.email}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                    {selectedUser.user ? (
                        // <div className={styles.profile_avatar}>
                        <img
                            src={`${API}${selectedUser.user?.avatar}`}
                            alt={selectedUser.user?.avatar}
                        />
                    ) : // </div>
                    null}
                </div>
                <div className={styles.gradebook_progress}>
                    <div className={styles.progress_left}>
                        <p>
                            level: <span>{selectedUser.level}</span>
                        </p>
                        <p>
                            email: <span>{selectedUser.user?.email}</span>
                        </p>
                    </div>
                    <div className={styles.progress_right}>
                        <p>Progress: </p>
                        {selectedUser.user ? (
                            <ProgressBar percent={getPercents()} height={30} />
                        ) : null}
                    </div>
                </div>
                <div className={styles.gradebook_grades}>
                    <table>
                        <thead>
                            <tr>
                                {/* <th>Date</th> */}
                                <th>Lesson</th>
                                <th>Homework</th>
                                <th>Essay</th>
                                <th>Classwork</th>
                            </tr>
                        </thead>
                        {selectedUser.id ? (
                            <>
                                <tbody>
                                    {Object.keys(groupedGrades).map(
                                        (lessonKey) => (
                                            <LessonRow
                                                key={lessonKey}
                                                lessonKey={lessonKey}
                                                date={
                                                    groupedGrades[lessonKey]
                                                        .date
                                                }
                                                grades={
                                                    groupedGrades[lessonKey]
                                                        .grades
                                                }
                                                selectedUser={selectedUser}
                                            />
                                        )
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={1}></td>
                                        <td colSpan={1}></td>
                                        <td colSpan={1}></td>
                                        <td colSpan={1}></td>
                                    </tr>
                                    <tr>
                                        <td>AVG</td>
                                        <td>
                                            {calculateAverageGrade(
                                                gradebook,
                                                'hw',
                                                +selectedUser.user?.id
                                            )}
                                        </td>
                                        <td>
                                            {calculateAverageGrade(
                                                gradebook,
                                                'essay',
                                                +selectedUser.user?.id
                                            )}
                                        </td>
                                        <td>
                                            {calculateAverageGrade(
                                                gradebook,
                                                'cw',
                                                +selectedUser.user?.id
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </>
                        ) : null}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Gradebook
