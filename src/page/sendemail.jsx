
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../store/forgotpassword";

export const SendEmail = () => {

    const navigate = useNavigate();
    var [notification, setNotification] = useState({ text: '', bool: null });

    const [emailCredential, setEmailCredential] = useState({
        email: '',
        emailAppPassword: '',
    });

    const handleSendTokenFunc = () => sendEmail({ emailCredential });

    const { getEmail, sendEmail, isEmailSent, clearIsEmailSent } = useForgotPassword((state) => ({
        getEmail: state.getEmail,
        sendEmail: state.sendEmail,
        isEmailSent: state.isEmailSent,
        clearIsEmailSent: state.clearIsEmailSent,
    }))

    useEffect(() => {
        if (isEmailSent.bool === true) {
            setNotification({
                text: isEmailSent.message,
                bool: isEmailSent.bool,
            })
            setTimeout(() => { setNotification(state => ({ ...state, text: '' })) }, 2000);
            clearIsEmailSent();
            getEmail(emailCredential.email); // get email & put in store so it can be used anywhere
        }
        if (isEmailSent.bool === false) {
            setNotification({
                text: isEmailSent.message,
                bool: isEmailSent.bool,
            })
            setTimeout(() => { setNotification(state => ({ ...state, text: '' })) }, 2000);
            clearIsEmailSent();
        }

    }, [isEmailSent])

    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col gap-y-2 items-center justify-center">

            <p className={`${notification.bool === true ? 'text-green-500' : 'text-red-500'} text-xl`}>{notification.text}</p>

            <div className="z-10 h-fit w-[23rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">

                <div className="flex flex-col">
                    <label>Enter Email<span className='text-red-500'>*</span></label>
                    <input type="email"
                        value={emailCredential.email}
                        onChange={(e) => setEmailCredential(state => ({ ...state, email: e.target.value })) }
                        name="email"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <div className="flex flex-col">
                    <label>Enter Email's App Password<span className='text-red-500'>*</span></label>
                    <input type="text"
                        value={emailCredential.emailAppPassword}
                        onChange={(e) => setEmailCredential(state => ({ ...state, emailAppPassword: e.target.value })) }
                        name="emailAppPassword"
                        className="h-[2.5rem] outline-none rounded-sm border border-gray-400 px-2" />
                </div>

                <button onClick={handleSendTokenFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Send Token</button>

                <div className="flex justify-center">
                    <p className="hover:text-blue-500 cursor-pointer underline">
                        <NavLink to={'/'}> Login</NavLink>
                    </p>
                </div>

                {
                    notification.bool &&
                    <div className="shadow shadow-md shadow-gray-500 p-2 border border-t-2 bg-gray-100">
                        <p>We have sent the token to this email ({emailCredential.email}).
                            <span className="text-blue-500 underline cursor-pointer">
                                <NavLink to={'/changepassword'}>change password</NavLink>
                            </span></p>
                    </div>
                }

            </div>

        </section>
    )
}

