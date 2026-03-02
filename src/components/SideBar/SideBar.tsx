import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ICountryShort } from "../../types/types";

interface Props {
    countries: ICountryShort[];
    onSelect: (code: string) => void;
  }

export const SideBar = ({countries, onSelect}:Props) => {
    return (
        <Drawer 
            variant="permanent"
            anchor="left" 
            PaperProps={{ sx: { width: 350 } }}
        >
        <List>
            {countries.map((country) => (
            <ListItemButton 
                key={country.alpha3Code} 
                onClick={() => onSelect(country.alpha3Code)}
            >
            <ListItemText primary={country.name} />
            </ListItemButton>
            ))}
            </List>
        </Drawer>
    )
}