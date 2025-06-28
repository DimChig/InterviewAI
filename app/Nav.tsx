import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navLinks = [
{ name: "Home", href: "/"},
{ name: "Create Profile", href: "/userContext" },
{ name: "Conversation", href: "/conversation" },
{ name: "Login", href: "/login" },
{ name: "Signup", href: "/signup" },
]

export default function Nav() {
return (
    <NavigationMenu>
        <NavigationMenuList>
            {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                    <Link href={link.href} passHref legacyBehavior>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {link.name}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
)
}