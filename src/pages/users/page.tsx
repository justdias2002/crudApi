import { useState, useEffect } from "react";
import axios from "axios";
import UsuarioForm, { Usuario } from "./form";

export default function DemoPage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASEURL = import.meta.env.VITE_API_BASEURL;
  // const API_BASEURL = import.meta.env.VITE_API_BASEURL; por em produçao depois


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_BASEURL}`);
        setUsers(result.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [API_BASEURL]);

  
  const handleCreate = async (newUser: Usuario) => {
    try {
      const response = await axios.post(`${API_BASEURL}`, newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  // Função para editar um usuário existente
  const handleEdit = async (updatedUser: Usuario) => {
    try {
      if (!updatedUser.id) {
        console.error("ID do usuário é necessário para atualização");
        return;
      }
      const response = await axios.put(
        `${API_BASEURL}/${updatedUser.id}`,
        updatedUser
      );
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? response.data : user))
      );
      setIsEditing(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

 
  const setUserToEdit = (user: Usuario) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASEURL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <UsuarioForm
        onCreate={handleCreate}
        onEdit={handleEdit}
        currentUser={currentUser}
        isEditing={isEditing}
      />

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-400 text-white px-4 py-1 rounded mr-2"
                  onClick={() => setUserToEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-400 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(user.id!)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}