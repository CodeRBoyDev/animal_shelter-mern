// save login  reponse > (_id's name and token) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {
        // console.log('authenticate', response)
        sessionStorage.setItem('token', JSON.stringify(response.data.token));
        sessionStorage.setItem('_id', JSON.stringify(response.data.user._id));
        sessionStorage.setItem('role', JSON.stringify(response.data.user.role));
        sessionStorage.setItem('name', JSON.stringify(response.data.user.name));
    }
    next();
};
export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        } else {
            return false;
        }
    }
};
// access _id name from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('_id')) {
            return JSON.parse(sessionStorage.getItem('_id'));
        } else {
            return false;
        }
    }
};

export const getName = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('name')) {
            return JSON.parse(sessionStorage.getItem('name'));
        } else {
            return false;
        }
    }
};

export const getRole= () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('role')) {
            return JSON.parse(sessionStorage.getItem('role'));
        } else {
            return false;
        }
    }
};

export const logout = next => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('_id');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('name');
    }
    next();
};