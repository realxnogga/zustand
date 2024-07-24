
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Page404 = () => {

    return (
        <section className="bg-gray-100 h-screen w-screen flex flex-col items-center justify-center relative">
            <h2 className="text-gray-700 text-[6rem] font-semibold">404</h2>
            <p className="text-gray-700">Page not found</p>
            <NavLink to={'/'}>
                <button className="bg-blue-500 mt-10 py-2 px-8 text-xl text-white rounded-[10rem] flex items-center gap-x-1 hover:gap-x-4 duration-200"><FaArrowLeft />Back</button>
            </NavLink>
        </section>
    )
}