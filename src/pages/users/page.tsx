import axios from 'axios';
import { useEffect, useState } from 'react';
import { Usuario, columns } from './columns';
import { DataTable } from './data-table';




async function getData(): Promise<Usuario[]> {
  try {
    const response = await axios.get('https://server-8cgs.onrender.com/memories');
    console.log('Dados recebidos:', response.data);
    return response.data.map((item: Usuario) => ({
      id: item.id,       
      email: item.email,   
      name: item.name, 
    }));
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return []; 
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
