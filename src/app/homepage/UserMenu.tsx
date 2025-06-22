"use client"

import Link from "next/link"
import { forwardRef } from "react"

type Props ={
    logout: () => void 
}

const UserMenu = forwardRef<HTMLDivElement, Props>(({logout}, ref) => {
  return (
    <div ref={ref} className=" flex flex-col items-center justify-center gap-3 w-[150px] h-[100px] border-[3px] border-button-login absolute right-3 top-[70px] z-50 rounded-[10px] shadow-md bg-background-login-shop-pages">
          <Link href={'/homepage'} className="hover:text-default-text w-[100%] h-[35px] text-center">
            <button type="button" className="cursor-pointer" onClick={logout}>Logout</button>
          </Link>
        </div>
  )
})

UserMenu.displayName = 'UserMenu'
export default UserMenu

