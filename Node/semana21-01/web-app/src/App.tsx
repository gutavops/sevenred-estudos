import { useEffect, useState } from "react";
import { type User } from "./types/User";
import { UserFormModal } from "./components/UserFormModal";
import { UserTable } from "./components/UserTable";

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem("users")
      if (saved) {
        const parsedUsers = JSON.parse(saved)
        return parsedUsers
      }
      return []
    } catch (error) {
      return []
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newFormKey, setNewFormKey] = useState(Date.now());

  useEffect(() => {
    try {
      const usersToSave = JSON.stringify(users);
      localStorage.setItem("users", usersToSave);
    } catch (error) {
      console.error("App: Erro ao salvar usuários no Local Storage:", error);
    }
  }, [users])

  const handleSaveUser = (user: User) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      if (exists) {
        return prev.map((u) => (u.id === user.id ? user : u));
      }
      return [...prev, user];
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente excluir este usuário?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD de Usuários</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingUser(null);
          setNewFormKey(Date.now());
          setShowModal(true);
        }}
      >
        Novo Usuário
      </button>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserFormModal
        key={editingUser ? editingUser.id : newFormKey}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingUser(null)
        }}
        onSave={(user) => {
          handleSaveUser(user);
          setShowModal(false);
          setEditingUser(null); 
        }}
        editingUser={editingUser}
      />
    </div>
  );
}

export default App;
