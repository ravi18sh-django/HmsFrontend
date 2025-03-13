import React, { useState, useEffect, useMemo } from "react";
import { fetchData, deleteData } from "../api/HttpClient";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreatePatient from "./PatientCreate";

function PatientsList() {
    const [patients, setPatients] = useState([]);
    const [editContent, setEditContent] = useState(null); // Fix: Initialize as null
    

    const getPatients = async () => {
        try {
            const res = await fetchData("/api/patients");
            if (res.isSuccess) {
                setPatients(res.data);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        getPatients();
    }, []);


    useEffect(() => {
        getPatients();
    }, [editContent]);


    const deletePatient = async (id) => {
        try {
            const res = await deleteData(`/api/patients/${id}`);
            if (res.isSuccess) {
                setPatients((prevPatients) => prevPatients.filter(patient => patient._id !== id));
            }
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    const columns = useMemo(
        () => [
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => (
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setEditContent(row.original)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => deletePatient(row.original._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ),
            },
            { header: "Name", accessorKey: "name" },
            { header: "Age", accessorKey: "age" },
            { header: "Gender", accessorKey: "gender" },
            { header: "Contact", accessorKey: "contact" },
            { header: "Diagnosis", accessorKey: "diagnosis" },
            { 
                header: "Doctor", 
                accessorKey: "doctor", 
                cell: ({ row }) => row.original.doctor?.name || "N/A" 
            },
            { 
                header: "Clinic", 
                accessorKey: "clinic", 
                cell: ({ row }) => row.original.clinic?.name || "N/A" 
            },
        ],
        []
    );

    const table = useReactTable({
        data: patients,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div className="p-4 w-full">
            {editContent ? (
                <CreatePatient 
                editContent={editContent}
                setEditContent={setEditContent} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Patients List</h2>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="bg-gray-200 text-left">
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="border p-3">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border hover:bg-gray-100">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="border p-3">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prev
                        </button>
                        <span className="text-lg mx-2">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                        <button
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PatientsList;
