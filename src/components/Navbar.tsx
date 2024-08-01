import { Link } from "@tanstack/react-router"


export const Navbar = () => {
    return (
        <div className="flex items-center px-8 bg-indigo-500 opacity-75 text-slate-50 justify-between">
            <div className="flex items-center">
            <Link to="/">
                <h1 className="font-medium font-corbel text-xs md:text-lg">ULASAN <span className="text-amber-500 font-extrabold">LIAR</span></h1>
            </Link>
            &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
            <h1 className="text-xs md:text-sm">Fitrah Tekno Solusindo</h1>
            </div>

            <div className="text-xs md:text-sm font-bold">
                <Link to="/about-us">About Us</Link>
            </div>
        </div>
    )
}