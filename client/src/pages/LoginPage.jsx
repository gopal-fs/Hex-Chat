import React, { useContext, useState } from 'react'
import assets from '../assests/assets'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [currState, setCurrState] = useState('Sign up');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const {login}=useContext(AuthContext)

    const onCreateUser = (e) => {
        e.preventDefault();
        if (currState === "Login"){
            setIsDataSubmitted(false);
            login('login',{email,password});
        }

        if (isDataSubmitted) {
            login('sign-up',{fullName,email,password,bio})
            setIsDataSubmitted(false);
            
        }

        if(currState==="Sign up" && !isDataSubmitted) setIsDataSubmitted(true)

        

    }

    const onStatusChnage = () => {
        setIsDataSubmitted(false);
        setCurrState("Login");
    }
    return (
        <div className="min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col transition-colors duration-300">
            <div>
                <img className='w-[min(60vw,450px)]' src="/logos.png" alt='logo' />
                <h1 className='text-[var(--text--primary)] text-center text-5xl max-md:text-2xl'>Hex Chat</h1>
            </div>
            
            <form onSubmit={onCreateUser} className='border p-8 flex flex-col gap-6 rounded-xl shadow-xl bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] w-[350px]'>
                <h2 className="font-medium text-2xl flex justify-between items-center">{currState}
                    {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt='arrow' className='w-5 cursor-pointer' />}
                </h2>
                {!isDataSubmitted ? (
                    <div className='flex flex-col gap-4'>{currState === "Sign up" && <input onChange={(e) => setFullName(e.target.value)} value={fullName} required type='text' placeholder='Full Name' className="p-3 border rounded-md 
                bg-[var(--bg-primary)] 
                border-[var(--border-medium)] 
                text-[var(--text-primary)] 
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    }

                        <input onChange={(e) => setEmail(e.target.value)} value={email} required type='email' placeholder='Enter Email Address' className="p-3 border rounded-md 
bg-[var(--bg-primary)] 
border-[var(--border-medium)] 
text-[var(--text-primary)] 
focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' required placeholder='Password' className="p-3 border rounded-md 
bg-[var(--bg-primary)] 
border-[var(--border-medium)] 
text-[var(--text-primary)] 
focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        /></div>
                ) : (
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} required placeholder="provide a short bio..." className="p-3 border rounded-md 
                bg-[var(--bg-primary)] 
                border-[var(--border-medium)] 
                text-[var(--text-primary)] 
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >

                    </textarea>
                )}

                <button type='submit' className="py-3 rounded-md cursor-pointer font-medium 
bg-[var(--btn-primary-bg)] 
text-[var(--btn-primary-text)] 
hover:bg-[var(--btn-primary-hover)] 
transition-all duration-200 cursor-pointer"
>{currState === "Login" ? 'Login Now' : 'Create Account'}</button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <input required type='checkbox' />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
                <div className="flex flex-col gap-2">
                    {currState === "Login" ? <p className='text-sm text-gray-600'>
                        Create An Account.
                        <span className="font-medium text-violet-500 cursor-pointer" onClick={() => setCurrState('Sign up')}>Click here</span>
                    </p> : <p className='text-sm text-gray-600'>
                        Already have an account.
                        <span className="font-medium text-violet-500 cursor-pointer" onClick={onStatusChnage} >Login here</span>
                    </p>}



                </div>
            </form>

        </div >
    )
}

export default LoginPage