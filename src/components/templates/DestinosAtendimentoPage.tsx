'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, VStack, useToast } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '../molecules/DeleteButton';

export function DestinosAtendimentoPage() {

    const [destinos, setDestinos] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");


    const toast = useToast({ position: 'top', isClosable: true })
    const router = useRouter();

    const updateDestinos = () => {

        axios.get("/api/destinos").then((axiosResponse: any) => {
            const data = axiosResponse.data;

            data.map((destino: any) => {
                destino.actions = (
                    <ButtonGroup size={'sm'}>
                        <Button colorScheme='brand'
                            onClick={() => {
                                router.push(`destinos/editar/${destino.id}`)
                            }}
                        >Editar</Button>
                        <DeleteButton onConfimation={() => {
                            axios.delete("/api/destinos", {
                                params: {
                                    id: destino.id
                                }
                            }).then((axiosResult) => {
                                const data = axiosResult.data;
                                toast({ title: "Sucesso!", description: data.message ?? "Feito com sucesso!", status: "success" })
                                updateDestinos()
                            }).catch((err) => {
                                const data = err.response.data;
                                toast({ title: "Error!", description: data.message ?? "Erro desconhecido!", status: "error" })
                            })
                        }} />
                    </ButtonGroup>
                )
            })

            // console.log("data", data)
            setDestinos(data);
        })

    }
    useEffect(() => {
        updateDestinos();
    }, [])


    const shotcutsFiltred = destinos.filter((item: any) => {
        return (item.identificador?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.pronuncia?.toUpperCase().includes(searchText?.toUpperCase()));
    })

    return (
        <>
            <Heading>Destinos de Atedimento</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink href='#'>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Destinos de Atendimento</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <VStack width={'100%'} paddingRight={6}>
                <Flex direction={'row'} width={'100%'}>

                    <Flex flex={1} />

                    <InputGroup flex={0.3}>
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input type='text' value={searchText} onChange={(ev: any) => { setSearchText(ev.target.value) }} placeholder='Termo de pesquisa' />
                    </InputGroup>
                    <HStack spacing={2} ml={2}>
                        <Link href={'destinos/novo'}>
                            <Button colorScheme='brand' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={'100%'} >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'identificador', Header: "Identificador" },
                            { accessor: 'pronuncia', Header: "Pronúncia", columnWidth: 1 },
                            { accessor: 'actions', Header: "Ações" },
                        ]} data={shotcutsFiltred} />
                </Box>
            </VStack>


        </>

    )
}
