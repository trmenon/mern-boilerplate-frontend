import React from "react";
import { Outlet} from 'react-router-dom';
import { NavigationBar } from "../../common";

// Material UI imports
import Box from '@mui/material/Box';

function UserComponent(){
    

    return(
        <React.Fragment>
            <NavigationBar showControls={true}/>
            <Box sx={{mt: 1}}>
                <Outlet/>
            </Box>
        </React.Fragment>
    );
}

export default UserComponent;