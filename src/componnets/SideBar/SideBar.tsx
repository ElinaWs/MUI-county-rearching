import Drawer from '@mui/material/Drawer';

interface Props {
    countries: ICountyShort[]
}

export const SideBar = () => {
    return (
        <Drawer open>
            SideBar for countries
        </Drawer>
    )
}