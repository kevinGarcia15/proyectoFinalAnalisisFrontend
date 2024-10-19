import React, {createContext, useState} from "react";

const AuthContext = createContext({
  userInfo: '',
  setUserInfo: user =>
    console.log(
      ` Did you forgot to add AuthContext on top of your app? ${user}`),
});

const AuthProvider = (props) =>{
    const {children} = props;
    const [userInfo, setUserInfo] = useState('');

    return(
        <AuthContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};