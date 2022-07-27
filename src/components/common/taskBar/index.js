import React from "react";
import PropTypes from 'prop-types';
import config from '../../../constants/config.json';
import {ResponsiveMenu, ProfileMenu } from './utils';

// Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudQueueSharpIcon from '@mui/icons-material/CloudQueueSharp';

const TaskBar = (props)=> {

    return(
        <AppBar position="static" color="inherit" sx={{mb: 4}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CloudQueueSharpIcon
                        color='secondary' 
                        sx={{ mr: 1 }} 
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'Raleway, Arial',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#7b1fa2',
                            textDecoration: 'none',
                        }}
                    >
                        {config["app-name"]}
                    </Typography>

                    {props?.showControls === true? <ResponsiveMenu/> : ""}

                    {props?.showControls === true?
                        <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end'}}>
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

TaskBar.propTypes= {
    showControls: PropTypes.bool.isRequired
}

TaskBar.defaultProps = {
    showControls: false
}

export default TaskBar;