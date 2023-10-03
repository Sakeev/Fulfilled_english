import React, { useEffect, useState } from "react";
import { useSchedule } from "../../contexts/ScheduleContextProvider";
import { useUsers } from "../../contexts/UsersContextProvider";
import AddSchedule from "./AddSchedule";
import "./Schedule.css";
import { getWeekDay } from "../../helpers/funcs";
import ScheduleWindow from "./ScheduleWindow";

const rows = ["08", "12", "16", "20", "24"];
// const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const weekdays = [1, 2, 3, 4, 5, 6, 7];

const setLesson = (lessons, time, weekday) => {
    // let lesson = lessons?.find((les) => les.time === `${time}:00:00` && les.weekday === weekday)
    let lessonsOnTime = lessons?.filter(
        (les) =>
            +les.time.split(":")[0] >= +time &&
            +les.time.split(":")[0] < +time + 4 &&
            les.weekday === weekday
    );

    let comp = lessonsOnTime.length ? (
        lessonsOnTime.map((lesson) => (
            <ScheduleWindow lesson={lesson} />
        ))
    ) : (
        <></>
    );

    return <>{comp}</>;
};

const container = {
    margin: "0 auto",
    width: "90%",
    padding: "50px 70px",
};

const table_style = {
    width: "100%",
};

const ScheduleTeachers = () => {
    const { getSchedule, schedule } = useSchedule();
    const [showInps, setShowInps] = useState(false);
    const [dayInfo, setDayInfo] = useState({});

    useEffect(() => {
        getSchedule();
    }, []);

    console.log(schedule);

    return (
        <div style={container}>
            <table style={table_style} className="table_schedule">
                <tbody>
                    <tr>
                        <th>GMT+3</th>
                        <th
                            className={
                                getWeekDay() == "Monday" ? "today-active" : ""
                            }
                        >
                            Mon
                        </th>
                        <th
                            className={
                                getWeekDay() == "Tuesday" ? "today-active" : ""
                            }
                        >
                            Tue
                        </th>
                        <th
                            className={
                                getWeekDay() == "Wendesday"
                                    ? "today-active"
                                    : ""
                            }
                        >
                            Wed
                        </th>
                        <th
                            className={
                                getWeekDay() == "Thursday" ? "today-active" : ""
                            }
                        >
                            Thu
                        </th>
                        <th
                            className={
                                getWeekDay() == "Friday" ? "today-active" : ""
                            }
                        >
                            Fri
                        </th>
                        <th
                            className={
                                getWeekDay() == "Saturday" ? "today-active" : ""
                            }
                        >
                            Sat
                        </th>
                        <th
                            className={
                                getWeekDay() == "Sunday" ? "today-active" : ""
                            }
                        >
                            Sun
                        </th>
                    </tr>
                    {rows.map((row, index) => (
                        <tr className="table_row" key={index}>
                            <td className="table_time">{`${row}:00`}</td>
                            {weekdays.map((weekday, index) => (
                                <td
                                    key={index}
                                    onClick={(e) => {
                                        setDayInfo({
                                            weekday,
                                            time: `${row}:00`,
                                        });
                                        if (e.target.tagName !== "TD") {
                                            setDayInfo({
                                                ...dayInfo,
                                                filled: true,
                                                id: e.target.id,
                                            });
                                        }
                                    }}
                                >
                                    {setLesson(schedule, row, weekday)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showInps ? (
                <AddSchedule setShowInps={setShowInps} info={dayInfo} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ScheduleTeachers;
