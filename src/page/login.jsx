import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useLogin } from "../store/loginstore";
import { useNavigate } from "react-router-dom";
import { useTableData } from "../store/tabledata";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export const Login = () => {

    const navigate = useNavigate();

    const { testLogin, getUserData, userData, clearIsLogin, returnedLoginData } = useLogin((state) => ({
        testLogin: state.testLogin,
        getUserData: state.getUserData,
        userData: state.userData,
        clearIsLogin: state.clearIsLogin,
        returnedLoginData: state.returnedLoginData,
    }));

    const getTableData = useTableData(state => (state.getTableData));

    const [notification, setNotification] = useState({
        show: null,
        text: '',
        color: '',
        bg: ''
    });

    const [showPassword, setShowPassword] = useState(true);

    const [loginCredential, setLoginCredential] = useState({
        username: '',
        password: ''
    });

    const handleUserLoginFunc = () => {
        if (loginCredential.username === '' || loginCredential.password === '') {
            setNotification({
                show: true,
                text: 'all fields must not be empty',
                color: 'text-yellow-500',
                bg: 'bg-yellow-100'
            })
            setTimeout(() => { setNotification(state => ({ ...state, show: false })) }, 2000);
        }
        else {
            testLogin({ loginCredential });
        }
    }

    useEffect(() => {
        if (returnedLoginData.islogin === true) {
            setLoginCredential({ username: '', password: '' });
            navigate('/home');
            getUserData(loginCredential.username);
            clearIsLogin();
            getTableData();
        }
        if (returnedLoginData.islogin === false) {
            setLoginCredential({ username: '', password: '' });
            clearIsLogin();
            setNotification({
                show: true,
                text: 'login failed',
                color: 'text-red-500',
                bg: 'bg-red-100'
            })
            setTimeout(() => { setNotification(state => ({ ...state, show: false })) }, 2000);
        }
    }, [returnedLoginData.islogin]);

    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col  items-center justify-center gap-y-2">

            {notification.show &&
             <div className={`${notification.bg} h-[3rem] w-[20rem] rounded-md flex items-center justify-center`}>
                <p className={`${notification.color} text-xl`}>{notification.text}</p>

             </div>
            }

            <div className="z-10 h-fit w-[20rem] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <h3 className="text-center text-3xl font-semibold">Login</h3>

                {/* username field */}
                <div className="flex">
                    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                        <MdOutlinePerson className="text-3xl" />
                    </div>
                    <input
                        type="text"
                        value={loginCredential.username}
                        onChange={(e) => setLoginCredential(state => ({ ...state, username: e.target.value }))}
                        name="username"
                        placeholder="enter username"
                        className="h-[2.5rem] grow border border-l-transparent border-gray-400 px-2 outline-none" />
                </div>
                {/* password field */}
                <div className="flex">
                    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                        <MdOutlineLock className="text-2xl" />
                    </div>

                    <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        name="password"
                        value={loginCredential.password}
                        onChange={(e) => setLoginCredential(state => ({ ...state, password: e.target.value }))}
                        placeholder="enter password"
                        className="h-[2.5rem] grow border-x-transparent border border-gray-400 px-2 outline-none" />

                    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                        {showPassword ?
                            <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                            :
                            <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                    </div>
                </div>

                <button onClick={handleUserLoginFunc} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Login</button>

                <div className="flex justify-center">
                    <p className="hover:text-blue-500 cursor-pointer">
                        <NavLink to={'/sendemail'}>forgot password?</NavLink>
                    </p>
                </div>

                <p>Don't have an account yet?
                    <span className="hover:text-blue-500 cursor-pointer underline">
                        <NavLink to={'/register'}> Register</NavLink>
                    </span>
                </p>

            </div>
        </section>
    )
}