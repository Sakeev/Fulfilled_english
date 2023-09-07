import HomeIcon from 'assets/icons/home.svg';
import HomeworkIcon from 'assets/icons/homework.svg';
import EssayIcon from 'assets/icons/essay.svg';
import StudentsIcon from 'assets/icons/students.svg';
import ScheduleIcon from 'assets/icons/schedule.svg';
import LogoutIcon from 'assets/icons/logout.svg';
import { routes } from 'helpers/consts';

export const sections = [
    {
        title: 'Dashboard',
        icon: HomeIcon,
        activeIcon: HomeworkIcon,
        alt: 'home',
        route: routes.HOME,
    },
    {
        title: 'Homework',
        icon: HomeworkIcon,
        activeIcon: HomeworkIcon,
        alt: 'homework',
        route: routes.HOMEWORK,
    },
    {
        title: 'Essay',
        icon: EssayIcon,
        activeIcon: HomeworkIcon,
        alt: 'essay',
        route: routes.ESSAY,
    },
    {
        title: 'Students',
        icon: StudentsIcon,
        activeIcon: HomeworkIcon,
        alt: 'students',
        route: routes.STUDENTS,
    },
    {
        title: 'Schedule',
        icon: ScheduleIcon,
        activeIcon: HomeworkIcon,
        alt: 'schedule',
        route: routes.SCHEDULE,
    },
];

export const logoutSection = {
    title: 'Logout',
    icon: LogoutIcon,
    activeIcon: HomeworkIcon,
    alt: 'logout',
    route: '/',
};
