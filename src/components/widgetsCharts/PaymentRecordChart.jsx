import React from 'react'
import ReactApexChart from 'react-apexcharts';
import {inventorySalesChartOption} from '@/utils/chartsLogic/inventorySalesChartOption';  // Import updated chart option
import useCardTitleActions from '@/hooks/useCardTitleActions';
import CardHeader from '@/components/shared/CardHeader';
import CardLoader from '@/components/shared/CardLoader';

const InventorySalesChart = () => {
    const chartOptions = inventorySalesChartOption();  // Use the updated chart options
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }

    return (
        <div className="col-xxl-8">
            <div className={`card stretch stretch-full ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Inventory Sales"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body custom-card-action p-0">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartOptions.series}
                        height={377}
                    />
                </div>
                <div className="card-footer">
                    <div className="row g-4">
                        <Card bg_color={"bg-success"} title={"Sold"} price={"300"} progress={"75%"} />
                        <Card bg_color={"bg-info"} title={"In Stock"} price={"500"} progress={"90%"} />
                        <Card bg_color={"bg-danger"} title={"Out of Stock"} price={"50"} progress={"10%"} />
                        <Card bg_color={"bg-primary"} title={"Total Revenue"} price={"$10,500"} progress={"50%"} />
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    );
}

export default InventorySalesChart;

const Card = ({ title, price, progress, bg_color }) => {
    return (
        <div className="col-lg-3">
            <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">{title}</div>
                <h6 className="fw-bold text-dark">{title === "Total Revenue" ? `${price}` : price}</h6>
                <div className="progress mt-2 ht-3">
                    <div className={`progress-bar ${bg_color}`} role="progressbar" style={{ width: progress }}></div>
                </div>
            </div>
        </div>
    );
};
