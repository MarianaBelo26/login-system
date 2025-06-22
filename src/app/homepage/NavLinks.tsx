'use client'

import Link from "next/link"
import React from "react"

type Props ={
    pathname: string,
    user: { name?: string | null } | null,
    toggleUserMenu: () => void,
    userButtonRef: React.RefObject<HTMLParagraphElement | null>
}

export default function NavLinks({pathname, user, toggleUserMenu, userButtonRef}: Props){
    return(
        <ul className="absolute top-5 right-10 font-['josefin_Slab'] font-semibold text-[30px] md:text-[23px] lg:text-[40px] text-default-text cursor-pointer">
        <li className="relative group overflow-hidden">
          {user ? (<p ref={userButtonRef} className="active:opacity-50 transition-opacity" onClick={toggleUserMenu}>{user.name}</p>) :
            <Link href="/" className="active:opacity-50 transition-opacity">
              Login
            </Link>}
          <span
            className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${pathname === "/login" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
          ></span>
        </li>
      </ul>
    )
}