import { useTableData } from "../store/tabledata"

export const Table = () => {

    const returnedtTableDataFromPagination = useTableData(state => state.returnedtTableDataFromPagination);

    return (
        <table className="w-full h-fit">
            <tr className="bg-blue-400 sticky top-0">
                <th className="border font-semibold text-left p-[.6rem]">user no#</th>
                <th className="border font-semibold text-left p-[.6rem]">First Name</th>
                <th className="border font-semibold text-left p-[.6rem]">Last Name</th>
            </tr>
            {
                returnedtTableDataFromPagination.map((values) => (
                    <tr key={values.dataID} className="border border-gray-400">
                        <td className="p-3"> {values.dataID} </td>
                        <td className="p-3"> {values.firstname} </td>
                        <td className="p-3"> {values.lastname} </td>
                    </tr>
                ))
            }
        </table>
    )
}