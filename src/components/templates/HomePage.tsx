'use client'
import { Box, Center, Flex, HStack, Heading, Icon, Image, Text } from '@chakra-ui/react'
import { MdCalendarMonth } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { cumprimentoDoDia, formatarDataHora } from '@/utils';

export function HomePage() {

    const [dataFormatada, setDataFormatada] = useState("");

    useEffect(() => {
        let timeRefresh = setInterval(() => {
            const data = new Date(); // Novamente, o mês é 7 para representar agosto.

            const dataHoraFormatada = formatarDataHora(data);
            setDataFormatada(dataHoraFormatada)
            return () => {
                clearInterval(timeRefresh);
            }
        }, 1000)
    }, [])


    return (
        <>            {/* <Center h={'100vh'} w={'full'} bgColor={'purple.600'}>
                
            </Center> */}
            <Box>


                <Box padding={3} width={"calc(70vw - 80px)"} bgColor={'purple.500'} borderRadius={'2xl'} height={'150px'} >
                    <HStack height={'100%'}>
                        <Flex height={'100%'} flex={2} flexDirection={'column'}>

                            <Box flex={1}>
                                <HStack width={"230px"} bgColor={'purple.400'} borderRadius={'lg'} justifyContent={'center'} padding={1}>
                                    <Icon size='4xl' color={'white'} as={MdCalendarMonth} />
                                    <Text color={'white'} fontSize={'sm'}>
                                        {dataFormatada}
                                    </Text>
                                </HStack>
                            </Box>

                            <Box>
                                <Heading size={'lg'} color={'white'}>
                                    Bom dia, Dr. Susano
                                </Heading>
                                <Text color={'white'}>
                                    {cumprimentoDoDia()}
                                </Text>
                            </Box>

                        </Flex>

                        <Center flex={2}>
                            <Image w={210} h={120} src='/img/doctors-wellcome.png'></Image>
                        </Center>
                    </HStack>
                </Box>




                
            </Box>
        </>

    )
}
