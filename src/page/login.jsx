import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useLogin } from "../store/loginstore";
import { useNavigate } from "react-router-dom";
import { useTableData } from "../store/tabledata";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormNotification } from "../store/formnotificationstore";
import { FormNotification } from "../components/formnotification";

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
    const getFormNoticationData = useFormNotification(state => (state.getFormNoticationData));

    const [showPassword, setShowPassword] = useState(true);

    const [loginCredential, setLoginCredential] = useState({
        username: '',
        password: ''
    });

    const handleUserLoginFunc = () => {
        if (loginCredential.username === '' || loginCredential.password === '') {
           getFormNoticationData('warning', 'all fields must not be empty');
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
            getFormNoticationData('error', 'login failed');
        }
    }, [returnedLoginData.islogin]);

   
    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col  items-center justify-center gap-y-2">

            <div className="w-[20rem]">
                 < FormNotification /> 
            </div>

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