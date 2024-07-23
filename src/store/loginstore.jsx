
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFormDataFunc } from "../utils/helperformdatafunc";
import { HelperFunction } from "../utils/helperfunction";

export const useLogin = create(
    persist(
        (set) => ({        
               
            clearIsRouteProtected: () => set((state) => ({        
                returnedLoginData: { ...state.returnedLoginData, isrouteprotected: null }
            })),

            clearIsLogin: () => set((state) => ({        
                returnedLoginData: { ...state.returnedLoginData, islogin: null }
            })),

            returnedLoginData: { islogin: null, isrouteprotected: null },
            
            testLogin: async ({loginCredential}) => {
                const formData = HelperFormDataFunc(loginCredential);
                HelperFunction('http://localhost/registration/server/login.php?action=testLogin', 'POST', formData, set, 'returnedLoginData');
            },

            userData: {},
            getUserData: async (username) => {
                const formData = HelperFormDataFunc(username);
                HelperFunction('http://localhost/registration/server/login.php?action=getUserData', 'POST', formData, set, 'userData');
            },

        }),
        {
            name: 'loginstorage',
            getStorage: () => sessionStorage, 
        }

    ) //persist
); // create

