'use client'

import { useMemo } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { CarritoIcon } from '../../icons/CarritoIcon'

const NavBarRegalos = () => {
    const pathname = usePathname()
    const router = useRouter()
    const isLogin = useMemo(() => pathname === '/login', [pathname])

    const logout = (): void => {
        localStorage.clear()
        router.push('/login')
    }

    const navLinks = [
        { href: "/desayunos", label: "Desayunos" },
        { href: "/peluches", label: "Regalos" },
        { href: "/globos", label: "Globos" },
        { href: "/pasteleria", label: "Pasteleria" },
        { href: "/flores", label: "Flores" },
        { href: "/ocasiones", label: "Ocasiones" }
    ]

    return (
        <>
            {!isLogin && (
                <Navbar>
                    <NavbarBrand>
                        <Link href="./">
                            <Image
                                src='/images/logoregalo.jpeg'
                                alt='Intranet'
                                width={59}
                                height={50}
                            />
                            <p>Gift Shop</p>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        {navLinks.map((link) => (
                            <NavbarItem key={link.href} isActive={pathname === link.href}>
                                <Link
                                    href={link.href}
                                    color={pathname === link.href ? "primary" : "foreground"}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            </NavbarItem>
                        ))}
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <Link color="foreground" href="/carrito">
                            <Button isIconOnly aria-label="carrito" className='bg-transparent'>
                                <CarritoIcon />
                            </Button>
                        </Link>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="#" variant="flat" onPress={logout}>
                                Log out
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            )}
        </>
    )
}

export default NavBarRegalos