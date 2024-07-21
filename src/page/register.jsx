
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { PreviewImage } from "../utils/previewimage";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GeneratePassword } from "../components/generatepassword";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { useRegister } from "../store/registerstore";
import { useFormNotification } from "../store/formnotificationstore";
import { FormNotification } from "../components/formnotification";

export const Register = () => {

    const navigate = useNavigate();

    const { insertRegisterData, isRegistered, clearIsRegistered } = useRegister(state => ({
        insertRegisterData: state.insertRegisterData,
        isRegistered: state.isRegistered,
        clearIsRegistered: state.clearIsRegistered,
    }));

    const getFormNoticationData = useFormNotification(state => state.getFormNoticationData);

    const [showPassword, setShowPassword] = useState(true)

    const [userRegisterCredential, setUserRegisterCredential] = useState({
        userregisterusername: '',
        userregisteremail: '',
        userregisterpassword: '',
    })

    const handleRegisterDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setUserRegisterCredential({ ...userRegisterCredential, [name]: value });
    };

    // for image
    const [userProfile, setUserProfile] = useState(null);
    const handleUserProfileUploadChange = (e) => { setUserProfile(e.target.files[0]) };

    const handleInsertUserData = () => {
        if (Object.values(userRegisterCredential).includes('') || (userProfile === null)) {
            getFormNoticationData('warning', 'all fields must not be empty');
        }
        else {
            insertRegisterData({ userRegisterCredential, userProfile });
        }
    }

    useEffect(() => {
        if (isRegistered === false) {
            navigate('/');
            clearIsRegistered();
        }
        if (isRegistered === true) {
            clearIsRegistered();   
            getFormNoticationData('error', 'registration failed');
        }
    }, [isRegistered]);

    const { generatedPassword, clearGeneratedPassword } = useRegister();

    useEffect(() => {
        setUserRegisterCredential(prevState => ({ ...prevState, userregisterpassword: generatedPassword }));
    }, [generatedPassword])

    const ClearInputFields = () => {
        setUserRegisterCredential({
            userregisterusername: '',
            userregisteremail: '',
            userregisterpassword: '',
        });
        clearGeneratedPassword();
    }

    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col items-center justify-center gap-y-2">

            <div className="w-[23rem]">
                < FormNotification />
            </div>

            {/* Login Form */}
            <div className="z-10 h-fit w-[23rem] max-w-[95%] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <h3 className="text-center text-3xl font-semibold">Register</h3>
                <div className="flex">
                    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                        <MdOutlinePerson className="text-3xl" />
                    </div>
                    <input
                        type="text"
                        name="userregisterusername"
                        value={userRegisterCredential.userregisterusername}
                        onChange={handleRegisterDataChangeFunc}
                        placeholder="enter username"
                        className="h-[2.5rem] grow border border-l-transparent border-gray-400 px-2 outline-none" />
                </div>

                <div className="flex">
                    <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                        <MdOutlineMail className="text-2xl" />
                    </div>
                    <input
                        type="email"
                        name="userregisteremail"
                        value={userRegisterCredential.userregisteremail}
                        onChange={handleRegisterDataChangeFunc}
                        placeholder="enter email"
                        className="h-[2.5rem] grow border-l-transparent border border-gray-400 px-2 outline-none" />
                </div>

                <div className="flex flex-col">

                    <div className="flex">
                        <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                            <MdOutlineLock className="text-2xl" />
                        </div>

                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            name="userregisterpassword"
                            value={userRegisterCredential.userregisterpassword}
                            onChange={handleRegisterDataChangeFunc}
                            placeholder="enter password"
                            className="h-[2.5rem] grow border-x-transparent border border-gray-400 px-2 outline-none" />

                        <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                            {showPassword ?
                                <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                                :
                                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                        </div>
                    </div>
                    <GeneratePassword />

                </div>

                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <PreviewImage targetFile={userProfile} />
                    </div>

                    <input
                        id="fileInput"
                        onChange={handleUserProfileUploadChange}
                        type="file"
                        className="border h-[2.5rem] p-1 border border-gray-400 " />

                </div>

                <button onClick={handleInsertUserData} className="w-full bg-blue-500 hover:bg-blue-400 rounded-[10rem] text-xl p-2 font-semibold text-white">Register</button>

                <p>Already have an account?
                    <span onClick={ClearInputFields} className="hover:text-blue-500 cursor-pointer underline">
                        <NavLink to={'/'}> Login</NavLink>
                    </span>
                </p>

            </div>
        </section>
    )
}