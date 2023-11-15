'use client'
import { Box, Button, Center, FormControl, HStack, Heading, Input, Link, Stack, Text, VStack, FormLabel, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const toast = useToast({ position: 'top', isClosable: true });
    const router = useRouter();


    return (
        <Box height={'103%'} mt={'-1%'} flex={1} padding={10} borderRightRadius={'xl'} borderRadius={['xl', 'xl', 'none']} bgColor={'white'} shadow={'2xl'}>
            <Center w="100%" h={'100%'}>
                <Box p="2" py="8" w="90%" maxW="290">
                    <Heading size="md" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Bem vindo de volta!
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Faça login para continuar!
                    </Heading>

                    <VStack spacing={3} mt="5">
                        <form onSubmit={(ev) => {
                            ev.preventDefault();
                            axios.post("/api/auth", { email, senha }).then(axiosResponse => {
                                const data = axiosResponse.data;
                                window.location.href = "/admin";
                                toast({ title: "Sucesso!", description: data.message, status: "success" })
                            }).catch(err => {
                                const data = err.response.data;
                                toast({ title: "Falha!", description: data.message, status: "error" })
                            })
                        }}>
                            <FormControl>
                                <FormLabel>Email ID</FormLabel>
                                <Input value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={senha} onChange={(ev) => { setSenha(ev.target.value) }} />
                                {/* <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link> */}
                            </FormControl>
                            <Button mt="2" colorScheme="brand" type='submit'>
                                Login
                            </Button>
                        </form>
                        <HStack mt="6" justifyContent="center">
                            {/* <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm a new user.{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} href="#">
                                Sign Up
                            </Link> */}
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}
