import { RootState, RootThunkDispatch } from "../../store";
import axios from 'axios';
import { history } from "../../store";
// import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
// import { push } from "connected-react-router";
// import { JWTPayload } from "./reducer";



export function login(token: string) {
    return {
        type: '@@user/LOGIN' as const,
        token
    }
}

export function logout() {
    return {
        type: '@@user/LOGOUT' as const,
    }
}

export function loadToken(token: string) {
    return {
        type: '@@Auth/load_token' as const,
        token,
    }
}




export type AuthActions = ReturnType<typeof loadToken>

export type UserActions = ReturnType<typeof login> | ReturnType<typeof logout>;

export function logoutThunk() {
    return (dispatch: RootThunkDispatch) => {
        localStorage.removeItem('token')
        dispatch(logout())

    }
}

// eslint-disable-next-line react-hooks/rules-of-hooks

export function checkCurrentUser() {

    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const token = localStorage.getItem('token')

        if (token == null) {
            console.log("no token")
            return;
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/current`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            // console.log("fetched")
            const newToken: any = res.data

            dispatch(login(newToken))


            dispatch(loadToken(newToken))

            const state = getState()

            if (state.user.isAuthenticate && typeof state.authState.user !== "string" && state.authState.user !== undefined && state.authState.user!.phone_number === '11111111') {
                console.log('redictection needed!')
                history.push("/profilePage/accountDetails")

            }

            return
        } catch (e) {
            console.log(e)
        }
    }
}

