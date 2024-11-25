import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterPage(){

    const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
    const goHome = () =>{
        navigate('/');
    }

    async function logIn(username: string, password: string){

        try { 
            const userInfo = { username, password };
            const response = await fetch('http://localhost:5175/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo) //package into a JSON object
                
            });
            console.log(response)
            if (!response.ok){
                const data = await response.json()
                throw new Error(data.message || 'Failed to create user');
            }
            const data = await response.json();
            console.log('Login response:', data);
            localStorage.setItem('username', username);
   
            return data;
        } catch (error) {
            console.error('Error during authentication:', error);
            return { success: false, message: 'Error occured during authentication' };
        }

    }
    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        const result = await logIn(username, password);
        if (result.success){
            console.log('Login successful', result);
            navigate('/authorized')

        } else{
            console.error('Error logging in:', result.message);
        }
   }


    

    return(

        <div>
        <div className="registerForm" >
            <h2>Register Here</h2>
            <form className="flex bg-blue-400" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit" type="submit">Create User</button>
                    <button onClick={goHome}>Go Home</button>
                </div>
            </form>
        </div>
    
        </div>
    )
}