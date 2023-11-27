import React, { useEffect, useState } from 'react'
import { useSchedule } from '../../contexts/ScheduleContextProvider'
import { useUsers } from '../../contexts/UsersContextProvider'
import AddSchedule from './AddSchedule'
import './Schedule.css'
import { getMonthInThreeLetter, getWeekDay } from '../../helpers/funcs'
import ScheduleWindow from './ScheduleWindow'

const rows = ['08', '12', '16', '20', '24']
// const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const weekdays = [1, 2, 3, 4, 5, 6, 7]

const setLesson = (lessons, time, weekday) => {
    // let lesson = lessons?.find((les) => les.time === `${time}:00:00` && les.weekday === weekday)
    let lessonsOnTime = lessons?.filter(
        (les) =>
            +les.time.split(':')[0] >= +time &&
            +les.time.split(':')[0] < +time + 4 &&
            les.weekday === weekday
    )

    let comp = lessonsOnTime.length ? (
        lessonsOnTime.map((lesson, index, array) => (
            <ScheduleWindow lesson={lesson} length={array.length} key={index} />
        ))
    ) : (
        <></>
    )

    return <>{comp}</>
}

// const getFitDate = (weekday, today) => {
//     let res = '01';
//     switch (weekday) {
//         case 'mon':
//             res = today.getDate() - today.getDay() + 1;
//             break;
//         case 'tue':
//             res = today.getDate() - today.getDay() + 2;
//             break;
//         case 'wed':
//             res = today.getDate() - today.getDay() + 3;
//             break;
//         case 'thu':
//             res = today.getDate() - today.getDay() + 4;
//             break;
//         case 'fri':
//             res = today.getDate() - today.getDay() + 5;
//             break;
//         case 'sat':
//             res = today.getDate() - today.getDay() + 6;
//             break;
//         case 'sun':
//             res = today.getDate() - today.getDay() + 7;
//             break;
//         default:
//             break;
//     }
//     return res.toString().length == 1 ? "0" + res : res.toString();
// }

const container = {
    margin: '0 auto',
    width: '95%',
    padding: '60px',
    height: '90vh',
}

const ScheduleTeachers = () => {
    const { getSchedule, schedule } = useSchedule()
    const [showInps, setShowInps] = useState(false)
    const [dayInfo, setDayInfo] = useState({})

    useEffect(() => {
        getSchedule()
    }, [])

    // console.log(schedule);
    // let today = new Date();
    // const nextweek = new Date(
    //     today.getFullYear(),
    //     today.getMonth(),
    //     today.getDate() + 28,
    // );

    return (
        <div style={container}>
            <h2 className="schedule_heading">Schedule</h2>
            <table className="table_schedule">
                <tbody>
                    <tr>
                        <th>GMT+3</th>
                        <th
                            className={
                                getWeekDay() == 'Monday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('mon', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Mon
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Tuesday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('tue', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Tue
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Wendesday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('wed', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Wed
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Thursday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('thu', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Thu
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Friday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('fri', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Fri
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Saturday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('sat', nextweek) + " " + getMonthInThreeLetter(nextweek)}
                        >
                            Sat
                        </th>
                        <th
                            className={
                                getWeekDay() == 'Sunday'
                                    ? 'weekdays today-active'
                                    : 'weekdays non-active-day'
                            }
                            // date={getFitDate('sun', nextweek) + " " + getMonthInThreeLetter(nextweek)}
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
                                        })
                                        if (e.target.tagName !== 'TD') {
                                            setDayInfo({
                                                ...dayInfo,
                                                filled: true,
                                                id: e.target.id,
                                            })
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
    )
}

export default ScheduleTeachers
