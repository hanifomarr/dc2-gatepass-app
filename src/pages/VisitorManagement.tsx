import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Eye } from "lucide-react";

type Visitor = {
  id: string;
  name: string;
  vehicleNumber: string;
  hostHouse: string;
  entryTime: string;
  exitTime: string | null;
  status: "Active" | "Completed";
};

const initialVisitors: Visitor[] = [
  { 
      id: "1", 
      name: "Mike Ross", 
      vehicleNumber: "WAA 1234", 
      hostHouse: "Block A - 101", 
      entryTime: "2023-10-27 10:00 AM", 
      exitTime: null, 
      status: "Active" 
  },
  { 
      id: "2", 
      name: "Harvey Specter", 
      vehicleNumber: "WBB 5678", 
      hostHouse: "Block B - 205", 
      entryTime: "2023-10-26 02:00 PM", 
      exitTime: "2023-10-26 04:00 PM", 
      status: "Completed" 
  },
];

export default function VisitorManagement() {
  const [visitors] = useState<Visitor[]>(initialVisitors);

  const columnHelper = createColumnHelper<Visitor>();
  const columns = [
    columnHelper.accessor("name", { header: "Visitor Name" }),
    columnHelper.accessor("vehicleNumber", { header: "Vehicle No." }),
    columnHelper.accessor("hostHouse", { header: "Host" }),
    columnHelper.accessor("entryTime", { header: "Entry Time" }),
    columnHelper.accessor("exitTime", { 
        header: "Exit Time",
        cell: (info) => info.getValue() || "-"
    }),
    columnHelper.accessor("status", { 
        header: "Status",
        cell: (info) => (
             <span className={`badge ${
                info.getValue() === "Active" ? "badge-success" : "badge-neutral"
            }`}>
                {info.getValue()}
            </span>
        )
    }),
    columnHelper.accessor("id", {
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: visitors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Visitor Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Pre-register Visitor
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
