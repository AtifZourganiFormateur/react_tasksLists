import React, { useEffect, useState } from 'react';
import Header from './Elements/Header';

const Test = () => {
    const [jsonResponse, setJsonResponse] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function fetchTest() {
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
                setJsonResponse('erreur maggle')
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