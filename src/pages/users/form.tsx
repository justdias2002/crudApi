import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface Usuario {
  id?: string;
  name: string;
  email: string;
}

interface UsuarioFormProps {
  onCreate: (user: Usuario) => Promise<void>; 
  onEdit: (user: Usuario) => Promise<void>;  
  currentUser: Usuario | null;               
  isEditing: boolean;                        
}

export default function UsuarioForm({
  onCreate,
  onEdit,
  currentUser,
  isEditing,
}: UsuarioFormProps) {
  const { register, handleSubmit, reset } = useForm<Usuario>();

  
  useEffect(() => {
    if (isEditing && currentUser) {
      reset(currentUser);
    } else {
      reset(); 
    }
  }, [isEditing, currentUser, reset]);

  // Função de envio de formulário
  const onSubmitForm: SubmitHandler<Usuario> = (data) => {
    if (isEditing) {
      onEdit({ ...data, id: currentUser?.id }); 
    } else {
      onCreate(data); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Nome:</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border px-3 py-2"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
}