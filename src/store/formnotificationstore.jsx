

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormNotification = create(
    persist(
        (set) => ({

            notificationData: { alerttypes: '', text: '' },
            
            clearNotificationData: () => 
            set(state => ({notificationData: {...state.notificationData, alerttypes: '', text: ''}})),

            getFormNoticationData: (alerttypes, text) =>
            set(state => ({ notificationData: { ...state.notificationData, alerttypes: alerttypes, text: text } })
            ),

        }),

        {
            name: 'formnotificationstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create

