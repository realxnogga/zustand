import { useEffect, useState } from "react"
import { useFormNotification } from "../store/formnotificationstore"
import { MdErrorOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";

export const FormNotification = () => {

    const { notificationData, clearNotificationData } = useFormNotification(state => ({
        clearNotificationData: state.clearNotificationData,
        notificationData: state.notificationData,
    }));

    const [temp, setTemp] = useState({
        text: '',
        subtext: '',
        color: '',
        icon: ''
    });

    useEffect(() => {

        if (notificationData.alerttypes === 'warning') {
            setTemp({
                text: 'Warning',
                subtext: notificationData.text,
                color: 'yellow',
                icon: <IoIosWarning className="text-3xl text-yellow-500" />
            });
        }
        else if (notificationData.alerttypes === 'error') {
            setTemp({
                text: 'Error',
                subtext: notificationData.text,
                color: 'red',
                icon: <MdOutlineError className="text-xl" />
            });
        }

    }, [notificationData]);

    const notificationDataHasValue = Object.values(notificationData).every(item => item != '');

    if (notificationDataHasValue) {
        setTimeout(() => { clearNotificationData() }, 2000);

        return (
            <div className={`relative bg-white h-[3.3rem] w-full rounded-md flex items-start overflow-hidden`}>

                <div className={`bg-gradient-to-r from-${temp.color}-400 h-[3.3rem] w-[5rem] flex items-center justify-center`}>
                    {temp.icon}
                </div>

                <div className="h-full flex flex-col justify-center">
                    <h3 className="text-md text-gray-700 font-bold"> {temp.text} </h3>
                    <p className="text-xs text-gray-500"> {temp.subtext} </p>
                </div>

                <hr className={`border-none bg-${temp.color}-500 w-full h-[.2rem] absolute bottom-0`} />
            </div>
        )
    }

}
