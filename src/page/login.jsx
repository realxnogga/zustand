import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useLogin } from "../store/loginstore";
import { useNavigate } from "react-router-dom";
import { useTableData } from "../store/tabledata";
import { useFormNotification } from "../store/formnotificationstore";
import { FormNotification } from "../components/formnotification";
import { TextField, PasswordField } from "../components/inputfield";

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

    const [loginCredential, setLoginCredential] = useState({
        username: '',
        password: ''
    });

    console.log(loginCredential)

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

                <TextField
                    value={loginCredential.username}
                    onChange={(e) => setLoginCredential(state => ({ ...state, username: e.target.value }))}
                    name={'username'}
                    placeholder={'enter username'}
                />

                <PasswordField
                    value={loginCredential.password}
                    onChange={(e) => setLoginCredential(state => ({ ...state, password: e.target.value }))}
                    name={'password'}
                    placeholder="enter password"
                />

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