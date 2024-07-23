import { useLogin } from "../store/loginstore"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTableData } from "../store/tabledata";
import { TablePaginaion } from "../components/tablepagination";
import { ShowTableEntries } from "../components/showtableentries";
import { Table } from "../components/table";
import { Toast } from "../components/toast";

export const Home = () => {

    const navigate = useNavigate();

    const { insertTableData, isTableDataInserted, clearIsTableDataInserted, getTableData } = useTableData((state) => ({
        insertTableData: state.insertTableData,
        isTableDataInserted: state.isTableDataInserted,
        clearIsTableDataInserted: state.clearIsTableDataInserted,
        getTableData: state.getTableData,
    }))

    const clearIsRouteProtected = useLogin(state => (state.clearIsRouteProtected));

    const [data, setData] = useState({ firstname: '', lastname: '' })

    const insertDataFunc = () => insertTableData({ data });

    useEffect(() => {
        if (isTableDataInserted === true) {
            setData({ firstname: '', lastname: '', });
            clearIsTableDataInserted();
            getTableData();

        }
        if (isTableDataInserted === false) {
            setData({ firstname: '', lastname: '', });
            clearIsTableDataInserted();
        }
    }, [isTableDataInserted])

    const handleSignoutFunc = () => {
        navigate('/');
        clearIsRouteProtected();
    }

    return (
        <section className="bg-gray-200 h-screen w-screen flex flex-col gap-y-10 items-center justify-center relative">

            <button onClick={handleSignoutFunc} className="absolute top-3 right-3 bg-blue-500 py-2 px-8 text-xl text-white rounded-[10rem] flex items-center gap-x-1 hover:gap-x-4 duration-200"><FaArrowLeft />Sign Out</button>

            <section className="h-[28rem] w-[50rem] flex flex-col justify-between items-center">
                <div>
                    <input
                        type="text"
                        name="firstname"
                        value={data.firstname}
                        onChange={(e) => { setData(prevState => ({ ...prevState, firstname: e.target.value })) }}
                        placeholder="Enter First Name"
                        className="h-[2.5rem] rounded-sm outline-none border border-gray-400 px-2"
                    />

                    <input
                        type="text"
                        name="lastname"
                        value={data.lastname}
                        onChange={(e) => { setData(prevState => ({ ...prevState, lastname: e.target.value })) }}
                        placeholder="Enter Last Name"
                        className="h-[2.5rem] rounded-sm outline-none border border-gray-400 px-2"
                    />

                    <button onClick={insertDataFunc} className="h-[2.5rem] w-[4rem] rounded-sm bg-green-500">Add</button>
                </div>

                {/* -------------------------------------------- */}
                <section className="w-full flex flex-col justify-between gap-y-3 items-center">
                    <div className="w-full">
                        <ShowTableEntries />
                    </div>

                    <div className="w-full h-[18.2rem] overflow-y-scroll ">
                        <Table />
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <TablePaginaion />
                    </div>
                </section>

            </section>

            {/* -------------------daisy ui alert----------------------- */}
            <Toast />

        </section>


    )
}