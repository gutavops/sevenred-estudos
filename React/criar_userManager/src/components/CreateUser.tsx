import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface CreateUserProps {
    getUser: () => Promise<void>;
}

export function CreateUser({ getUser }: CreateUserProps) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");

    async function createUser() {
        const user = {
            name: newUserName,
            email: newUserEmail,
            phone: newUserPhone,
        };

        try {
            const response = await fetch("http://localhost:8000/api/users", {
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
            handleClose();
            await getUser();
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    }

    return (
        <>
            <div className="newUser">
                <button onClick= { handleShow } > Novo Usuário </button>
            </div>

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
            </>
    )
}