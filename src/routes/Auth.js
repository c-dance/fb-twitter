import { firebaseInstance, authService } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        console.log(value);
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if (newAccount){
                //new account 
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else {
                //login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(err) {
            setError(err.message);
        }

    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async(event) => {
        const {target : { name }} = event;
        let provider;
        if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
    <div>
        <form onSubmit={onSubmit} >
            <input type="email" placeholder="Email" required value={email} name="email" onChange={onChange}/>
            <input type="password" placeholder="password" required value={password} name="password" onChange={onChange} />
            <input type="submit" value={newAccount? "create new Account" : "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount? "sign in" : "creat new accout"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
        </div>
    </div>
    );
};

export default Auth;