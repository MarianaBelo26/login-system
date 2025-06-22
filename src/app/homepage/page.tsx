"use client"

import { signOut, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import NavLinks from "./NavLinks"
import UserMenu from './UserMenu'

export const HomePage = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  const { data: session } = useSession()
  const [localUser, setLocalUser] = useState<{ name: string, email: string } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const userButtonRef = useRef<HTMLParagraphElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser))
    }
  }, [])

  const user = session?.user?.name ? { name: session.user.name } : localUser

  const toggleUserMenu = () => {
    if (!user) return
    if (window.innerWidth < 768) {
      router.push("/userpage")
    } else {
      setUserMenuOpen(!userMenuOpen)
    }
  }

  const logout = () => {
    setUserMenuOpen(false)
    setLocalUser(null)
    localStorage.removeItem("user")
    signOut()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuOpen &&
        menuRef.current &&
        userButtonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !userButtonRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  return (
    <nav className="w-full h-screen flex flex-col justify-center items-center bg-background-login-shop-pages">

      <NavLinks pathname={pathname} user={user} toggleUserMenu={toggleUserMenu} userButtonRef={userButtonRef}/>

      {userMenuOpen && <UserMenu ref={menuRef} logout={logout} />}

      <h1 className="text-2xl font-semibold text-default-text">
        Por: <br />
        Redirecionamento concluído com sucesso! 🎉
        <br />
        Você foi redirecionado para esta página após login teste.
        <br /><br />
        Eng: <br />
        Redirection completed successfully! 🎉
        <br />You have been redirected to this page after the login test.
      </h1>

    </nav>
  )
}

export default HomePage
