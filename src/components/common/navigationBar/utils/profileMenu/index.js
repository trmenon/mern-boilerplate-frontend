import React, { Component} from "react";
import config from '../../../../../constants/config.json';
import DynamicNavigator from "../../../dynamicNavigator";

// Services Import
import { getUserTheme, updateUserTheme } from "../../../../../services";

// Material UI imports
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            theme: {
                displayString: 'NU', 
                avatarTheme: 'primary',
                fullString: 'No User'
            },
            toaster: {show: false, message: ''}
        };
    }

    componentDidMount() {
        this.getTheme();
    }

    componentDidUpdate() {
        // console.log("Feature One Widget updated");
        // console.log(this.state);
    }

    getTheme= ()=> {
        try{
            getUserTheme(JSON.parse(localStorage.user)['_id']).subscribe({
                next: (response)=> {
                    if(response?.success === true) {
                        this.setState({
                            ...this.state,
                            theme: {
                                ...this.state.theme,
                                key: response?.data?._id,
                                displayString: response?.data?.displayString,
                                avatarTheme: response?.data?.avatarTheme,
                                fullString: `${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`
                            }
                        });                        
                    }else {
                        this.handleToasterOpen("Unable to load theme");
                    }
                },
                error: (error)=> {
                    this.handleToasterOpen("Unable to load theme");
                },
            })
        }catch(err) {
            this.handleToasterOpen("Unexpected error occured");
        }
    }

    updateTheme = (data)=> {
        try{
            updateUserTheme(data).subscribe({
                next: (response)=> {
                    if(response?.success === true) {
                        this.getTheme();
                    }
                },
                error: (error)=> {
                    this.handleToasterOpen("Unable to update theme");
                },
            })
        }catch(err) {
            this.handleToasterOpen("Unexpected error occured");
        }
    }

    handleOpen = (event)=> {
        this.setState({
            ...this.state, 
            anchorEl: event.currentTarget, 
            open: true
        })
    };

    handleClose = ()=> {
        this.setState({
            ...this.state, 
            anchorEl: null, 
            open: false
        })
    }

    handleThemeChange = (value)=> {
        const data = {
            themeId: this.state?.theme?.key,
            changeData: {avatarTheme: value}
        };
        this.updateTheme(data);
    }

    handleToasterOpen = (message)=> {
        this.setState({
            ...this.state,
            toaster: {
                ...this.state.toaster,
                show: true,
                message: message
            }
        })
    };

    handleToasterClose = ()=> {
        this.setState({
            ...this.state,
            toaster: {
                ...this.state.toaster,
                show: false,
                message: ''
            }
        })
    };

    render() {
        return(
            <React.Fragment>
                {/* Toaster  */}
                <Snackbar 
                    open={this.state?.toaster?.show} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={6000} 
                    TransitionComponent={Slide}
                    TransitionProps={{direction: 'right'}}
                    onClose={this.handleToasterClose}
                >
                    <Alert 
                        onClose={this.handleToasterClose} 
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {this.state?.toaster?.message}
                    </Alert>
                </Snackbar>

                <IconButton
                    onClick={this.handleOpen}
                    color={this.state?.theme?.avatarTheme}
                    size="small"
                    sx={{ ml: 2 }}
                >
                    <AccountCircleIcon/>
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={this.state?.anchorEl}
                    open={this.state?.open}
                    onClose={this.handleClose}
                    MenuListProps={{'aria-labelledby': 'basic-button',}}
                >
                    <MenuItem>
                        <Chip 
                            avatar={<Avatar>{this.state?.theme?.displayString}</Avatar>} 
                            label={this.state?.theme?.fullString}
                            color={this.state?.theme?.avatarTheme}
                            variant="filled"
                        />
                    </MenuItem>
                    <Divider sx={{my: 1}}/>
                    <MenuItem>
                        <Tooltip 
                            title="Select Theme"
                            placement="top-end"
                            arrow={true}
                            followCursor={true}
                        >
                            <Grid container spacing={2}>
                                {config?.["avatar-themes"].map((element)=> {
                                    return(
                                        <Grid 
                                            key={element?.key} 
                                            item xs={2}
                                            onClick={()=> {
                                                this.handleThemeChange(
                                                    element?.value
                                                );
                                            }}
                                        >
                                            <IconButton color={element?.value}>
                                                <AccountCircleIcon/>
                                            </IconButton>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Tooltip>
                    </MenuItem>
                    <Divider sx={{my: 1}}/>
                    <MenuItem>
                        <DynamicNavigator
                            filled= {false}
                            isSignout= {true}
                            color= 'info'
                            label= 'Signout'
                            route= ''
                            clickHandler = {this.handleClose}
                        />
                    </MenuItem>
                </Menu>
            </React.Fragment>             
        )
    }
}

export default ProfileMenu;