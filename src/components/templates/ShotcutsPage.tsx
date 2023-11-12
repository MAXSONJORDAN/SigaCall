'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';

export function ShotcutsPage() {

    const [dataFormatada, setDataFormatada] = useState("");
    const [usuarios, setUsuarios] = useState<any[]>([]);

    useEffect(() => {
        const data = [
            { id: "2312", "nome": "Maxson Araujo", "tratamento": "Dr.", },
            { id: "2332", "nome": "Lucilo Fernandes", "tratamento": "Dr.", },
            { id: "2352", "nome": "Marcia Cardoso", "tratamento": "Dra.", },
        ];

        data.map((user: any) => {
            user.actions = (<Button colorScheme='purple'>Editar</Button>)
        })

        setUsuarios(data);
    }, [])




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
                        <Input type='tel' placeholder='Termo de pesquisa' />
                    </InputGroup>
                    <HStack spacing={2}>
                        <Button ml={2}>Buscar</Button>
                        <Link href={'shotcuts/novo'}>
                            <Button colorScheme='purple' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={'100%'} >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'nome', Header: "Nome", columnWidth: 1 },
                            { accessor: 'tratamento', Header: "Tratamento." },
                            { accessor: "actions", Header: "Ações" }

                        ]} data={usuarios} />
                </Box>
            </VStack>


        </>

    )
}
