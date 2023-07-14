import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import "../../public/style/login.css";

const Signin = () => {
    const navigate = useNavigate();

    const reponseGoogle = (response) => {
        const details = jwt_decode(response.credential);
        console.log(details);

        localStorage.setItem('user', JSON.stringify(details));

        const { name, sub, picture } = details;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }

        console.log(doc);
        navigate('/');
    }

    return (
        <div className='box'>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <div className="form">
                        <div className="inputBox">
                            <input type="text" required />
                            <i>Username</i>
                        </div>
                        <div className="inputBox">
                            <input type="password" required />
                            <i>Password</i>
                        </div>
                        <div className="inputBox">
                            <input type="password" required />
                            <i>Comfirm Password</i>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Submit" />
                        </div>
                        <div className='googleLogin'>
                            <GoogleOAuthProvider clientId="198986909043-pempbbiro201sr7gviauqr3cg16is8a0.apps.googleusercontent.com">
                                <GoogleLogin
                                    clientId="198986909043-pempbbiro201sr7gviauqr3cg16is8a0.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={reponseGoogle}
                                    onFailure={(err) => console.log(err)}
                                    cookiePolicy={"single_host_origin"}
                                    responseType="code,token"
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signin;