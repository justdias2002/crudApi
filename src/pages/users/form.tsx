import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface Usuario {
  id?: string;
  name: string;
  email: string;
}

export interface UsuarioFormProps {
  onSubmit: (user: Usuario) => Promise<void>;
  currentUser: Usuario | null;
  isEditing: boolean;
}

export default function UsuarioForm({
  onSubmit,
  currentUser,
  isEditing,
}: UsuarioFormProps) {
  // Usando o hook `useForm` para gerenciar o formulário
  const { register, handleSubmit, reset } = useForm<Usuario>();

  // Atualiza os campos do formulário se estiver editando
  useEffect(() => {
    if (isEditing && currentUser) {
      reset(currentUser); // Preenche o formulário com os dados do usuário atual
    } else {
      reset(); // Reseta o formulário para valores vazios
    }
  }, [isEditing, currentUser, reset]);

  // Função de envio de formulário
  const onSubmitForm: SubmitHandler<Usuario> = (data) => {
    onSubmit(data);
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

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEditing ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}
