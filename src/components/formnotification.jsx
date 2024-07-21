import { useEffect, useState } from "react"
import { useFormNotification } from "../store/formnotificationstore"

export const FormNotification = () => {

    const { notificationData, clearNotificationData } = useFormNotification(state => ({
        clearNotificationData: state.clearNotificationData,
        notificationData: state.notificationData,
    }));

    const [temp, setTemp] = useState({ text: '', design: '' });

    useEffect(() => {

        if (notificationData.alerttypes === 'warning') {
            setTemp({
                text: notificationData.text,
                design: 'text-yellow-500 bg-yellow-100',
            });
        }
        else if (notificationData.alerttypes === 'error') {
            setTemp({
                text: notificationData.text,
                design: 'text-red-500 bg-red-100',

            });
        }

    }, [notificationData]);

    const notificationDataHasValue = Object.values(notificationData).every(item => item != '');

    if (notificationDataHasValue) {
        setTimeout(() => { clearNotificationData() }, 2000);
  
            return (
                <div className={`${temp.design} h-[3rem] w-full rounded-md flex items-center justify-center`}>
                    <p> {temp.text} </p>
                </div>
            )
    }

}