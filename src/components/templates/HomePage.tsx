'use client'
import { Box, Center, Flex, HStack, Heading, Icon, Image, Input, InputGroup, InputLeftElement, Text, VStack, useMediaQuery, useToast } from '@chakra-ui/react'
import { MdCalendarMonth } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { cumprimentoDoDia, formatarDataHora, formatarHora12, saudacaoDia } from '@/utils';
import { BoxNums } from '../molecules/BoxNums';
import { Shotcut } from '../atoms/Shotcut';
import { Chamada } from '../atoms/Chamada';
import { PacienteInput } from '../molecules/PacienteInput';
import { DestinoSelector } from '../molecules/DestinoSelector';
import { AlertaInput } from '../molecules/AlertaInput';
import { Alertas, Chamadas, DestinoAtendimento, Shotcuts } from '@prisma/client';
import { Manager } from "socket.io-client";
import axios from 'axios';
import { Search2Icon } from '@chakra-ui/icons';




type IProps = {
    destinos: DestinoAtendimento[],
    shotcuts: Shotcuts[],
    socketUrl: any
    user?: any
}
export function HomePage(props: IProps) {

    const [dataFormatada, setDataFormatada] = useState("");
    const [destinoAtendimento, setDestinoAtendimento] = useState("");
    const [pacientes, setPacientes] = useState<Chamadas[]>([]);
    const [alertas, setAlertas] = useState<Alertas[]>([]);
    const [comunicando, setChamando] = useState(false);
    const [shotcutSearchTerm, setShotcutSearchTerm] = useState("");
    const [isMaxW800] = useMediaQuery('(max-width: 800px)')
    const [isMaxW500] = useMediaQuery('(max-width: 500px)')

    const toast = useToast({ position: 'top', isClosable: true });

    const refreshPacientes = () => {

        axios.get("/api/chamadas/pacientes").then((axiosResponse) => {
            const data = axiosResponse.data;
            setPacientes(data);
        }).catch((err) => {
            console.error(err);
        })
    }

    const refreshAlertas = () => {

        axios.get("/api/chamadas/alertas").then((axiosResponse) => {
            const data = axiosResponse.data;
            setAlertas(data);
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleChamarPaciente = (paciente, destino?) => {

        if (paciente) {
            setChamando(true);
            axios.post("/api/chamadas/pacientes/chamar", {
                paciente,
                destinoAtendimento: destino ?? destinoAtendimento,
                userId: props.user.id
            }).finally(() => {
                setTimeout(() => {
                    setChamando(false);
                }, 5000);
            })
        }

    }

    const HadleAlertar = (identificador, mensagem) => {

        if (mensagem) {
            setChamando(true);
            axios.post("/api/chamadas/alertas/alertar", {
                identificador,
                mensagem,
                userId: props.user.id
            }).finally(() => {
                setTimeout(() => {
                    setChamando(false);
                }, 5000);
            })
        }

    }

    const handleChangeDestinoAtendimento = (value) => {
        console.log("Destino Atendimento", value)
        setDestinoAtendimento(value)
    }

    useEffect(() => {
        //configurando atualização de relógio.
        const handleTimeRefresh = () => {
            const data = new Date(); // Novamente, o mês é 7 para representar agosto.
            const dataHoraFormatada = formatarDataHora(data);
            setDataFormatada(dataHoraFormatada)
        }
        handleTimeRefresh();
        let timeRefresh = setInterval(handleTimeRefresh, 10000)

        //atualizando lista de pacientes na tela.
        refreshPacientes();
        refreshAlertas();


        const manager = new Manager("ws://" + props.socketUrl, { transports: ['websocket'] });
        const socket = manager.socket("/");


        //handlers events socket
        const onChamarPaciente = (paciente) => {
            refreshPacientes();
            console.log('chamando paciente:', paciente)
        }
        const onAlertar = () => {
            refreshAlertas()
        }


        socket.on("chamar", onChamarPaciente);
        socket.on("alertar", onAlertar);
        return () => {
            socket.off("chamar", onChamarPaciente);
            socket.off("alertar", onAlertar);
            socket.disconnect();


            clearInterval(timeRefresh);
        }
    }, [])


    const shotcutsFiltred = props.shotcuts.filter((shotcut) => {

        const term = shotcutSearchTerm.toUpperCase()

        return shotcut.identificador.toUpperCase().includes(term) ||
            shotcut.mensagem.toUpperCase().includes(term)
    });




    return (
        <>
            <Box paddingRight={6} height={'100%'} overflow={isMaxW800 ? 'auto' : 'unset'} overscroll={isMaxW800 ? 'auto' : 'unset'} color={'gray.700'}>

                <Flex direction={isMaxW800 ? 'column' : 'row'}>

                    <Flex flexDirection={'column'} flex={1} >

                        <Box padding={3} bgColor={'white'} borderRadius={'2xl'} height={'150px'} borderBottomColor={'brand.500'} borderBottomWidth={'medium'} borderBottomRadius={'2xl'} shadow={'base'}>
                            <HStack height={'100%'}>
                                <Flex height={'100%'} flex={2} flexDirection={'column'}>

                                    <Box flex={1}>
                                        <HStack width={"230px"} bgColor={'brand.400'} borderRadius={'lg'} justifyContent={'center'} padding={1}>
                                            <Icon size='4xl' color={'white'} as={MdCalendarMonth} />
                                            <Text color={'white'} fontSize={'sm'}>
                                                {dataFormatada}
                                            </Text>
                                        </HStack>
                                    </Box>

                                    <Box>
                                        <Heading size={'lg'} color={'brand.500'}>
                                            {saudacaoDia()}, {props.user.nomeTratamento}
                                        </Heading>
                                        <Text color={'gray.700'}>
                                            {cumprimentoDoDia()}!
                                        </Text>
                                    </Box>

                                </Flex>

                                <Center flex={2}>
                                    <Image w={210} h={120} src='/img/doctors-wellcome.png'></Image>
                                </Center>
                            </HStack>
                        </Box>

                        <Flex h={isMaxW500 ? '100%' : 'calc(100vh - 172px)'} direction={isMaxW500 ? 'column' : 'row'}>
                            <Flex flex={1} direction={'column'} padding={4}>
                                <Heading size={'md'}>Últimas Chamadas</Heading>

                                <VStack sx={{
                                    '&::-webkit-scrollbar': { width: '10px', borderRadius: '8px', backgroundColor: `rgba(0, 0, 0, 0.05)`, }, '&::-webkit-scrollbar-thumb': { backgroundColor: `rgba(0, 0, 0, 0.05)`, },
                                }} bg={'white'} shadow={'xl'} height={isMaxW500 ? '200px' : '100%'} borderRadius={10} overflowX={'scroll'} padding={2} className="scrollbar">

                                    {pacientes.map(item => {
                                        return (<Chamada chamando={comunicando} onClick={(paciente, destino) => handleChamarPaciente(paciente, destino)} nome={item.paciente} destino={item.destinoAtendimento} hora={formatarHora12(new Date(item.hora))} />)
                                    })}

                                </VStack>
                            </Flex>
                            <Flex flex={1} flexDirection={'column'} padding={4} height={'100%'}>
                                <Heading size={'md'}>Painel de Comando</Heading>

                                <PacienteInput chamando={comunicando} onCaller={handleChamarPaciente} />

                                <DestinoSelector destinos={props.destinos} onChange={handleChangeDestinoAtendimento} destino={destinoAtendimento} />
                                <AlertaInput chamando={comunicando} onClick={(mensagem) => { HadleAlertar("Custom", mensagem) }} />
                            </Flex>
                        </Flex>

                    </Flex>



                    {props.user.roleId < 3 ? <Flex ml={2} flex={0.4} mt={isMaxW800 ? 10 : 0} direction={'column'}>
                        <BoxNums BoxNums={[{ label: "Chamadas", value: pacientes.length }, { label: "Alertas", value: alertas.length }]} />
                        <Flex direction={'row'}>
                            <Heading padding={2}>
                                Ações
                            </Heading>
                            <InputGroup mt={3}>
                                <InputLeftElement pointerEvents='none'>
                                    <Search2Icon color='gray.300' />
                                </InputLeftElement>
                                <Input border={'1px'} type='text' value={shotcutSearchTerm} onChange={(ev: any) => { setShotcutSearchTerm(ev.target.value) }} placeholder='Pesquisar shotcuts' />
                            </InputGroup>
                        </Flex>
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

                            {shotcutsFiltred.map(item => {
                                return (<Shotcut onClick={() => { HadleAlertar(item.identificador, item.mensagem) }} identificador={item.identificador} mensagem={item.mensagem} icone={item.icone} id={item.id} />)
                            })}

                        </VStack>
                    </Flex> : null}

                </Flex>


            </Box >
        </>

    )
}
