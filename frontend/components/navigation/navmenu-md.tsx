"use client";

import * as React from "react";
import Link from "next/link";
import { BsNewspaper } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbInfoSquare } from "react-icons/tb";
import { MdOutlineContactPhone } from "react-icons/md";

import { cn } from "@/lib/utils";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NavMenu from "./navmenu";
import { usePathname } from "next/navigation";

export function NavMenuMd() {
	const path = usePathname();
	const isPrintRoute = /^\/print(\/.*)?$/.test(path);
	const isUserDashboard = /^\/dashboard(\/.*)?$/.test(path);
	const isAdminDashboard = /^\/admin\/dashboard(\/.*)?$/.test(path);
	return (
		<NavigationMenu>
			<NavigationMenuList className="text-green-800">
				<NavigationMenuItem className="block lg:hidden">
					<NavMenu />
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden lg:block">
					<Link href="/news" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<BsNewspaper className="mr-1" />
							သတင်းများ
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden lg:block">
					<Link href="/services" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<MdMiscellaneousServices className="mr-1" />
							ဝန်ဆောင်မှုများ
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden lg:block">
					<Link href="/team" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<RiTeamFill className="mr-1" />
							အသင်းအဖွဲ့
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden lg:block">
					<Link href="/about" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<TbInfoSquare className="mr-1" />
							အကြောင်း
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden lg:block">
					<Link href="/contact" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<MdOutlineContactPhone className="mr-1" />
							ဆက်သွယ်ရန်
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-gray-700 hover:text-gray-950">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
