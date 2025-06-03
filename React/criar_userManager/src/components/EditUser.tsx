import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { NotePencilIcon } from "@phosphor-icons/react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface EditUserProps {
  user: User;
  getUser: () => Promise<void>;
}

export function EditUser({ user, getUser }: EditUserProps) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);



  async function updateUser() {
    const updatedUser = { name, email, phone };

    try {
      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Erro ao atualizar usuário");

      handleClose();
      await getUser();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  return (
    <>
      <button className="editButton" onClick={handleShow}>
        <NotePencilIcon size={24} />
      </button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite o telefone"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}