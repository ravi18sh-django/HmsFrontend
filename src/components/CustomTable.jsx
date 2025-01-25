import React, { memo, useEffect, useState } from 'react'
import DataTable from '@/components/shared/table/DataTable';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiMoreVertical, FiPrinter, FiSend, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { customersTableData } from '@/utils/fackData/customersTableData';


const actions = [
    { label: "Edit", icon: <FiEdit3 /> },
    { type: "divider" },
    { label: "Delete", icon: <FiTrash2 />, },
];

const TableCell = memo(({ options, defaultSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <SelectDropdown
            options={options}
            defaultSelect={defaultSelect}
            selectedOption={selectedOption}
            onSelectOption={(option) => setSelectedOption(option)}
        />
    );
});



const CustomTable = ({
    columns,
    data, 
    isLoading, 
    error
}) => {


    data && console.log(data);

    columns && console.log(columns);
    

    return (
        <div>
            {isLoading && (<div>Loading...</div>)}
            <DataTable data={customersTableData} columns={columns} />
            {error && <div>{error.message}</div>}
        </div>
    )
}

export default CustomTable