import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import  { authService }  from 'fbase';


function App() {

  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj(user);
      }
      setInit(true);
    })
  }, []);
  return (
    <>
      
      {init? <AppRouter isLoggedIn = {Boolean(userObj)} userObj={userObj} /> : 'Initilizing...'}
      <footer>&copy; {new Date().getFullYear()} fb-twitter</footer>
    </>
  );
}

export default App;
