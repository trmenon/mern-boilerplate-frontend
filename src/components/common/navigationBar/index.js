import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import config from '../../../constants/config.json';
import { useNavigate, useLocation  } from "react-router-dom";
import {ResponsiveMenu, ProfileMenu } from './utils';

// Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudQueueSharpIcon from '@mui/icons-material/CloudQueueSharp';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NavigationBar = (props)=> {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState]= useState({
        selectedRoute: location?.pathname
    })

    const handleFeatureChange = (event, newValue)=> {
        setState({
            ...state,
            selectedRoute: newValue
        });
    }

    useEffect(()=> {
        function handleNavigate() {
            navigate(state?.selectedRoute);
        }
        handleNavigate();        
    }, [state])

    return(
        <AppBar position="static" color="inherit" sx={{mb: 4}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CloudQueueSharpIcon
                        color='secondary' 
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} 
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Raleway, Arial',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#7b1fa2',
                            textDecoration: 'none',
                        }}
                    >
                        {config["app-name"]}
                    </Typography>

                    {props?.showControls === true?
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <ResponsiveMenu/>
                        </Box>
                        :
                        ""
                    }
                    
                    <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                        <CloudQueueSharpIcon
                            color='secondary' 
                            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} 
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                fontFamily: 'Raleway, Arial',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#7b1fa2',
                                textDecoration: 'none',
                            }}
                        >
                            {config["app-name"]}
                        </Typography>
                    </Box>

                    {props?.showControls === true?
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tabs 
                                value={state?.selectedRoute} 
                                onChange={handleFeatureChange} 
                                aria-label="basic tabs example"
                            >
                                {config?.routes.map((element)=> {
                                    return(
                                        <Tab 
                                            key={element?.key}
                                            label={element?.name} 
                                            value={element?.route} 
                                        />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        :
                        ""
                    }

                    {props?.showControls === true?
                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            <ProfileMenu/>
                        </Box>
                        :
                        ""
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}

NavigationBar.propTypes= {
    showControls: PropTypes.bool.isRequired
}

NavigationBar.defaultProps = {
    showControls: false
}

export default NavigationBar;