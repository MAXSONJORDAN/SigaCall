'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function ConsultoriosPage() {

    const [consultorios, setConsultorios] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");


    const router = useRouter();

    useEffect(() => {

        axios.get("/api/consultorios").then((axiosResponse: any) => {
            const data = axiosResponse.data;

            data.map((consultorio: any) => {
                consultorio.actions = (<Button colorScheme='purple'
                    onClick={() => {
                        router.push(`consultorios/editar/${consultorio.id}`)
                    }}
                >Editar</Button>)
            })

            // console.log("data", data)
            setConsultorios(data);
        })

    }, [])


    const shotcutsFiltred = consultorios.filter((item: any) => {
        return (item.identificador?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.pronuncia?.toUpperCase().includes(searchText?.toUpperCase()));
    })

    return (
        <>
            <Heading>Consultórios</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink href='#'>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Consultórios</BreadcrumbLink>
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
                        <Link href={'consultorios/novo'}>
                            <Button colorScheme='purple' rightIcon={<MdPersonAdd />}>Novo</Button>
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
