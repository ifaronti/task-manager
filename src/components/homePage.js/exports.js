import { Link } from "react-router-dom";

export const loginLink = <Link to={'/login'}>
    <p className="flex items-center text-[white] cursor-pointer hover:bg-[white] hover:text-[#635FC7] w-[164px] h-12 bg-[#635FC7] rounded-3xl justify-center">
        <span>Login</span>
    </p></Link>

export const registerLink = <Link to={'/register'}>
    <p className="flex items-center text-[white] cursor-pointer hover:bg-[white] hover:text-[#635FC7] w-[164px] h-12 bg-[#635FC7] rounded-3xl justify-center">
        <span>Register</span>
    </p></Link>

export const heading = <h1 className="text-[2rem] md:px-[unset] sm:text-center sm:px-[1rem]">
        Manage Tasks For Short Or Long Term Projects And Daily Events
    </h1>

export const page = <section className="h-screen gap-4 w-full flex flex-col items-center justify-center relative bg-[linear-gradient(to right, #83a4d4, #b6fbff)]">
    {heading}
    <div role="presentation" className="flex md:flex-row sm:flex-col gap-4">
        {loginLink}
        {registerLink}
    </div>
</section>