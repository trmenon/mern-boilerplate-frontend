import React, { Component} from "react";

// Material UI imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

class FeatureOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: ""
        };
    }

    componentDidMount() {
        console.log("Feature One Widget mounted");
    }

    componentDidUpdate() {
        console.log("Feature One Widget updated");
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
                        Feature one Widget
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        component="div"
                    >
                        What is Lorem Ipsum?
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        component="div"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </Paper>
            </React.Fragment>             
        )
    }
}

export default FeatureOne;