import React, {useState} from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import config from '../../../../../constants/config.json';

// Material UI imports
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ResponsiveMenu = (props)=> {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState]= useState({
        anchorEl: null,
        open: false
    });

    const handleClick= (value)=> {
        navigate(value?.route);
    }

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

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {config?.routes.map((element)=> {
                    return(
                        <Button
                            key={`wide-screen-routes-${element?.key}`}
                            variant={location?.pathname === element?.route? 'contained': 'text'}
                            size='medium'
                            color='secondary'
                            onClick = {()=>handleClick(element)}
                        >
                            {element?.name}
                        </Button>
                    )
                })}
            </Box>
            <Box sx={{ mr: 2, flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                <IconButton onClick = {handleOpen} >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="responsive-menu-small-screen"
                    anchorEl={state.anchorEl}
                    open={state.open}
                    onClose={handleClose}
                    MenuListProps={{'aria-labelledby': 'basic-button',}}
                >
                    {config?.routes.map((element)=> {
                        return(
                            <MenuItem
                                key={`small-screen-routes-${element?.key}`} 
                                onClick={()=>handleClick(element)}
                            >
                                <ListItemIcon>
                                    {location?.pathname === element?.route? <ArrowRightIcon fontSize="small" />: ''}                                    
                                </ListItemIcon>
                                <ListItemText>{element?.name}</ListItemText>
                            </MenuItem>
                        )
                    })}                    
                </Menu>
            </Box>
        </React.Fragment>
    );
}

export default ResponsiveMenu;