import { fetchCall } from '../../endpoints';
import config from '../../../constants/config.json';

const signin = (data)=> 
    fetchCall(
        "/user/signin",
        config.requestMethod.POST,
        data
    );

const signup = (data)=> 
    fetchCall(
        "/user/signup",
        config.requestMethod.POST,
        data
    );

const signout = ()=> 
    fetchCall(
        "/user/signout",
        config.requestMethod.GET,
        {}
    );

export {
    signin,
    signup,
    signout
};