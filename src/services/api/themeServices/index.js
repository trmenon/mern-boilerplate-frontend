import { fetchCall } from '../../endpoints';
import config from '../../../constants/config.json';

// Getting User Theme
const getUserTheme = (userId)=> 
    fetchCall(
        `/theme/userTheme/${userId}`,
        config.requestMethod.GET,
        {},
        true
    );

// Updating Theme
const updateUserTheme = (data)=>
    fetchCall(
        '/theme/updateTheme',
        config.requestMethod.PUT,
        data,
        true
    );

export {
    getUserTheme,
    updateUserTheme
};