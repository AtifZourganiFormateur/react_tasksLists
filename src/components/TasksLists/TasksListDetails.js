import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Header from '../Elements/Header';

const TasksListDetails = () => {
    const [taskList, setTaskList] = useState(null);
    const {id} = useParams();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [taskListUpdated, setTaskListUpdated] = useState('');

    useEffect(() => {
        async function fetchTaskList()  {
            const response = await fetch(`http://localhost:3003/taskslists/${id}`);
            const data = await response.json();
            setTaskList(data);
        }
        fetchTaskList();
    }, [id, taskListUpdated]);

    async function handleDelete(){
        const response = await fetch(`http://localhost:3003/taskslists/${id}`,{
            method: 'DELETE'
        });
        await response.json();
            window.location.href= '/liste';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3003/taskslists/${id}/tasks`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, description, amount})
            })
            const data = await response.json();
            console.log(data)
            setName('');
            setDescription('');
            setAmount('');
            setTaskListUpdated(!taskListUpdated);
        }catch(error){
            console.error(error);
        }
    }

    async function handleDeleteTask(taskId){
        const response = await fetch(`http://localhost:3003/tasks/${taskId}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        console.log(data);
        setTaskListUpdated(!taskListUpdated);
    }

    if(!taskList){
        return <div>chargement!</div>
    }
    return (
        <div>
            <Header/>
            <main>
            <h1>Ma liste de tâche</h1>
            <section>
                    <h2>{taskList.title}</h2>
                    <p>{taskList.description}</p>
                    <NavLink to={'/'}>Modifier la liste {taskList.title}</NavLink>
                    <ul>
                        {taskList.Tasks.map((task) => {
                            return <li key={task.id}>
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <span>{task.amount}</span>
                                    <br/>
                                    <button onClick={()=>{handleDeleteTask(task.id)}}>delete tache {task.name}</button>
                                    <NavLink to={`/liste/tache/${task.id}/update`}>modifier la tâche</NavLink>
                                </li>
                        })}
                    </ul>
                    <button onClick={handleDelete}>delete</button>
            </section>
            <section>
                    <h2>Ajouter un tache a {taskList.title}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}} required placeholder='le nom de la tâche'/>
                        <textarea id='description' value={description} onChange={(e) => {setDescription(e.target.value)}} required placeholder='la description de la tache'/>
                        <input type="number" id='amount' value={amount} onChange={(e) => {setAmount(e.target.value)}} required placeholder='la quantité souhaité'/>
                        <input type="submit" value='Envoyer'/>
                    </form>
            </section>
            <NavLink to={'/liste'}>Les listes</NavLink>
            </main>
        </div>
    );
};

export default TasksListDetails;