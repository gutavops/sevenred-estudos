import { TrashIcon, NotePencilIcon } from "@phosphor-icons/react";
import "./App.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function App() {
  {/* Modal criar Usuário*/}
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  {/* Modal editar Usuário*/}
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserPhone, setEditUserPhone] = useState("");

  const [userList, setUserList] = useState<User[]>([])
  
  const [searchUser, setSearchUser] = useState("");

  async function createUser() {
    const user = {
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone,
    };

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPhone("");
      handleClose(); // fecha modal, se quiser
      await getUser();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

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

  function handleEditClick(user: User) {
    setEditUserId(user.id);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserPhone(user.phone);
    handleShowEdit(); // abre o modal
  }

  async function updateUser() {
    const updatedUser = {
      name: editUserName,
      email: editUserEmail,
      phone: editUserPhone,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/users/${editUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      handleCloseEdit()
      await getUser()
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

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
        <button onClick={handleShow}>Novo Usuário</button>
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
                <button className="editButton" onClick={() => handleEditClick(user)}>
                  <NotePencilIcon size={24} />
                </button>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        <p className="textTableEmpty">Cadastre um novo Usuário!</p>
      </div>

      {/* Modal criar Usuário */}
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newUserName">Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                id="newUserName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="newUserEmail">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                id="newUserEmail"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="newUserPhone">Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o telefone"
                id="newUserPhone"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={createUser}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal editar Usuário sem funcionalidade ainda */}
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="editUserName">Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                id="editUserName"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="editUserEmail">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                id="editUserEmail"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="editUserPhone">Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o telefone"
                id="editUserPhone"
                value={editUserPhone}
                onChange={(e) => setEditUserPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;