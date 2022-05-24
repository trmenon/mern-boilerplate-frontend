import React, { Component} from "react";

// Material UI imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

class FeatureTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: ""
        };
    }

    componentDidMount() {
        console.log("Feature Two Widget mounted");
    }

    componentDidUpdate() {
        console.log("Feature Two Widget updated");
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
                        Feature Two Widget
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        component="div"
                    >
                        Why do we use it?
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        component="div"
                    >
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Typography>
                </Paper>
            </React.Fragment>             
        )
    }
}

export default FeatureTwo;