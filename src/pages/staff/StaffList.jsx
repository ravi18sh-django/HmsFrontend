import React from 'react';
import CustomTable from '@/components/CustomTable';
import CustomersHeader from '@/components/customers/CustomersHeader';
import MyPageHeader from '@/components/shared/pageHeader/MyPageHeader';
import Footer from '@/components/shared/Footer';
import StaffService from '../../api/Staff/Staff';
import { useQuery } from '@tanstack/react-query';

// Fetch staff list (no changes needed here)
const fetchStaffList = async () => {
    const data = await StaffService.getStaffList();
    return data;
};

const StaffList = () => {
    // Use the object form of useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ['staffList'], 
        queryFn: fetchStaffList, 
    });

    
    const columns = ["Name","Email","Role" , "Phone","Type","Created At"]

   

    return (
        <>
            <MyPageHeader title={"Staff List"}>
                <CustomersHeader text={"Create Staff"} />
            </MyPageHeader>
            <div className='main-content'>
                <div className='row'>
                    {/* Pass fetched data to the table */}
                    <CustomTable data={data} isLoading={isLoading} error={error} columns={columns} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StaffList;
