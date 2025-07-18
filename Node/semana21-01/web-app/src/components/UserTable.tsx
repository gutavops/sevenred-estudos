import { type User } from "../types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table className="w-full table-auto border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Nome</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">idade</th>
          <th className="p-2 border">Telefone</th>
          <th className="p-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.idade}</td>
            <td className="p-2 border">{user.telefone}</td>
            <td className="p-2 border space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 cursor-pointer" onClick={() => onEdit(user)}>
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer" onClick={() => onDelete(user.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
