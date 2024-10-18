import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import axios from "axios";
import { columns, Usuario } from "./columns";
// import { Form } from "@/components/ui/form";
import UsuarioForm from "./form";

export default function DemoPage() {
  const [data, setData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); //editar
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null); // Usuário atual para edição

  // (Read)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.API_BASEURL}/memories`
        );
        setData(result.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // (Create)
  const createUser = async (newUser: Usuario) => {
    try {
      const response = await axios.post(
        `${import.meta.env.API_BASEURL}/memories`,
        newUser
      );
      setData([...data, response.data]);
      console.log(data);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  //(Update)
  const updateUser = async (updatedUser: Usuario) => {
    try {
      const response = await axios.put(
        `${import.meta.env.API_BASEURL}/memories`,
        updatedUser
      );
      setData(
        data.map((user) => (user.id === updatedUser.id ? response.data : user))
      );
      setIsEditing(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  //(Delete)
  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.API_BASEURL}/memories`);
      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  // Iniciar a edição de um usuário
  const handleEdit = (user: Usuario) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">CRUD de Usuários</h1>

      {/* Formulário de criação ou edição */}
      <UsuarioForm
        onSubmit={isEditing ? updateUser : createUser}
        currentUser={currentUser}
        isEditing={isEditing}
      />

      {/* Tabela de dados */}
      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />
    </div>
  );
}
