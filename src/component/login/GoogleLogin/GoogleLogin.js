import { useEffect, useState } from "react";
import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import { Button} from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginInput = (props) => {

    const clientId = '912605203605-is327fjb8cqcrqcfl2jckqn1pvl6dnsc.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const action = props.action;
    const actionTitle = props.actionTitle;

    const onSuccess = (res) => {
        const googleProfile = res.profileObj
        const password = googleProfile.givenName[0].toUpperCase() + googleProfile.googleId + googleProfile.familyName.substr(-1).toLowerCase()
        props.logInAction(googleProfile.email,password,googleProfile.imageUrl)
        console.log(res)
    };

    const onFailure = (err) => {
        console.log('Google Sign in failed:', err);
    };
    return (
        <>
        <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            onAutoLoadFinished={true}
            autoLoad={false}
            isSignedIn={true}
            render={renderProps => (
                <Button onClick={renderProps.onClick} mr={1} size='sm' leftIcon={<FcGoogle/>} fontWeight='normal' shadow='md' w={action === "signUp" ? 'full' : ''}>{actionTitle}</Button>
            )}
        />
        </>
    );
}