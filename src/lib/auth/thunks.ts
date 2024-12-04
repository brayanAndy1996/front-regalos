import { registerUserWithEmailPassword } from '@/service/userProvider';
import { checkingCredentials, logout, login, setFavorites } from './';

export const checkingAuthentication = () => {
    return async( dispatch: any ) => {

        dispatch( checkingCredentials() );
        
    }
}

export const startLoginWithEmailPassword = ({ email, password }:{password: string, email: string}) => {
    return async( dispatch: any ) => {

        dispatch( checkingCredentials() )

        const result = await registerUserWithEmailPassword({ email, password })

        if ( !result.ok ) return dispatch( logout( result ) )
        dispatch( login( result ))

    }
}

