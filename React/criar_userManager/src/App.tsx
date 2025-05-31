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

  const [userList, setUserList] = useState<User[]>([])
  
  
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
  return (
    <div className="mainContainer">
      <div className="searchBar">
        <input type="text" placeholder="Buscar Usuário" />
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
            {userList.map((user) => {
              return(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button>
                  <TrashIcon size={24} />
                </button>
                <button className="editButton" onClick={handleShowEdit}>
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="editUserEmail">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                id="editUserEmail"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="editUserPhone">Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o telefone"
                id="editUserPhone"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;