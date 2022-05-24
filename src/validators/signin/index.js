import * as EmailValidator from 'email-validator';
export const signinValidator = (data)=> {
    let response= {status: true, message: []};
    if(EmailValidator.validate(data?.email) === false) {
        response= {
            ...response, 
            status: false, 
            message: [...response.message, "Invalid Email format"]
        };
    }
    return response;
}