import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    return (
        <header>
            <nav>
                <ul>
                    <li className={location.pathname === '/' ? 'linkActivate' : ''}>
                        <NavLink to={'/'}>Home page</NavLink>
                    </li>
                    <li className={location.pathname === '/liste' ? 'linkActivate' : ''}>
                        <NavLink to={'/liste'}>Mes listes de tâches</NavLink>
                    </li>
                    <li className={location.pathname === '/liste/new' ? 'linkActivate' : ''}>
                        <NavLink to={'/liste/new'}>Ajouter une liste de tâches</NavLink>
                    </li>
                    <li className={location.pathname === '/register' ? 'linkActivate' : ''}>
                        <NavLink to={'/register'}>S'enregistrer</NavLink>
                    </li>
                    <li className={location.pathname === '/login' ? 'linkActivate' : ''}>
                        <NavLink to={'/login'}>Se Connecter</NavLink>
                    </li>
                    <li className={location.pathname === '/test' ? 'linkActivate' : ''}>
                        <NavLink to={'/test'}>Test</NavLink>
                    </li>
                </ul>
            </nav>
            <h1>
                site de gestion des listes de tâches et des tâches
            </h1>

        </header>
    );
};

export default Header;