import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Elements/Header';
import Cookies from 'js-cookie';

const UpdateTasks = () => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        amount: 0
    });
    const {taskId} = useParams();
    const [loading, setLoading] = useState(true)

    //recuperation du task a update
    useEffect(() => {
        const fetchTask = async () => {
            const token = Cookies.get('token');
            try{
                const response = await fetch(`http://localhost:3003/tasks/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                });
                const data = await response.json();
                setTask(data.data);
                setLoading(false);
            }catch(error){
                console.error(error)
            }
        }
        fetchTask();
    }, [taskId]);

    //ecoute des changement sur les inputs
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setTask({...task, [name]: value})
    }

    //Envoi au endpoint update des modifications
    const handleSubmit = async (event) => {
        event.preventDefault();
        //verification des data
        const response = await fetch(`http://localhost:3003/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({name: task.name, description: task.description, amount: task.amount})
        });
        if(response.ok){
            await response.json();
            window.location.href = `/liste/${task.articleId}`;
        }else{
            console.error('une erreur est survenu de manière aléatoire')
        }
    }
    //gestion des moments de chargement
    if(loading){
        return <p>en chargement</p>
    }

    return (
        <div>
            <Header/>
            <main onSubmit={handleSubmit}>
                {console.log(task.articleId)}
                <h2>Update de la tache {task.name}, dans la liste de tache avec l'id {taskId}</h2>
                <form >
                    <input type="text" name='name' value={task.name} onChange={handleInputChange} placeholder='le nom de la tache'/>
                    <br/>
                    <textarea name="description" value={task.description} onChange={handleInputChange} placeholder='la description de la tache' cols="30" rows="10"></textarea>
                    <br />
                    <input type="number" name='amount' value={task.amount} onChange={handleInputChange} placeholder='quatité'/>
                    <br />
                    <input type="submit" value="Soumettre les modifications" />
                </form>
            </main>
        </div>
    );
};

export default UpdateTasks;