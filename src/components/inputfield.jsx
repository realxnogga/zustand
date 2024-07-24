
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

// for textfield
export const TextField = ({ icon, value, onChange, name, placeholder }) => {
    return (
        <div className="w-full flex">
            <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                <MdOutlinePerson className="text-3xl" />
            </div>
            <input
                type={'text'}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                className="h-[2.5rem] grow border border-l-transparent border-gray-400 px-2 outline-none" />
        </div>)
}

// for emailfield
export const EmailField = ({ value, onChange, name, placeholder }) => {
    return (
        <div className="w-full flex">
            <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                <MdOutlineMail className="text-3xl" />
            </div>
            <input
                type={'email'}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                className="h-[2.5rem] grow border border-l-transparent border-gray-400 px-2 outline-none" />
        </div>)
}

// for Filefield
export const FileField = ({ id, onChange, previewImage }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-end">
                {previewImage}
            </div>
            <input
                id={id}
                type={'file'}
                onChange={onChange}
                className="border h-[2.5rem] p-1 border border-gray-400 " />
        </div>)
}

// for password
export const PasswordField = ({ value, onChange, name, placeholder }) => {
    const [showPassword, setShowPassword] = useState(true);
    return (
        <div className="flex">
            <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                <MdOutlineLock className="text-2xl" />
            </div>
            <input
                type={`${showPassword ? 'text' : 'password'}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-[2.5rem] grow border-x-transparent border border-gray-400 px-2 outline-none" />

            <div className="h-[2.5rem] w-[2.5rem] flex items-center justify-center border border-gray-400">
                {showPassword ?
                    <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                    :
                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />}
            </div>
        </div>)
}