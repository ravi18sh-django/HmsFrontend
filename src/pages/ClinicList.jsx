import React, { useState, useEffect, useMemo } from "react";
import { fetchData, deleteData } from "../api/HttpClient";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateClinic from "./CreateClinic";

function ClinicList() {
    const [patients, setPatients] = useState([]);
    const [editContent, setEditContent] = useState(null); 
    const [loader, setLoader] = useState(true);
    

    const getPatients = async () => {
        try {
            const res = await fetchData("/api/clinics");
            if (res) {
                setPatients(res);
                setLoader(false)
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

    if (loader) {
                return (
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
        
                )
            }
            
    

    const deletePatient = async (id) => {
        setLoader(true)
        try {
            const res = await deleteData(`/api/clinics/${id}`);
            if (res) {
                setPatients((prevPatients) => prevPatients.filter(patient => patient._id !== id));
                setLoader(false)
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
            { header: "Address", accessorKey: "address" },
           
            { header: "Contact", accessorKey: "contact" },
           
            { 
                header: "No. Of Doctor", 
                accessorKey: "doctors", 
                cell: ({ row }) => row.original.doctor?.length || "N/A" 
            },
            { 
                header: "No. Of Patients", 
                accessorKey: "patients", 
                cell: ({ row }) => row.original.patients?.length || "N/A" 
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

    console.log(editContent)

    return (
        <div className="p-4 w-full">
            {editContent ? (
                <CreateClinic 
                editClinic={editContent}
                setEditContent={setEditContent} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Clinic List</h2>
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

export default ClinicList;
