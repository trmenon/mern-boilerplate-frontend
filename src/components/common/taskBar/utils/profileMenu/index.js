import React, { useState} from "react";
import { signoutUser } from "../../../../../authentication";
import { useNavigate  } from "react-router-dom"; 
import moment from 'moment';

// Services Import
import { signout, getProfileCardDetails } from "../../../../../services";

// Material UI imports
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const ProfileMenu = ()=> {
    const navigate = useNavigate();
    const [ state, setState] = useState({
        menu: {open: false, anchorEl: null},
        modal: {open: false},
        profileData: {name: '', email: '', joined: ''}
    });

    const handleMenuOpen = (event) => {
        setState({
            ...state,
            menu: {open: true, anchorEl: event.currentTarget}
        })
    };

    const handleMenuClose = ()=> {
        setState({
            ...state, menu: {open: false, anchorEl: null}
        });
    };

    const handleModalClose = ()=> {
        setState({
            ...state, modal: {open: false}
        });
    };

    const handleSignout = ()=> {
        signoutUser();
        try {
            signout().subscribe({
                next: (response)=> {
                    if(response?.success === true) {
                        navigate("/");                     
                    }
                },
                error: (error)=> {
                    console.log("Error: Trying to signout");
                }
            });
        }catch(err) {
            console.log("Error: Trying to signout");
        }        
    }

    const handleOpenModal = ()=> {
        try{
            getProfileCardDetails().subscribe({
                next: (response)=> {
                    if(response && response?.data && response?.success === true) {
                        setState({
                            ...state,
                            profileData: {
                                name: response?.data?.name,
                                email: response?.data?.email,
                                joined: moment(response?.data?.joined).format('LL'),
                            },
                            menu: {open: false, anchorEl: null},
                            modal: {open: true}
                        })
                    }
                }, 
                error: (error)=> {}, 
            })
        }catch(err) {
            console.log("Profile Card api failed");
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <Fab 
                variant="circular" 
                size="small" 
                color="secondary" 
                aria-label="add"
                onClick={handleMenuOpen}
            >
                {JSON.parse(localStorage.user)['firstName'][0]}
                {JSON.parse(localStorage.user)['lastName'][0]}
            </Fab>

            {/* Menu Configurations */}
            <Menu
                id="basic-menu"
                anchorEl={state.menu.anchorEl}
                open={state.menu.open}
                onClose={handleMenuClose}
                MenuListProps={{'aria-labelledby': 'basic-button',}}
            >
                <MenuItem onClick={handleOpenModal}>
                    <ListItemIcon>
                        <RememberMeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSignout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                </MenuItem>
            </Menu>

            {/* Modal Configuration */}
            <Dialog
                open={state.modal.open}
                TransitionComponent={Slide}
                TransitionProps= {{direction: 'left'}}
                keepMounted
                fullWidth
                scroll={'paper'}
                onClose={handleModalClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Profile"}</DialogTitle>
                <Divider sx={{my: 1}}/>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{border: '1px solid #ececec'}}>
                            <Box 
                                sx={{
                                    width: 'auto',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Typography variant="caption" display="block" gutterBottom>
                                    Name
                                </Typography>
                            </Box>
                            <Box 
                                sx={{
                                    width: 'auto',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography variant="h6" display="block" gutterBottom>
                                    {state?.profileData?.name}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{border: '1px solid #ececec'}}>
                            <Box 
                                sx={{
                                    width: 'auto',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Typography variant="caption" display="block" gutterBottom>
                                    Email
                                </Typography>
                            </Box>
                            <Box 
                                sx={{
                                    width: 'auto',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography variant="h6" display="block" gutterBottom>
                                    {state?.profileData?.email}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{my: 2}}/>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Typography variant="body2" display="block" gutterBottom>
                            Joined {state?.profileData?.joined}
                        </Typography>
                    </Box>
                </DialogContent>
                
            </Dialog>
        </React.Fragment>
    )
}

export default ProfileMenu;