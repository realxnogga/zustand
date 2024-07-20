
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useForgotPassword } from "../store/forgotpassword";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {

    const navigate = useNavigate();

    const { changePassword, email, isPasswordChange, clearIsPasswordChange } = useForgotPassword(state => ({
        changePassword: state.changePassword,
        email: state.email,
        isPasswordChange: state.isPasswordChange,
        clearIsPasswordChange: state.clearIsPasswordChange

    }));

    const [notification, setNotification] = useState({
        text: '',
        color: ''
    });

    const [changePasswordCredential, setChangePasswordCredential] = useState({
        token: '',
        password: '',
        confirmPassword: '',
    })

    const handleChangePasswordFunc = () => {
        if (changePasswordCredential.password != changePasswordCredential.confirmPassword) {
            setNotification({
                text: 'password mismatch',
                color: 'text-yellow-500'
            })
            setTimeout(() => { setNotification((state) => ({ ...state, text: '' })) }, 2000);
        }
        else {
            const changePasswordCredentialTemp = {
                email: email,
                password: changePasswordCredential.password,
                token: changePasswordCredential.token,
            }

            console.log(changePasswordCredentialTemp)
            changePassword({ changePasswordCredentialTemp });
        }
    };

    useEffect(() => {
        if (isPasswordChange === true) {
            navigate('/');
            clearIsPasswordChange();
        }
        if (isPasswordChange === false) {
            setNotification({
                text: 'wrong token',
                color: 'text-red-500'
            })
            setTimeout(() => { setNotification((state) => ({ ...state, text: '' })) }, 2000);
            clearIsPasswordChange();
        }

    }, [isPasswordChange]);

    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col gap-y-2 items-center justify-center">

            <p className={`${notification.color} text-xl`}>{notification.text}</p>

            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                <div className="flex flex-col">
                    <label>Enter Token<span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="token"
                        value={changePasswordCredential.token}
                        onChange={(e) => setChangePasswordCredential((state) => ({ ...state, token: e.target.value }))}
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Enter New Password<span className='text-red-500'>*</span></label>
                    <input
                        type="password"
                        name="password"
                        value={changePasswordCredential.password}
                        onChange={(e) => setChangePasswordCredential((state) => ({ ...state, password: e.target.value }))}
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Confirm New Password<span className='text-red-500'>*</span></label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={changePasswordCredential.confirmPassword}
                        onChange={(e) => setChangePasswordCredential((state) => ({ ...state, confirmPassword: e.target.value }))}
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>


                <button onClick={handleChangePasswordFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">change password</button>

                <div className="flex justify-center">
                    <p className="hover:text-blue-500 cursor-pointer underline">
                        <NavLink to={'/'}> Login</NavLink>
                    </p>
                </div>

            </div>

        </section>
    )
}

