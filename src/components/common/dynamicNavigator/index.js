import React from "react";
import PropTypes from 'prop-types';
import { useNavigate  } from "react-router-dom";
import { signoutUser } from "../../../authentication";

// Services Import
import { signout } from "../../../services";

// Material UI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DynamicNavigator = (props)=> {
    const navigate= useNavigate();

    const handleClick = ()=> {
        props.clickHandler();
        if(props?.isSignout === true) {
            handleSignout();
        }else {
            navigateToRoute();
        }
    }

    const handleSignout= ()=> {
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
    };

    const navigateToRoute = ()=> {
        navigate(props?.route)
    };

    return (
        <React.Fragment>
            <Box sx={{width: '100%'}}>
                <Button
                    variant={props?.filled === true? "filled": "outlined"}
                    color={props?.color}
                    onClick = {handleClick}
                    fullWidth={true}
                >
                    {props?.label}
                </Button>
            </Box>
        </React.Fragment>
    );
}

DynamicNavigator.propTypes= {
    isSignout: PropTypes.bool.isRequired,
    filled: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,        
    clickHandler: PropTypes.func.isRequired,        
}

DynamicNavigator.defaultProps = {
    filled: false,
    isSignout: false,
    color: '',
    label: '',
    route: '',
    clickHandler: ()=> {}
}

export default DynamicNavigator;