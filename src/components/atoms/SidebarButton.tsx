import { Button, Icon, Image, Center, Tooltip, Box, ButtonProps, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as icons from 'react-icons/md'


type IconKeys = keyof typeof icons;

interface ISidebarButtonProps extends ButtonProps {
    isActive?: boolean,
    icon?: IconKeys,
    imageiconsrc?: string,
    label?: string,
    path?: string
}

export const SidebarButton = (props: ISidebarButtonProps) => {

    const path = usePathname();

    const IconComp = props.icon ? icons[props.icon] : null;


    const CustomBottom = props.imageiconsrc ?
        <Box
            minW={'40px'}
            minH={'40px'}
            borderRadius={'lg'}
            {...props}
            bgColor={props.isActive || props.path && props.path === path ? 'brand.400' : ''}
            _hover={{ bgColor: 'brand.400' }}>
            <Center paddingTop={'12px'} pb={'12px'}>
                <Image src={props.imageiconsrc} width={'22px'} height={'16px'} />
            </Center>
        </Box> :
        <IconButton
            aria-label=""
            borderRadius={'lg'}
            {...props}
            bgColor={props.isActive || props.path && props.path === path ? 'brand.400' : ''}
            icon={props.imageiconsrc ?
                <></> :
                <IconComp color='white' />}
            variant={'ghost'}
            _hover={{ bgColor: 'brand.400' }}>
        </IconButton>

    const CustomButtomT = (
        <>
            {props.label
                ?
                <Tooltip label={props.label}>{CustomBottom}</Tooltip>
                : CustomBottom}
        </>
    );

    return (<>
        {props.path
            ?
            <Link href={props.path as string}>{CustomButtomT}</Link>
            : CustomButtomT}
    </>)
}