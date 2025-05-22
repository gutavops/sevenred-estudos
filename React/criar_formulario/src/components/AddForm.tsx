import { useState } from 'react'
import '../App.css'
import { v4 as uuidv4 } from 'uuid';

export function AddForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')

    function handleSubmit(){
        const id=uuidv4()
        alert(`Nome: ${name}\nEmail: ${email}\nIdade: ${age}\nId: ${id}`)
    }
    return (
    <form className="formUser" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" value={name} onChange={name => setName(name.target.value)}/>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={email => setEmail(email.target.value)}/>

        <label htmlFor="age">Idade</label>
        <input type="number" id="age" value={age} onChange={age => setAge(age.target.value)}/><br />

        <button>Salvar</button>
    </form>
    )
}