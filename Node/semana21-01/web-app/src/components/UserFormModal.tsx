import { useEffect, useState } from "react";
import {type User } from "../types/User";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  editingUser?: User | null;
}

export function UserFormModal({ isOpen, onClose, onSave, editingUser }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState<number | null>(null);
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setIdade(editingUser.idade);
      setTelefone(editingUser.telefone);
    } else {
      setName("");
      setEmail("");
      setIdade(null);
      setTelefone("");
    }
  }, [editingUser]);

  const handleSubmit = () => {
    const user: User = {
      id: editingUser?.id ?? Date.now(),
      name,
      email,
      idade: idade ?? 0,
      telefone: telefone
    };
    onSave(user);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">{editingUser ? "Editar" : "Novo"} Usuário</h2>
        <div className="flex flex-col">
        <input
          className="w-full border p-2 mb-2"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-4"
          placeholder="Idade"
          value={idade ?? ""}
          type="number"
          onChange={(e) => setIdade(Number(e.target.value))}
        />
        <input
          className="w-full border p-2 mb-4"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
