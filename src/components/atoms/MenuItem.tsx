import { Button, Icon, Image, Center, Tooltip, Box, ButtonProps, IconButton, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as icons from 'react-icons/md'

type IconKeys = keyof typeof icons;

interface IMenuItem extends ButtonProps {
    href: string,
    icon?: IconKeys,
}

export const MenuItem = (props: IMenuItem) => {

    return <>
        <HStack>
            {props.icon ? <Icon as={icons[props.icon]}></Icon> : null}
            <Link href={props.href}>{props.children}</Link>
        </HStack>
    </>
}


