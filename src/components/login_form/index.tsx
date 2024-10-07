import './form.css'
import { useRef } from 'react';
import { failureAlert } from '@/scripts/utils/shared';
import { login } from '@/scripts/http-requests/endpoints';
import { useRouter } from 'next/router';
import CustomInput from '../custom_input';

function LoginForm(){
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    async function toLogin() {
        if(usernameRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            try {
                await login(username, password).then(function(response){
                        console.log('WEGOTHEERE')
                        router.push('/home');
                })
            } catch(error: any) {
                if(error.status === 401) {
                    failureAlert("Credenciais inválidas!", `${username} ${password}`, () => {})
                }  else{
                    failureAlert("Erro de Conexão", `${error}`, () => {})
                }
                console.log(error)
              
               

            //usernameRef.current?.value = "";
            //passwordRef.current?.value = "";
        }
    }    }

    return(
        <section className='form-container'>
            <div className='form'>
                <form  action="" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="" >🎩LOGIN</h1>
                        <div className="coolinput ">
                            <CustomInput type='text' name='Username' ref={usernameRef}/>
                            <br />
                            <CustomInput type='password' name='Password' ref={passwordRef}/>
                        </div>
                        <br />
                        <div>
                    
                    <button id='login' onClick={toLogin}>LOGAR</button>
                    <br />
                    {/* <button id='re-login'>RECUPERAR LOGIN</button> */}
                    </div>  
                </form>
            </div>
        </section>
    )
}

export default LoginForm;