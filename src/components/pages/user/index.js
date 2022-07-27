import React from "react";
import { Outlet} from 'react-router-dom';
import { TaskBar } from "../../common";
// import { getCookie } from "../../../authentication/utils";

// Material UI imports
import Box from '@mui/material/Box';

function UserComponent(){
    // console.log(getCookie('token'));

    return(
        <React.Fragment>
            <TaskBar showControls={true}/>
            <Box sx={{mt: 1}}>
                <Outlet/>
            </Box>
        </React.Fragment>
    );
}

export default UserComponent;