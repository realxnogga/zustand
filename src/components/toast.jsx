import { useEffect } from "react"
import { useLogin } from "../store/loginstore"
import { useToast } from "../store/toaststore"

export const Toast = () => {
    const userData = useLogin(state => state.userData)

    const { second, setSecond } = useToast(state => ({
        second: state.second,
        setSecond: state.setSecond,
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
