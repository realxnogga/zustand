



import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useToast = create(
    persist(
        (set) => ({

            second: 0, 
            resetSecond: () => set({second: 0}), 
            setSecond: (value) => set({second: value}), 

        }),

        {
            name: 'toaststorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create

