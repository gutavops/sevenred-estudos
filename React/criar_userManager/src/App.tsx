import { TrashIcon} from "@phosphor-icons/react";
import "./App.css";
import { useEffect, useState } from "react";
import {CreateUser} from "./components/CreateUser"
import { EditUser } from "./components/EditUser";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function App() {
  const [userList, setUserList] = useState<User[]>([])
  
  const [searchUser, setSearchUser] = useState("");
  
  async function getUser(){
    try {
      const response = await fetch('http://localhost:8000/api/users')
      const data = await response.json()
      setUserList(data)
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  async function deleteUser(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }
      
      await getUser()

    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="mainContainer">
      <div className="searchBar">
        <input type="text" placeholder="Buscar Usuário" value={searchUser} onChange={(e) => setSearchUser(e.target.value)}/>
        <CreateUser getUser={getUser} />
      </div>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>
                  <TrashIcon size={24} />
                </button>
                    <EditUser user={user} getUser={getUser} />
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="textTableEmpty">Cadastre um novo Usuário!</p>
        )}
      </div>
    </div>
  );
}

export default App;