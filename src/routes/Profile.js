import react from 'react';
import { authService } from 'fbase';
import { history } from 'react-router-dom';


const Profile = () => {
    const onClickLogOut = () => {
        authService.signOut();
    };

    return (
        <>
            <button onClick={onClickLogOut}>Log Out</button>
        </>
    );
};

export default Profile;