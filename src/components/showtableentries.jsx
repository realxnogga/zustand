import { useEffect, useState } from "react";
import { useTableData } from "../store/tabledata";

export const ShowTableEntries = () => {

    const getTableEntries = useTableData(state => state.getTableEntries);

    const [showEntries, setShowEntries] = useState(5);

    useEffect(() => {
        getTableEntries(showEntries);
    }, [showEntries]);

    return (
        <p>
            show
            <span>
                <select
                    value={showEntries}
                    onChange={(e) => { setShowEntries(e.target.value) }}
                    name="showEntries"
                    id="showEntries"
                    className="outline-none">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </span>
            entries
        </p>
    )
}