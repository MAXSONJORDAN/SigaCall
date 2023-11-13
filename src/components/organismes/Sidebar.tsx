'use client'
import { Box, Button, Center, HStack, VStack, Image, IconButton, Icon } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'
import { SidebarButton } from '../atoms/SidebarButton';
import { useRouter, usePathname } from 'next/navigation';

export function Sidebar({ children }: any) {

    const path = usePathname();
    const router = useRouter();


    return (
            <HStack height={'100vh'} paddingY={4} bg={'gray.100'}>

                <VStack height={'100%'} spacing={5} bgColor={'purple.500'} padding={3} width={'60px'} ml={5} borderRadius={'2xl'}>
                    <Image src={'/img/logo-branca-v.png'} height={'74px'} width={'auto'} alt='logo' />
                    <VStack flex={1} justifyContent={'center'} spacing={5}>
                        <SidebarButton label='Inicio' path='/admin' icon={'MdHome'} />
                        {/* <SidebarButton label='Atalhos Alertas' path='/chamadas' imageiconsrc='/img/chamada-icon.png' /> */}
                        <SidebarButton label='Configurações' path='/admin/configs' icon={'MdSettings'} />
                    </VStack>
                    <SidebarButton icon={'MdLogout'} onClick={() => { alert("oi") }} />
                </VStack>

                <Box paddingLeft={4} height={'95vh'} width={'100%'}>
                    {children}
                </Box>
            </HStack>
    )
}
