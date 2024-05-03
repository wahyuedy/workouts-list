import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    logout();
    setOpen(false)
  };
  return (
    <div className="md:navbar sticky top-0 z-50 bg-[#00215E] text-neutral-content no-animation mb-5 md:px-[200px] md:justify-between">
      <div className="">
        <Link to="/">
          <button className="btn btn-ghost text-lg md:text-xl text-[#FFC55A]">Home</button>
        </Link>
        <Link to="/add">
          <button className="btn btn-ghost text-lg md:text-xl text-[#FFC55A]">Add New</button>
        </Link>
      </div>
      <div onClick={() => setOpen(!open)}>
        {open ? <IoMdClose className="text-[27px] text-[#FFC55A] absolute right-8 top-3 cursor-pointer md:hidden" /> : <RxHamburgerMenu className="text-2xl text-[#FFC55A] absolute right-8 top-3 cursor-pointer md:hidden" />}
      </div>
      {user && (
        <div
          className={`md:flex md:items-center md:p-0 pb-4 absolute md:static bg-[#00215E] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-5 border-none transition-all duration-500 ease-in-out md:pt-0 pt-2 ${
            open ? `top-11 opacity-100` : `top-[-490px] opacity-0`
          } md:opacity-100`}
        >
          <h1 className="text-white">{user.email}</h1>
          <button onClick={handleClick} className="md:mt-0 mt-3 btn md:btn-ghost btn-sm text-lg md:text-xl text-[#00215E] md:text-[#FFC55A] bg-[#FFC55A] hover:bg-black hover:text-white hover:border-[#FFC55A] md:hover:btn-ghost md:hover:text-[#FFC55A]">
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div
          className={`md:flex md:items-center md:p-0 pb-4 absolute md:static bg-[#00215E] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-4 border-none transition-all duration-500 ease-in-out ${
            open ? `top-11 opacity-100` : `top-[-490px] opacity-0`
          } md:opacity-100`}
        >
          <div className="md:mb-0 mb-3">
            <Link to="/login">
              <button onClick={() => setOpen(false)} className="md:mt-0 mt-3 btn md:btn-ghost btn-sm text-lg md:text-xl text-[#00215E] md:text-[#FFC55A] bg-[#FFC55A] hover:bg-black hover:text-white hover:border-[#FFC55A] md:hover:btn-ghost md:hover:text-[#FFC55A]">Login</button>
            </Link>
          </div>
          <div className="md:my-0 my-2 ">
            <Link to="/signup">
              <button onClick={() => setOpen(false)} className="btn md:border-none border-[#FFC55A] md:btn-md btn-sm btn-ghost text-lg md:text-xl text-[#FFC55A] md:hover:border-none hover:border-black md:hover:text-[#FFC55A] hover:text-white">Signup</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
