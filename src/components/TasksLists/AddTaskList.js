import React, { useState } from 'react';
import Header from '../Elements/Header';

const AddTaskList = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3003/taskslists', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({title, description})
        });
        if(response.ok){
            await response.json();
            window.location.href = '/liste';
        }else{
            console.log('une erreur');
        };
    };
    return (
        <div>
            <Header/>
            <main>
                <h2>formulaire d'ajout de liste de tâches</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="titre"/>
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="description"/>
                    <input type="submit" value='Envoyer'/>
                </form>
            </main>
           
        </div>
    );
};

export default AddTaskList;