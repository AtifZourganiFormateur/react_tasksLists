import React, { useState } from 'react';
import Header from '../Elements/Header';

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [image, setImage] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleImageChange(event) {
        const file = event.target.files[0];
        const extension = file.name.split('.').pop();
        const timestamp = Date.now();
        const fileName = `${timestamp}.${extension}`;
        const renameFile = new File([file], fileName, {type: file.type});
        setImage(renameFile.name)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        try{
            const response = await fetch('http://localhost:3003/users', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({email, password, pseudo, image})
            })
            console.log(response)
            if(response.ok){
                await response.json();
                window.location.href = '/login';
            }
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div>
            <Header/>
            <main>
                {image}
                <h2>S'enregistrer</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='email' />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password'/>
                    <input className={password === confirmPassword ? 'inputTrue' : 'inputFalse'}  type="password" name="confirmPassword" value={confirmPassword} placeholder='confirm password' onChange={(e)=>{setConfirmPassword(e.target.value)}} required />
                    <input type="text" name="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required placeholder='pseudo'/>
                    <input type="file" accept='image/*' onChange={handleImageChange} />
                    <input type="submit"/>
                </form>

            </main>
        </div>
    );
};

export default AddUser;