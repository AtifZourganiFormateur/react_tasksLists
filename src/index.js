import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllTasksLists from './components/TasksLists/AllTasksLists';
import TasksListDetails from './components/TasksLists/TasksListDetails';
import AddTaskList from './components/TasksLists/AddTaskList';
import UpdateTasks from './components/Tasks/UpdateTasks';
import UpdateTasksLists from './components/TasksLists/UpdateTasksLists';
import AllError from './components/Error/AllError';
import AddUser from './components/User/AddUser';
import Login from './components/User/Login';
import Test from './components/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/test' element={<Test/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/liste' element={<AllTasksLists/>} />
        <Route path='/liste/:id' element={<TasksListDetails/>} />
        <Route path='/liste/new' element={<AddTaskList/>}/>
        <Route path='/liste/tache/:taskId/update' element={<UpdateTasks/>} />
        <Route path='/liste/:tasksListsId/update' element={<UpdateTasksLists/>} />
        <Route path='/register' element={<AddUser/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<AllError/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
