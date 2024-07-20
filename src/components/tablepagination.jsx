
import { useTableData } from "../store/tabledata"
import { useEffect, useState } from "react";

export const TablePaginaion = () => {

    const { tableData, getTableDataFromPagination, tableEntries } = useTableData((state) => ({
        tableData: state.tableData,
        getTableDataFromPagination: state.getTableDataFromPagination,
        tableEntries: state.tableEntries,
    }));


    const temp = [...tableData];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = tableEntries;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const items = temp.reverse().slice(firstIndex, lastIndex);
    const numberOfPage = Math.ceil(temp.length / itemsPerPage);
    const buttons = [...Array(numberOfPage + 1).keys()].slice(1);

    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const changePage = (values) => setCurrentPage(values);

    const nextPage = () => currentPage < buttons.length && setCurrentPage(currentPage + 1);

    useEffect(() => {
        getTableDataFromPagination(items);
    }, [currentPage, tableData, tableEntries]);

    return (
        <>
            <p>{firstIndex + 1}-{currentPage === buttons.length ? tableData.length : lastIndex} of {tableData.length}</p>

            <nav className="border border-black rounded-md overflow-hidden">
                <ul className="flex">
                    <li onClick={prevPage} className="py-1 px-2 border border-r-gray-500 cursor-pointer"> prev </li>
                    {
                        buttons.map((values) => (
                            <li onClick={() => { changePage(values) }} className={`${currentPage === values && 'bg-blue-400'} hover:bg-blue-300 py-1 px-3 cursor-pointer`}>
                                {values}
                            </li>
                        ))
                    }
                    <li onClick={nextPage} className="py-1 px-2 border border-l-gray-500 cursor-pointer"> next </li>
                </ul>
            </nav>
        </>
    )
}