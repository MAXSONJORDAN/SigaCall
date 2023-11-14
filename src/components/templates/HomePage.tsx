'use client'
import { Box, Center, Flex, FormControl, FormLabel, HStack, Heading, Icon, Image, Text, VStack, Input, FormHelperText, Button, Textarea, Select } from '@chakra-ui/react'
import { MdCalendarMonth } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react';
import { cumprimentoDoDia, formatarDataHora } from '@/utils';
import { BoxNums } from '../molecules/BoxNums';
import { Shotcut } from '../atoms/Shotcut';
import { Chamada } from '../atoms/Chamada';
import { PacienteInput } from '../molecules/PacienteInput';
import { DestinoSelector } from '../molecules/DestinoSelector';
import { AlertaInput } from '../molecules/AlertaInput';

export function HomePage() {

    const [dataFormatada, setDataFormatada] = useState("");
    const [destinoAtendimento, setDestinoAtendimento] = useState("");

    const handleChangeDestinoAtendimento = (value) => {
        console.log("Destino Atendimento", value)
    }

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
        <>
            <Box paddingRight={6} height={'100%'} color={'gray.700'}>

                <Flex>

                    <Flex flexDirection={'column'} width={"calc(70vw - 80px)"} >

                        <Box padding={3} bgColor={'purple.500'} borderRadius={'2xl'} height={'150px'} >
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

                        <Flex h={'calc(100vh - 168px)'} direction={'row'}>
                            <Flex flex={1} direction={'column'} padding={4}>
                                <Heading size={'md'}>Últimas Chamadas</Heading>

                                <VStack sx={{
                                    '&::-webkit-scrollbar': {
                                        width: '10px',
                                        borderRadius: '8px',
                                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                                }} bg={'white'} shadow={'xl'} height={'100%'} borderRadius={10} overflowX={'scroll'} padding={2} className="scrollbar">

                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />
                                    <Chamada nome='Exemple Name Person Called' sala='Sala 2' hora='10:20 pm' />

                                </VStack>
                            </Flex>
                            <Flex flex={1} flexDirection={'column'} padding={4}>
                                <Heading size={'md'}>Painel de Comando</Heading>
                                <PacienteInput />
                                <DestinoSelector onChange={handleChangeDestinoAtendimento} destino={destinoAtendimento} />
                                <AlertaInput />
                            </Flex>
                        </Flex>

                    </Flex>



                    <Flex ml={2} flex={1} direction={'column'}>
                        <BoxNums BoxNums={[{ label: "Chamadas", value: "23" }, { label: "Alertas", value: "6" }]} />
                        <Heading padding={2}>
                            Ações
                        </Heading>
                        <VStack shadow={'xl'} borderRadius={10} h={'calc(100vh - 172px)'} overflowX={'scroll'} sx={{
                            '&::-webkit-scrollbar': {
                                width: '10px',
                                borderRadius: '8px',
                                backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                        }} >
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                            <Shotcut title='Exemle button' description='Exemple text thats will be speaked by narrator.' />
                        </VStack>
                    </Flex>


                </Flex>


            </Box >
        </>

    )
}
