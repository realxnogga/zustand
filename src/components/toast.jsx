import { useEffect, useState } from "react"
import { useLogin } from "../store/loginstore"
import { useToast } from "../store/toaststore"

export const Toast = () => {
    const { userData, returnedLoginData } = useLogin(state => ({
        userData: state.userData,
        returnedLoginData: state.returnedLoginData,
    }))

    const { second, setSecond, resetSecond } = useToast(state => ({
        second: state.second,
        setSecond: state.setSecond,
        resetSecond: state.resetSecond,
    }))

    useEffect(() => {
        if (second < 2) {
            const timer = setTimeout(() => {
                setSecond(second + 1);
            }, 2000);

            // Clean up the timeout if the component unmounts or second changes
            return () => clearTimeout(timer);
        }
    }, [second]);

    console.log(second);

    if (second === 1) {
        return (
            <div className="toast">
                <div className="alert alert-info rounded-md ">
                    <span>Welcome back, master {userData.username}</span>
                </div>
            </div>
        )
    }
    else if (second === 2) {
        return null;
    }
}
