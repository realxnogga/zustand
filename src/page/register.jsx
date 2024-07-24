
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { PreviewImage } from "../utils/previewimage";
import { useNavigate } from "react-router-dom";
import { GeneratePassword } from "../components/generatepassword";
import { useRegister } from "../store/registerstore";
import { useFormNotification } from "../store/formnotificationstore";
import { FormNotification } from "../components/formnotification";
import { TextField, PasswordField, EmailField, FileField } from "../components/inputfield";

export const Register = () => {

    const navigate = useNavigate();

    const { insertRegisterData, isRegistered, clearIsRegistered } = useRegister(state => ({
        insertRegisterData: state.insertRegisterData,
        isRegistered: state.isRegistered,
        clearIsRegistered: state.clearIsRegistered,
    }));

    const getFormNoticationData = useFormNotification(state => state.getFormNoticationData);

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

    const ClearInputFields = () => {
        setUserRegisterCredential({
            userregisterusername: '',
            userregisteremail: '',
            userregisterpassword: '',
        });
        clearGeneratedPassword();
    }

    const { generatedPassword, clearGeneratedPassword } = useRegister();

    useEffect(() => {
        setUserRegisterCredential(prevState => ({ ...prevState, userregisterpassword: generatedPassword }));
    }, [generatedPassword])

    return (
        <section className="bg-blue-300 h-screen w-screen flex flex-col items-center justify-center gap-y-2">

            <div className="w-[23rem]">
                < FormNotification />
            </div>

            <div className="z-10 h-fit w-[23rem] max-w-[95%] bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col justify-center gap-y-5">
                <h3 className="text-center text-3xl font-semibold">Register</h3>

                <TextField
                    value={userRegisterCredential.userregisterusername}
                    onChange={handleRegisterDataChangeFunc}
                    name="userregisterusername"
                    placeholder="enter username"
                />

                <EmailField
                    value={userRegisterCredential.userregisteremail}
                    onChange={handleRegisterDataChangeFunc}
                    name="userregisteremail"
                    placeholder={'enter email'}
                />

                <div className="flex flex-col">
                    <PasswordField
                        value={userRegisterCredential.userregisterpassword}
                        onChange={handleRegisterDataChangeFunc}
                        name="userregisterpassword"
                        placeholder="enter password"
                    />
                    <GeneratePassword />
                </div>

                <FileField
                    id={'fileInput'}
                    onChange={handleUserProfileUploadChange}
                    previewImage={<PreviewImage targetFile={userProfile} />}
                />

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