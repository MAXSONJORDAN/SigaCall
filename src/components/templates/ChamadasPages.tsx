'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Checkbox, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, InputGroup, InputLeftElement, Textarea, VStack, useNumberInput, useToast } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '../molecules/DeleteButton';


type IChamadasConfigsProps = {
    configs: {
        mensagem: string,
        velocidade: string,
        repeticoes: string,
        repeticoesAlertas: string,
        voz: string
    }
}
export function ChamadasPage(props: IChamadasConfigsProps) {

    const [mensagem, setMensagem] = useState(props.configs.mensagem);
    const [velocidade, setVelocidade] = useState(props.configs.velocidade);
    const [voz, setVoz] = useState(props.configs.voz);



    const [usuarios, setUsuarios] = useState<any[]>([]);



    const toast = useToast({ position: 'top', isClosable: true })

    const { getInputProps: gipc, getIncrementButtonProps: gibpc, getDecrementButtonProps: gdbpc } =
        useNumberInput({
            step: 1,
            defaultValue: props.configs.repeticoes,
            min: 1,
            max: 6,
            precision: 0,
        })

    const incChamadas = gibpc()
    const decChamadas = gdbpc()
    const inputChamadas = gipc()

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: props.configs.repeticoesAlertas,
            min: 1,
            max: 6,
            precision: 0,
        })

    const incAlertas = getIncrementButtonProps()
    const decAlertas = getDecrementButtonProps()
    const repeticoesAlertasInput = getInputProps()



    const router = useRouter();
    const updateConfigs = () => {

        let novosConfigs = {
            mensagem,
            repeticoes: inputChamadas.value,
            repeticoesAlertas: repeticoesAlertasInput.value
        }



        axios.post("/api/chamadas/configs", novosConfigs).then((axiosResult) => {
            const data = axiosResult.data;
            toast({ status: 'success', description: data.message, title: 'Sucesso!' });
            router.push('/admin/configs')
            router.refresh();
        }).catch((err)=>{
            const data = err.response.data;
            toast({ status: 'error', description: data?.message?? "Erro desconhecido.", title: 'Ops!' });
        })
    }


    return (
        <>
            <Heading>Configuração de Chamadas</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    {/* <Link href={'/admin/configs'}> */}
                    <BreadcrumbLink onClick={() => router.push("/admin/configs")}>Configurações</BreadcrumbLink>
                    {/* </Link> */}
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Chamadas</BreadcrumbLink>
                </BreadcrumbItem>

            </Breadcrumb>

            <VStack width={'100%'} paddingRight={6} mt={10} spacing={10}>

                <FormControl>
                    <FormLabel>Texto de Chamada.</FormLabel>
                    <Textarea value={mensagem} onChange={(ev) => { setMensagem(ev.target.value) }} />
                    <FormHelperText>Este texto será utilizado ao chamar uma pessoa para um local específico. você pode usar as variáveis {'{paciente}'}, {'{destinoAtendimento}'} e {'{solicitante}'}.</FormHelperText>
                </FormControl>

                <FormControl>
                    <FormLabel>Quantidade chamadas por vezes.</FormLabel>
                    <HStack maxW='320px'>
                        <Button {...incChamadas}>+</Button>
                        <Input {...inputChamadas} />
                        <Button {...decChamadas}>-</Button>
                    </HStack>
                </FormControl>


                <FormControl>
                    <FormLabel>Quantidade alertas por vezes.</FormLabel>
                    <HStack maxW='320px'>
                        <Button {...incAlertas}>+</Button>
                        <Input {...repeticoesAlertasInput} />
                        <Button {...decAlertas}>-</Button>
                    </HStack>
                </FormControl>

                <Box width={'full'}>
                    <Button onClick={updateConfigs} colorScheme='brand'>Salvar</Button>
                </Box>
            </VStack>


        </>

    )
}
