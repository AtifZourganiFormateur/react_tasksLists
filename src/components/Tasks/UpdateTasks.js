import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Elements/Header';

const UpdateTasks = () => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        amount: 0
    });
    const {taskId} = useParams();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTask = async () => {
            try{
                const response = await fetch(`http://localhost:3003/tasks/${taskId}`);
                const data = await response.json();
                setTask(data.data);
                setLoading(false);
            }catch(error){
                console.error(error)
            }
        }
        fetchTask();
    }, [taskId]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(name);
        console.log(value)
        setTask({...task, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    if(loading){
        return <p>en chargement</p>
    }

    return (
        <div>
            <Header/>
            <main onSubmit={handleSubmit}>
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