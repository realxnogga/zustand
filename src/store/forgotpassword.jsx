

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFormDataFunc } from "../utils/helperformdatafunc";
import { HelperFunction } from "../utils/helperfunction";

export const useForgotPassword = create(
    persist(
        (set) => ({
            email: '',
            getEmail: (value) => set({email: value}),

            isEmailSent: {bool: null, message: ''},
            sendEmail: async ({emailCredential}) => {
                const formData = HelperFormDataFunc(emailCredential);
                HelperFunction('http://localhost/registration/server/forgotpassword.php?action=sendEmail', 'POST', formData, set, 'isEmailSent')
            },
            clearIsEmailSent: () => set(state => ({isEmailSent: {...state.isEmailSent, bool: null}})),

            isPasswordChange: null,
            changePassword: ({changePasswordCredentialTemp}) => {
                const formData = HelperFormDataFunc(changePasswordCredentialTemp);
                HelperFunction('http://localhost/registration/server/forgotpassword.php?action=changePassword', 'POST', formData, set, 'isPasswordChange')
            },
            clearIsPasswordChange: () => set({isPasswordChange: null})

        }),
        {
            name: 'forgotpasswordstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create

