'use client'
import { Box, Button, Center, FormControl, HStack, Heading, Input, Link, Stack, Text, VStack, FormLabel } from '@chakra-ui/react'

export function LoginForm() {
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
                        <FormControl>
                            <FormLabel>Email ID</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                            {/* <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link> */}
                        </FormControl>
                        <Button mt="2" colorScheme="purple">
                            Login
                        </Button>
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
