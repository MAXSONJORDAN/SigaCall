'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, VStack, useToast } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Icons from 'react-icons/md'
import { DeleteButton } from '../molecules/DeleteButton';

export function ShotcutsPage() {

    const [shotcuts, setShotcuts] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");


    const toast = useToast({ position: 'top', isClosable: true })
    const router = useRouter();

    const updateShotcuts = () => {

        axios.get("/api/shotcuts").then((axiosResponse: any) => {
            const data = axiosResponse.data;

            data.map((shotcuts: any) => {
                shotcuts.actions = (<ButtonGroup size={'sm'}>
                    <Button colorScheme='brand'
                        onClick={() => {
                            router.push(`shotcuts/editar/${shotcuts.id}`)
                        }}
                    >Editar</Button>
                    <DeleteButton onConfimation={() => {
                        axios.delete("/api/shotcuts", {
                            params: {
                                id: shotcuts.id
                            }
                        }).then((axiosResult) => {
                            const data = axiosResult.data;
                            toast({ title: "Sucesso!", description: data.message ?? "Feito com sucesso!", status: "success" })
                            updateShotcuts()
                        }).catch((err) => {
                            const data = err.response.data;
                            toast({ title: "Error!", description: data.message ?? "Erro desconhecido!", status: "error" })
                        })
                    }} />
                </ButtonGroup>
                )
                //@ts-ignore
                shotcuts.icon = (<Icon boxSize={'8'} as={Icons[shotcuts.icone]} />)
            })

            // console.log("data", data)
            setShotcuts(data);
        })

    }
    useEffect(() => {
        updateShotcuts();
    }, [])


    const shotcutsFiltred = shotcuts.filter((item: any) => {
        return (item.identificador?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.mensagem?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.icone?.toUpperCase().includes(searchText?.toUpperCase()));
    })

    return (
        <>
            <Heading>Shotcuts</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink href='#'>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Shotcuts</BreadcrumbLink>
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
                        <Link href={'shotcuts/novo'}>
                            <Button colorScheme='brand' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={'100%'} >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'identificador', Header: "Identificador" },
                            { accessor: 'mensagem', Header: "Mensagem", columnWidth: 1, ellipSizeMode: true },
                            { accessor: 'icon', Header: "Icone." },
                            { accessor: "actions", Header: "Ações" }

                        ]} data={shotcutsFiltred} />
                </Box>
            </VStack>


        </>

    )
}
