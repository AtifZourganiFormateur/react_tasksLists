import React, { useState } from 'react';
import Header from '../Elements/Header';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //Cookies.remove('token');
            const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            if(response.ok){
                const data = await response.json();
                Cookies.set('token', data.token)
                const toto = Cookies.get('token');
                console.log(data.token)
                //window.location.href = '/liste';
            }
        }catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            <Header/>
            <main>
                <h2>Se connecter</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} required />
                    <input type="password" name="password" value={password} placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} required />
                    <input type="submit" />
                </form>
            </main>
            
        </div>
    );
};

export default Login;