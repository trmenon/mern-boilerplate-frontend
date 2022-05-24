import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate  } from "react-router-dom";
import { NavigationBar, IntelligentForm} from '../../common';
import { SignupFields, SigninFields} from './constants';
import { signupValidator, signinValidator } from "../../../validators";
import { authenticateUser } from "../../../authentication";

// Services Import
import { signup, signin } from "../../../services/api/userServices";

// Material UI imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function GateComponent(){
    const navigate = useNavigate();
    const [state, setState] = useState({
        selected: "SIGNIN",
        toaster: {open: false, isError: false, content: ''}
    });

    const handleTabChange = (event, newValue)=> {
        setState({...state, selected: newValue});
    }

    const handleSubmitForm = (data)=> {
        let validationStatus = {};
        if(state?.selected === "SIGNUP") {
            validationStatus = signupValidator(data);
            if(validationStatus?.status === true) {
                signupDriver(data);
            }else {
                const message = validationStatus?.message.join();
                handleToasterOpen(true, message, ()=> {
                    setState({...state, selected: "SIGNUP"})
                });
            }
        }
        if(state?.selected === "SIGNIN") {
            validationStatus = signinValidator(data);
            if(validationStatus?.status === true) {
                signinDriver(data);
            }else {
                const message = validationStatus?.message.join();
                handleToasterOpen(true, message, ()=> {
                    setState({...state, selected: "SIGNIN"})
                });
            }
        }
    }

    const signupDriver = (data)=> {
        try {
            signup(data).subscribe({
                next: (response)=> {
                    if(response?.success === true) {
                        handleToasterOpen(false, response?.message, ()=> {
                            setState({...state, selected: "SIGNIN"})
                        });
                    }else {
                        handleToasterOpen(true, response?.message, ()=> {
                            setState({...state, selected: "SIGNUP"})
                        });
                        console.log(state);
                    }
                },
                error: (error)=> {
                    handleToasterOpen(true, "Unable to Signup at the moment", ()=> {
                        setState({...state, selected: "SIGNUP"})
                    });
                },
            })
        }catch(err) {
            handleToasterOpen(true, "Unexpected error occured", ()=> {
                setState({...state, selected: "SIGNUP"})
            });
        }
    }

    const signinDriver = (data)=> {
        try {
            signin(data).subscribe({
                next: (response)=> {
                    if(response?.success === true) {
                        const authData = { 
                            token : response?.token, 
                            user : response?.data 
                        };
                        const auth = authenticateUser(authData);
                        if(auth === true) {
                            navigate("/user/feature1");
                        }
                    }else {
                        handleToasterOpen(true, response?.message, ()=> {
                            setState({...state, selected: "SIGNIN"})
                        });
                    }
                },
                error: (error)=> {
                    handleToasterOpen(true, "Unable to Signin at the moment", ()=> {
                        setState({...state, selected: "SIGNIN"})
                    });
                },
            })
        }catch(err) {
            handleToasterOpen(true, "Unexpected error occured", ()=> {
                setState({...state, selected: "SIGNIN"})
            });
        }
    }

    const handleToasterOpen = (isError, message)=> {
        setState({
            ...state,
            toaster: {
                ...state.toaster,
                open: true,
                isError: isError,
                content: message
            }
        })
    }

    const handleToasterClose = ()=> {
        setState({
            ...state,
            toaster: {
                ...state.toaster,
                open: false, 
                isError: false, 
                content: ''
            }
        })
    }

    return(
        <React.Fragment>
            <NavigationBar showControls={false}/>

            {/* Toasters */}
            <Snackbar 
                open={state?.toaster?.open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000} 
                TransitionComponent={Slide}
                TransitionProps={{direction: 'right'}}
                onClose={handleToasterClose}
            >
                <Alert 
                    onClose={handleToasterClose} 
                    severity={state?.toaster?.isError === true?"error":"success"} 
                    sx={{ width: '100%' }}
                >
                    {state?.toaster?.content}
                </Alert>
            </Snackbar>

            <Box 
                sx= {{
                    mt: 2, 
                    px: {xs: 0, md: '140px'}, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }} 
            >
                <Card sx={{width: '100%'}}>                    
                    <CardContent>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabContext value={state?.selected}>
                                <TabList 
                                    onChange={handleTabChange} 
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Sign In" value="SIGNIN" />
                                    <Tab label="Sign Up" value="SIGNUP" />
                                </TabList>
                            </TabContext>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <IntelligentForm 
                                key={uuidv4()}
                                data={state?.selected === "SIGNIN"?SigninFields:SignupFields}
                                formSubmit={handleSubmitForm}
                                buttonLabel={state?.selected === "SIGNIN"?"Sign in":"Sign up"}
                            />
                        </Box>
                    </CardContent>
                    
                </Card>
            </Box>
        </React.Fragment>
    );
}

export default GateComponent;