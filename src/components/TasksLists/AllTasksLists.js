import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Elements/Header';
import Cookies from 'js-cookie';


const AllTasksLists = () => {
    const [taskLists, setTaskLists] = useState([]);

    useEffect(() => {
        async function fetchTaskLists() {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:3003/taskslists',{
                headers: {
                    'Authorization': `Bearer ${token}`
                    }
            });
            const data = await response.json();
            setTaskLists(data);
        }
        fetchTaskLists();
    }, []);

    if(!taskLists){
        return <p>Chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                <h1>Mes listes de tâches</h1>
                <ul>
                    {taskLists.map((taskList) => {
                        return <li key={taskList.id}>
                                    <h2>{taskList.title}</h2>
                                    <p>{taskList.description}</p>
                                    <ul>
                                        {taskList.Tasks.map((task) => {
                                            return <li key={task.id}>
                                                    <h3>{task.name}</h3>
                                                    <p>{task.description}</p>
                                                </li>
                                        })}
                                    </ul>
                                    <NavLink to={`/liste/${taskList.id}`}>Voir détails</NavLink>
                                </li>
                    })}
                </ul>
            </main>
        </div>
    );
};

export default AllTasksLists;