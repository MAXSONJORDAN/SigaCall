'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Checkbox, Flex, HStack, Heading, Input, InputGroup, InputLeftElement, VStack, useToast } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '../molecules/DeleteButton';


export function UsersPage() {

    const [searchText, setSearchText] = useState("");
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const toast = useToast({ position: 'top', isClosable: true })

    const router = useRouter();
    const updateUsers = () => {
        axios.get("/api/users").then((axiosResult: any) => {

            const data = axiosResult.data;
            data.map((user: any) => {
                user.actions = (
                    <ButtonGroup size={'sm'}>
                        <Button colorScheme={user.id === 1 ? 'gray' : 'brand'}
                            onClick={() => {
                                if (user.id !== 1) { router.push(`users/editar/${user.id}`) }
                            }}
                        >Editar</Button>
                        <DeleteButton onConfimation={() => {
                            axios.delete("/api/users", {
                                params: {
                                    id: user.id
                                }
                            }).then((axiosResult) => {
                                const data = axiosResult.data;
                                toast({ title: "Sucesso!", description: data.message ?? "Feito com sucesso!", status: "success" })
                                updateUsers();
                            }).catch((err) => {
                                const data = err.response.data;
                                toast({ title: "Error!", description: data.message ?? "Erro desconhecido!", status: "error" })
                            })
                        }} />
                    </ButtonGroup>)
                user.status = (<Checkbox disabled={user.id === 1} isChecked={user.isActive}
                    onChange={(ev: any) => {

                        axios.put("/api/users", { id: user.id, status: ev.target.checked }).then((axiosResult) => {
                            const data = axiosResult?.data;
                            toast({ title: "Sucesso!", description: data.message, status: "success" })
                            setUsuarios([])
                            updateUsers();
                        }).catch((err) => {
                            console.error(err);
                            const axiosResult = err.response;
                            const data = axiosResult?.data;
                            console.log("data", err)
                            toast({ title: 'Ops!', description: data?.message ?? "Erro desconhecido!", status: 'error' })
                        });
                    }}
                    colorScheme='brand'></Checkbox>)
            })

            console.log(data);
            setUsuarios(data);
        })
    }
    useEffect(() => {
        updateUsers();
    }, [])


    const usuariosFiltred = usuarios.filter((item: any) => {
        return (item.email?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.nomeTratamento?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.nome?.toUpperCase().includes(searchText?.toUpperCase())) && item.id !== 1;
    })

    return (
        <>
            <Heading>Usuários</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    {/* <Link href={'/admin/configs'}> */}
                    <BreadcrumbLink onClick={() => router.push("/admin/configs")}>Configurações</BreadcrumbLink>
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
                            <Button colorScheme='brand' rightIcon={<MdPersonAdd />}>Novo</Button>
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
