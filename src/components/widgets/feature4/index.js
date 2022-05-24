import React, { Component} from "react";

// Material UI imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

class FeatureFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: ""
        };
    }

    componentDidMount() {
        console.log("Feature Four Widget mounted");
    }

    componentDidUpdate() {
        console.log("Feature Four Widget updated");
        console.log(this.state);
    }

    render() {
        return(
            <React.Fragment>
                <Paper elevation={12} sx={{m: 4, p: 8}}>
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        component="div"
                    >
                        Feature Four Widget
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        component="div"
                    >
                        The standard Lorem Ipsum passage, used since the 1500s
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        component="div"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Paper>
            </React.Fragment>             
        )
    }
}

export default FeatureFour;