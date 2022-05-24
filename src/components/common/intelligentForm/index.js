import React, {useState} from "react";
import PropTypes from 'prop-types';

// Material UI imports
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IntelligentForm = (props)=> {
    const [state, setState]= useState({
        fields: props?.data.map((element)=> {
            return {name: element?.name, value: ''}
        })
    })
    
    const handleFormChange = (data, index)=> {
        let fields = state?.fields;
        const element= {...fields[index], value:data.target.value};
        fields.splice(index, 1, element);
        setState({...state, fields: fields});
    }

    const handleFormSubmit = ()=> {
        let data = {};
        state?.fields.forEach((element)=> {
            data[`${element?.name}`]= element?.value;
        })
        props.formSubmit(data);
    }
    

    return(
        <Box sx={{m: 2}}>            
            {props.data.length === 0?
                <Alert variant="outlined" severity="error">
                    <Typography variant="h6" gutterBottom component="div">
                        Nothing to show here
                    </Typography>
                </Alert>                    
                :
                <React.Fragment>
                    <Stack spacing={2}>
                        {props?.data.map((element, index)=> {
                            return(
                                <Box key={element?.name}>
                                    <TextField 
                                        id={element?.name}
                                        type= {element?.type}
                                        label={element?.label} 
                                        variant="outlined" 
                                        color="secondary"
                                        fullWidth={element?.fullwidth}
                                        margin="dense"
                                        onChange={(event)=>handleFormChange(event, index)}
                                    />
                                </Box>
                            )
                        })}
                    </Stack>
                    <Box sx={{mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Button 
                            variant="text"
                            color="secondary"
                            onClick={handleFormSubmit}
                        >
                            {props?.buttonLabel}
                        </Button>
                    </Box>
                </React.Fragment>
            }            
        </Box>
    );
}

IntelligentForm.propTypes= {
    data: PropTypes.array.isRequired,
    formSubmit: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired
}

IntelligentForm.defaultProps = {
    data: [],
    formSubmit: ()=> {},
    buttonLabel: ""
}

export default IntelligentForm;