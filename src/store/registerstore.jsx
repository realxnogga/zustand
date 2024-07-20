

import { create } from "zustand";
import { HelperFormDataFunc } from "../utils/helperformdatafunc";
import { HelperFunction } from "../utils/helperfunction";
import { persist } from "zustand/middleware";

export const useRegister = create(
    persist(
        (set) => ({

            isRegistered: null,

            clearIsRegistered: () => set({ isRegistered: null }),

            insertRegisterData: async ({ userRegisterCredential, userProfile }) => {
                const formData = HelperFormDataFunc(userRegisterCredential, userProfile);
                HelperFunction('http://localhost/registration/server/registration.php?action=insertRegisterData', 'POST', formData, set, 'isRegistered');
            },

            generatedPassword: '',

            clearGeneratedPassword: () => set({generatedPassword: ''}), 

            getGeneratedPassword: (value) => set({generatedPassword: value}),

        }),
        {
            name: 'registerstorage',
            getStorage: () => sessionStorage,
        }
    ) // persist
); // create