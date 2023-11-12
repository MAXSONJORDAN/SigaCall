'use client'
import { Center, HStack } from '@chakra-ui/react'
import { LoginForm } from '../organismes/LoginForm';
import { LogoForm } from '../organismes/LogoForm';

export function LoginPage() {
    return (
        <Center h={'100vh'} w={'100vw'} bgColor={'indigo.200'}>
            <HStack height={'75vh'} width={'65vw'} borderRadius={'3xl'} shadow={'6'} bgColor={'purple.500'} >
                <LogoForm />
                <LoginForm />
            </HStack>
        </Center>
    )
}
