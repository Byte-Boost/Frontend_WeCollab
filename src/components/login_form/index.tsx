import './form.css'

import { useRef } from 'react';
import { failureAlert } from '@/scripts/utils/shared';
import { login } from '@/scripts/http-requests/api';

function LoginForm(){
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    async function toLogin() {
        if(usernameRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            try {
                await login(username, password)
            } catch(error: any) {
                if(error.status === 401) {
                    failureAlert("Invalid credentials!", `${username} ${password}`, () => {})
                }
            }

            //usernameRef.current?.value = "";
            //passwordRef.current?.value = "";
        }
    }    

    return(
        <section className='form '>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <h1>LOGIN</h1>
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Username</label>
                        <input type="text"  name="input" className="input" ref={usernameRef}/>
                        <br />
                        <label htmlFor="input" className="text">Senha</label>
                        <input type="password"  name="input" className="input" ref={passwordRef}/>
                    </div>  
                <br />
                <button id='login' onClick={toLogin}>LOGAR</button>
                <br />
                <button id='re-login'>RECUPERAR LOGIN</button>
            </form>
        </section>
    )
}

export default LoginForm;