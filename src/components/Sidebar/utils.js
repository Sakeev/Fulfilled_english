import Home from 'assets/icons/home.svg'
import HomeActive from 'assets/icons/home-active.svg'
import Homework from 'assets/icons/homework.svg'
import HomeworkActive from 'assets/icons/homework-active.svg'
import Essay from 'assets/icons/essay.svg'
import EssayActive from 'assets/icons/essay-active.svg'
import Students from 'assets/icons/students.svg'
import StudentsActive from 'assets/icons/students-active.svg'
import Schedule from 'assets/icons/schedule.svg'
import ScheduleActive from 'assets/icons/schedule-active.svg'
import Logout from 'assets/icons/logout.svg'
import LogoutActive from 'assets/icons/logout-active.svg'
import { routes } from 'helpers/consts'
import { isTeacher } from 'helpers/funcs'

const sections = [
    {
        title: 'Dashboard',
        icon: Home,
        activeIcon: HomeActive,
        alt: 'home',
        route: routes.HOME,
    },
    {
        title: 'Homework',
        icon: Homework,
        activeIcon: HomeworkActive,
        alt: 'homework',
        route: routes.HOMEWORK,
    },
    {
        title: 'Essay',
        icon: Essay,
        activeIcon: EssayActive,
        alt: 'essay',
        route: routes.ESSAY,
    },
    // {
    //     title: 'Students',
    //     icon: Students,
    //     activeIcon: StudentsActive,
    //     alt: 'students',
    //     route: routes.STUDENTS,
    // },
    {
        title: 'Gradebook',
        icon: Students,
        activeIcon: StudentsActive,
        alt: 'students',
        route: routes.GRADEBOOK,
    },
    {
        title: 'Schedule',
        icon: Schedule,
        activeIcon: ScheduleActive,
        alt: 'schedule',
        route: routes.SCHEDULE,
    },
]

const logoutSection = {
    title: 'Logout',
    icon: Logout,
    activeIcon: LogoutActive,
    alt: 'logout',
    route: '/',
}

export { sections, logoutSection }
