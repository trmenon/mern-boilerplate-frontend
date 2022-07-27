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

const getProfileCardDetails = ()=> 
    fetchCall(
        `/user/profileCard/${JSON.parse(localStorage.user)?._id}`,
        config.requestMethod.GET,
        {},
        true
    );

export {
    signin,
    signup,
    signout,
    getProfileCardDetails
};