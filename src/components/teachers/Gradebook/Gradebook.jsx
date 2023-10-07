import { useSchedule } from "contexts/ScheduleContextProvider";
import React, { useEffect, useState } from "react";
import styles from "./Gradebook.module.scss";
import { useAuth } from "contexts/AuthContextProvider";
import { calculateAverageGrade, getGrade } from "./utils";
import { MenuItem, ProgressBar, Select } from "components/ui";

const LessonRow = ({ lessonKey, date, grades, selectedUser }) => {
  const filteredGrades = grades.filter(
    (grade) => selectedUser === null || grade.user === selectedUser.user?.id
  );

  return (
    <tr key={lessonKey}>
      <td>{date}</td>
      <td>{lessonKey.replace("lesson", "")}</td>
      <td>{getGrade(filteredGrades, "hw")}</td>
      <td>{getGrade(filteredGrades, "essay")}</td>
      <td>{getGrade(filteredGrades, "cw")}</td>
    </tr>
  );
};

const Gradebook = () => {
  const { getRoomOrRooms } = useAuth();
  const { gradebook, getGradebook } = useSchedule();

  const [selectedUser, setSelectedUser] = useState({});

  // Стейт для группировки оценок по лессонам
  const [groupedGrades, setGroupedGrades] = useState({});
  const [rurooms, setRuroom] = useState([]);

  useEffect(() => {
    // innitialize load
    getGradebook();
    getRoomOrRooms().then((res) => setRuroom(res));
  }, []);

  useEffect(() => {
    // сразу получить количество лессонов
    const newGroupedGrades = gradebook.reduce((acc, grade) => {
      const lessonKey = `lesson${grade.lesson}`;

      if (!acc[lessonKey]) {
        acc[lessonKey] = {
          grades: [],
          date: grade.created,
        };
      }

      acc[lessonKey].grades.push(grade);

      return acc;
    }, {});

    setGroupedGrades(newGroupedGrades);
  }, [gradebook]);

  const handleSelect = (value) => {
    setSelectedUser(value);
  };

  console.log(rurooms);

  return (
    <div className={styles.gradebook_container}>
      <div className={styles.wrapper}>
        <h2 className={styles.gradebook_title}>Gradebook</h2>
        <div className={styles.gradebook_profile}>
          <label htmlFor="userSelect">Выберите пользователя: </label>

          {/* <select
            id="userSelect"
            className={styles.gradebook_select}
            onChange={(e) => setSelectedUser(+e.target.value)}
          >
            <option value={null} defaultValue>
              Выберите студента...
            </option>
            {users.map((user) => (
              <option id={user.id} value={user.id} key={user.id}>
                {user?.email}
              </option>
            ))}
          </select> */}
          <Select
            id="userSelect"
            // className={styles.gradebook_select}
            onSelect={handleSelect}
            label={selectedUser.user?.email}
          >
            {rurooms.map((userData) => (
              <MenuItem
                id={userData.user.id}
                value={userData}
                key={userData.id}
              >
                {userData?.user?.email}
              </MenuItem>
            ))}
          </Select>
          <div className={styles.gradebook_avatar}>
            <img src="" alt="" />
          </div>
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
            <ProgressBar percent={selectedUser.progress} height={30} />
          </div>
        </div>
        <div className={styles.gradebook_grades}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Lesson</th>
                <th>Essay</th>
                <th>Classwork</th>
                <th>Homework</th>
              </tr>
            </thead>
            {selectedUser ? (
              <>
                <tbody>
                  {Object.keys(groupedGrades).map((lessonKey) => (
                    <LessonRow
                      key={lessonKey}
                      lessonKey={lessonKey}
                      date={groupedGrades[lessonKey].date}
                      grades={groupedGrades[lessonKey].grades}
                      selectedUser={selectedUser}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan="1">
                      {calculateAverageGrade(gradebook, "hw", selectedUser)}
                    </td>
                    <td colSpan="1">
                      {calculateAverageGrade(gradebook, "essay", selectedUser)}
                    </td>
                    <td colSpan="1">
                      {calculateAverageGrade(gradebook, "cw", selectedUser)}
                    </td>
                  </tr>
                </tfoot>
              </>
            ) : null}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Gradebook;
