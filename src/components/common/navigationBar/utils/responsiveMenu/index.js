import React, {useState} from "react";
import { useNavigate  } from "react-router-dom";
import config from '../../../../../constants/config.json';

// Material UI imports
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const ResponsiveMenu = (props)=> {
    const navigate = useNavigate();
    const [state, setState]= useState({
        anchorEl: null,
        open: false
    });

    const handleOpen = (event) => {
        setState({
            ...state, 
            anchorEl: event.currentTarget, 
            open: true
        });
    };

    const handleClose = () => {
        setState({
            ...state, 
            anchorEl: null, 
            open: false
        });
    };

    const handleNavigate= (data)=> {
        navigate(data);
        handleClose();
    }

    return (
        <React.Fragment>
            <IconButton 
                color="secondary"
                onClick={handleOpen}
            >                
                <MenuIcon/>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={state?.anchorEl}
                open={state?.open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button',}}
            >  
                {config?.routes.map((element)=> {
                    return(
                        <MenuItem
                            key={element?.key} 
                            onClick={()=> handleNavigate(element?.route)}
                        >
                            <ListItemIcon sx={{color: '#01579b'}}>
                                <ExitToAppOutlinedIcon 
                                    fontSize="small"                                 
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={element?.name}
                                primaryTypographyProps={{color: '#01579b'}}
                            />
                        </MenuItem>
                    );
                })}
            </Menu>
        </React.Fragment>
    );
}

export default ResponsiveMenu;