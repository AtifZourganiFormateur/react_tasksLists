import React, { useEffect, useState } from 'react';
import Header from './Elements/Header';
import Cookies from 'js-cookie';

const Test = () => {
    const [jsonResponse, setJsonResponse] = useState('');
    useEffect(() => {
        async function fetchTest() {
            const token = Cookies.get('token');
            console.log(token)
            try{
                const response = await fetch('http://localhost:3003/test', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                });
                const data = await response.json();
                setJsonResponse(data);
            }catch(e){
                console.log(e);
                setJsonResponse('erreur maggle');
            }
        }
        fetchTest();
    }, []);
    return (
        <div>
            <Header/>
            <h1>{jsonResponse}</h1>
        </div>
    );
};

export default Test;