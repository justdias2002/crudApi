"use client";

import { ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



// columns.ts ou outro arquivo centralizado de tipos
export interface Usuario {
  id?: string;  // id é opcional, pois pode ser undefined durante a criação
  name: string;
  email: string;
}


export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "name",
    header: "name",
  },
];

export type UsuarioID = {
  name: string;
  email: string;
};

export const columnsId: ColumnDef<UsuarioID>[] = [

  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
];
