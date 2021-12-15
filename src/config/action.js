import * as types from './actionType';
import {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from '../firebase'
import {db,set,ref} from '../firebase';

const registerStart = () => ({
    type: types.REGISTER_START,
});

const registerSuccess = (user,uid) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
    userId:uid
});

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload:error
});

const loginStart = () => ({
    type: types.LOGIN_START,
});

const loginSuccess = (user,uid) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
    userId:uid,
});

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload:error
});

const logoutStart = () => ({
    type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload:error
});

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
});

export const registerInitiate = (email,password,displayName) => {
    return (dispatch) => {
        dispatch(registerStart());
        createUserWithEmailAndPassword(auth,email,password,displayName).then(({user})=>{
            const uid = user.uid;
            const obj = {
                email,
                password,
                displayName,
            }
            console.log(uid)
            const refrence = ref(db,`/users/${uid}`);
            set(refrence,obj).then(() =>{
                
            })
            dispatch(registerSuccess(user,uid));
        })
        .catch((error)=>{
            const errorMessage = error.message;
            dispatch(registerFail(errorMessage))
        });
        
    } 
}

export const loginInitiate = (email,password) => {
    return (dispatch) => {
        dispatch(loginStart());
        signInWithEmailAndPassword(auth,email,password).then(({user})=>{
            const uid = user.uid
            console.log(uid)
            dispatch(loginSuccess(user,uid));
        })
        .catch((error)=>{
            const errorMessage = error.message;
            dispatch(loginFail(errorMessage))
        });
        
    } 
}

export const logoutInitiate = () => {
    return (dispatch) => {
        dispatch(logoutStart());
        signOut(auth).then((resp) => dispatch(logoutSuccess()))
        .catch((error)=>{
            const errorMessage = error.message;
            dispatch(logoutFail(errorMessage))
        });
        
    } 
}