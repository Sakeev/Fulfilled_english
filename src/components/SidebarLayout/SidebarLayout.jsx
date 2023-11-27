import Sidebar from 'components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const SidebarLayout = () => {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>
    )
}

export default SidebarLayout
