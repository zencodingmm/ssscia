import React from "react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "../ui/menubar";
import Link from "next/link";
import { BsNewspaper } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbInfoSquare } from "react-icons/tb";
import { MdOutlineContactPhone } from "react-icons/md";

const NavMenu = () => {
	return (
		<Menubar className="lg:hidden">
			<MenubarMenu>
				<MenubarTrigger>
					<AiOutlineMenu className="h-4 w-4 text-green-800" />
				</MenubarTrigger>
				<MenubarContent
					side="bottom"
					className="mx-2 mt-3 bg-white/80 backdrop-blur-md p-10 space-y-2 text-green-800 "
				>
					<MenubarItem>
						<Link
							href={`/news`}
							className="w-full flex gap-2 items-center"
						>
							<BsNewspaper />
							သတင်းများ
						</Link>
					</MenubarItem>
					<MenubarItem>
						<Link
							href={`/team`}
							className="w-full flex gap-2 items-center"
						>
							<MdMiscellaneousServices />
							ဝန်ဆောင်မှုများ
						</Link>
					</MenubarItem>
					<MenubarItem>
						<Link
							href={`/team`}
							className="w-full flex gap-2 items-center"
						>
							<RiTeamFill />
							အသင်းအဖွဲ့
						</Link>
					</MenubarItem>
					<MenubarItem>
						<Link
							href={`/about`}
							className="w-full flex gap-2 items-center"
						>
							<TbInfoSquare />
							အကြောင်း
						</Link>
					</MenubarItem>
					<MenubarItem>
						<Link
							href={`/contact`}
							className="w-full flex gap-2 items-center"
						>
							<MdOutlineContactPhone />
							ဆက်သွယ်ရန်
						</Link>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default NavMenu;
