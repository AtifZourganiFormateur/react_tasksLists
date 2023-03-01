import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Elements/Header';
import Cookies from 'js-cookie';

const UpdateTasksLists = () => {
    const [taskslists, setTaskslists] = useState({
        title: '',
        description: ''
    })
    const {tasksListsId} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasksLists = async () => {
            try{
                const token = Cookies.get('token');
                const response = await fetch(`http://localhost:3003/taskslists/${tasksListsId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                });
                const data = await response.json();
                setTaskslists(data);
                setLoading(false);
            }catch(erreur){
                console.error(erreur)
            }
        }
        fetchTasksLists()
    }, [tasksListsId]);

    async function handleSubmit(event){
        event.preventDefault(); 
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTaskslists({...taskslists, [name]: value})
    }

    if(loading){
        return <p>Chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                 
                <h2>Ajout d'une nouvelle liste de tâche.</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={taskslists.title} name='title' placeholder='Le titre de la liste' onChange={handleInputChange}/>
                    <input type="text" value={taskslists.description} name='desription' placeholder='votre description pour la liste de tache' onChange={handleInputChange}/>
                    <input type="submit" value={'soumettre le formulaire'}/>
                </form>
            </main>
        </div>
    );
};

export default UpdateTasksLists;