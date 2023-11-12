'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Icons from 'react-icons/md'

export function ShotcutsPage() {

    const [shotcuts, setShotcuts] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");


    const router = useRouter();

    useEffect(() => {

        axios.get("/api/shotcuts").then((axiosResponse: any) => {
            const data = axiosResponse.data;

            data.map((shotcuts: any) => {
                shotcuts.actions = (<Button colorScheme='purple'
                    onClick={() => {
                        router.push(`shotcuts/editar/${shotcuts.id}`)
                    }}
                >Editar</Button>)
                //@ts-ignore
                shotcuts.icon = (<Icon boxSize={'8'} as={Icons[shotcuts.icone]} />)
            })

            // console.log("data", data)
            setShotcuts(data);
        })

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
                            <Button colorScheme='purple' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={'100%'} >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'identificador', Header: "Identificador" },
                            { accessor: 'mensagem', Header: "Mensagem", columnWidth: 1 },
                            { accessor: 'icon', Header: "Icone." },
                            { accessor: "actions", Header: "Ações" }

                        ]} data={shotcutsFiltred} />
                </Box>
            </VStack>


        </>

    )
}
