
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { useRegister } from "../store/registerstore";

export const GeneratePassword = () => {

    const [toggle, setToggle] = useState(false);

    // const [input, setInput] = useState();
    const { getGeneratedPassword } = useRegister();

    const [passwordLength, setPasswordLength] = useState(8);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);

    const GeneratePasswordfunc = () => {
        let charset = "";
        let newPassword = "";

        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        //  setInput(newPassword);  
        // ------------------------------------------
        getGeneratedPassword(newPassword);

    };

    return (
        <section className="relative w-full">
            <button className="h-fit w-fit flex items-center text-gray-700">Create Password
                <IoMdArrowDropup onClick={() => { setToggle(!toggle) }} className={`${toggle ? 'rotate-180 duration-200' : 'rotate-0 duration-200'} text-2xl`} />
            </button>

            <div className={`${toggle ? 'h-[9.9rem] p-2' : 'h-0'} absolute duration-200 bg-gray-200 shadow-lg shadow-gray-500 w-full flex items-end justify-between overflow-hidden z-10`}>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex items-center gap-x-2 text-sm'>
                        <input
                            type="number"
                            min="8"
                            max="32"
                            value={passwordLength}
                            onChange={(e) => { setPasswordLength(e.target.value); }}
                            className='h-[1.5rem] w-[5rem] border border-black rounded-sm outline-none p-2 text-md'
                        />
                        <p>Length</p>
                    </div>

                    <div className='flex items-center gap-x-2 text-sm'>
                        <input
                            type="checkbox"
                            checked={useSymbols}
                            onChange={() => setUseSymbols(!useSymbols)} />
                        <p>Include Symbols</p>
                    </div>


                    <div className='flex items-center gap-x-2 text-sm'>
                        <input
                            type="checkbox"
                            checked={useNumbers}
                            onChange={() => { setUseNumbers(!useNumbers); }} />
                        <p>Include Numbers</p>
                    </div>

                    <div className='flex items-center gap-x-2 text-sm'>
                        <input
                            type="checkbox"
                            checked={useUpperCase}
                            onChange={() => { setUseUpperCase(!useUpperCase); }} />
                        <p>Include Uppercase</p>
                    </div>

                    <div className='flex items-center gap-x-2 text-sm'>
                        <input
                            type="checkbox"
                            checked={useLowerCase}
                            onChange={() => { setUseLowerCase(!useLowerCase); }} />
                        <p>Include Lowercase</p>
                    </div>
                </div>

                <button onClick={() => { GeneratePasswordfunc(); setToggle(false); }} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-fit px-3 py-2 rounded-md text-white text-sm">
                    Generate
                </button>


            </div>
        </section>
    )
}