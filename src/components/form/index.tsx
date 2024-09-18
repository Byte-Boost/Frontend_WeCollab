import './form.css'
function Form(){
    return(
        <section className='form'>
            <form action="">
                <h1>LOGIN</h1>


                <div className="coolinput">
                    <label htmlFor="input" className="text">CPF:</label>
                    <input type="text"  name="input" className="input"/>
                    <br />
                    <label htmlFor="input" className="text">Password</label>
                    <input type="password"  name="input" className="input"/>
                </div>  

            
                {/* <label className="text">Name:</label>
                "<input 
                type="text" 
                name="cpf"
                id="cpf"
                placeholder="123.456.789-00"
                />
               <label  className="text">Name:</label>
                <input 
                type="password" 
                name="password"
                id="cpf"
                placeholder="####"
                /> */}
            
                <br />
                <button id='login'>LOGAR</button>
                <br />
                <button id='re-login'>RECUPERAR LOGIN</button>
            </form>
        </section>
    )
}

export default Form;