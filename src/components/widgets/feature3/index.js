import React, { Component} from "react";

// Material UI imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

class FeatureThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: ""
        };
    }

    componentDidMount() {
        console.log("Feature Three Widget mounted");
    }

    componentDidUpdate() {
        console.log("Feature Three Widget updated");
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
                        Feature Three Widget
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        component="div"
                    >
                        Where does it come from?
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        component="div"
                    >
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </Typography>
                </Paper>
            </React.Fragment>             
        )
    }
}

export default FeatureThree;