import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit, Shield } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Guard";
  status: "Active" | "Inactive";
};

const initialUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Guard Post A", email: "guard1@example.com", role: "Guard", status: "Active" },
];

export default function UserManagement() {
  const [users] = useState<User[]>(initialUsers);

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("role", { 
        header: "Role",
        cell: (info) => (
             <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                {info.getValue()}
             </div>
        )
    }),
    columnHelper.accessor("status", { 
        header: "Status",
        cell: (info) => (
             <span className={`badge ${
                info.getValue() === "Active" ? "badge-success" : "badge-error"
            }`}>
                {info.getValue()}
            </span>
        )
    }),
    columnHelper.accessor("id", {
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
