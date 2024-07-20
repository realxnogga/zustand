

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFormDataFunc } from "../utils/helperformdatafunc";
import { HelperFunction } from "../utils/helperfunction";

export const useTableData = create(
    persist(
        (set, get) => ({

            isTableDataInserted: null,
            insertTableData: async ({data}) => {
                const formData = HelperFormDataFunc(data);
                HelperFunction('http://localhost/registration/server/tabledata.php?action=insertTableData', 'POST', formData, set, 'isTableDataInserted');
            },
            clearIsTableDataInserted: () => set({isTableDataInserted: null}),


            tableData: [],
            getTableData: async () => {
                HelperFunction('http://localhost/registration/server/tabledata.php?action=getTableData', 'GET', '', set, 'tableData');
            },

            returnedtTableDataFromPagination: [],
            getTableDataFromPagination: (items) => set({returnedtTableDataFromPagination: items}),

            tableEntries: 5,
            getTableEntries: (showEntries) => set({tableEntries: showEntries}),

        }),
        {
            name: 'tabledatastorage',
            getStorage: () => sessionStorage, 
        }
    ) //persist
); // create

