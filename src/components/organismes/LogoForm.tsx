'use client'
import { Box, Center } from '@chakra-ui/react'
import Image from 'next/image'

export function LogoForm() {
    return (
        <Box height={'100%'} flex={1} borderRightRadius={'xl'} display={['none','none','unset']}>
            <Center height={'100%'}>
                <Image src={'/img/logo-branca.png'} height={86} width={142} alt='logo' />
            </Center>
        </Box>
    )
}
