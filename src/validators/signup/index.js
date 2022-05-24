import * as EmailValidator from 'email-validator';
export const signupValidator = (data)=> {
    let response= {status: true, message: []};
    if(data?.firstName.length === 0) {
        response= {
            ...response, 
            status: false, 
            message: [...response.message, "First name can not be empty"]
        };
    }
    if(data?.lastName.length === 0) {
        response= {
            ...response, 
            status: false, 
            message: [...response.message, "Last name can not be empty"]
        };
    }
    if(EmailValidator.validate(data?.email) === false) {
        response= {
            ...response, 
            status: false, 
            message: [...response.message, "Invalid Email format"]
        };
    }
    if(data?.password !== data?.confirmPassword) {
        response= {
            ...response, 
            status: false, 
            message: [...response.message, "Password do not match"]
        };
    }
    return response;
}