"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Usuario = {
  id: string,
  cover: string,
  expecpt: string
  // email: string
}

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "cover",
    header: "cover",
  },
  {
    accessorKey: "expecpt",
    header: "expecpt",
  },
]
