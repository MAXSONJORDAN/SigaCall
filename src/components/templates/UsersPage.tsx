'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, Flex, HStack, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function UsersPage() {

    const [searchText, setSearchText] = useState("");
    const [usuarios, setUsuarios] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        axios.get("/api/users").then((axiosResult: any) => {

            const data = axiosResult.data;
            data.map((user: any) => {
                user.actions = (<Button colorScheme='purple'>Editar</Button>)
                user.status = (<Checkbox isChecked={user.isActive}
                    onChange={(ev:any)=>{
                        console.log(ev.target.checked)
                    }}
                    colorScheme='purple'></Checkbox>)
            })

            console.log(data);
            setUsuarios(data);
        })

    }, [])


    const usuariosFiltred = usuarios.filter((item: any) => {
        return item.email?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.nomeTratamento?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.nome?.toUpperCase().includes(searchText?.toUpperCase());
    })

    return (
        <>
            <Heading>Usuários</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    {/* <Link href={'/admin/configs'}> */}
                        <BreadcrumbLink onClick={()=>router.push("'/admin/configs")}>Configurações</BreadcrumbLink>
                    {/* </Link> */}
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Users</BreadcrumbLink>
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
                        <Link href={'users/novo'}>
                            <Button colorScheme='purple' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={'100%'} >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'nome', Header: "Nome", columnWidth: 1 },
                            { accessor: 'nomeTratamento', Header: "Nome de Tratamento", columnWidth: 1 },
                            { accessor: 'email', Header: "E-mail." },
                            { accessor: 'tratamento', Header: "Tratamento." },
                            { accessor: 'role', Header: "Role." },
                            { accessor: 'status', Header: "Status" },
                            { accessor: "actions", Header: "Ações" }

                        ]} data={usuariosFiltred} />
                </Box>
            </VStack>


        </>

    )
}
