import { useSchedule } from "contexts/ScheduleContextProvider";
import React, { useEffect, useState } from "react";
import styles from "./Gradebook.module.scss";
import { useAuth } from "contexts/AuthContextProvider";
import { calculateAverageGrade, getGrade } from "./utils";

const LessonRow = ({ lessonKey, date, grades, selectedUser }) => {
  const filteredGrades = grades.filter(
    (grade) => selectedUser === null || grade.user === selectedUser
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
  const { users, getUsers } = useAuth();
  const { gradebook, getGradebook } = useSchedule();

  const [selectedUser, setSelectedUser] = useState(null);

  // Стейт для группировки оценок по лессонам
  const [groupedGrades, setGroupedGrades] = useState({});

  useEffect(() => {
    // innitialize load
    getGradebook();
    getUsers();
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

  return (
    <div className={styles.gradebook_container}>
      <div className={styles.wrapper}>
        <h2 className={styles.gradebook_title}>Gradebook</h2>
        <div className={styles.gradebook_profile}>
          <label htmlFor="userSelect">Выберите пользователя: </label>

          <select
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
          </select>
          <div className={styles.gradebook_avatar}>
            <img src="" alt="" />
          </div>
        </div>
        <div className="gradebook-progress"></div>
        <div className="gradebook-schedule">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Homework</th>
                <th>Essay</th>
                <th>Classwork</th>
                <th>Lesson</th>
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

// let gradebook = [
//   {
//     id: 153,
//     cw: false,
//     hw: true,
//     grade: 5,
//     created: "2023-09-27",
//     essay: false,
//     user: 2,
//     lesson: 1,
//   },
//   {
//     id: 154,
//     cw: false,
//     hw: false,
//     grade: 8,
//     created: "2023-09-28",
//     essay: true,
//     user: 2,
//     lesson: 1,
//   },
//   {
//     id: 154,
//     cw: true,
//     hw: false,
//     grade: 3,
//     created: "2023-09-28",
//     essay: false,
//     user: 2,
//     lesson: 1,
//   },
// ];
