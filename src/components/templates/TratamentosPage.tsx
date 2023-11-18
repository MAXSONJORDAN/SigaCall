'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Flex, HStack, Heading, Input, InputGroup, InputLeftElement, VStack, useToast } from '@chakra-ui/react'
import { MdPersonAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { DataTable } from '../organismes/DataTable';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '../molecules/DeleteButton';

export function TratamentosPage() {

    const [tratamentos, setTratamentos] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<any>("");

    const router = useRouter()
    const toast = useToast({ position: 'top', isClosable: true })

    const updateTratamentos = () => {
        axios.get("/api/tratamentos").then((axiosResponse: any) => {
            const data = axiosResponse.data;

            data.map((tratamento: any) => {
                tratamento.actions = (
                    <ButtonGroup>

                        <Button colorScheme='brand'
                            onClick={() => {
                                router.push(`tratamentos/editar/${tratamento.id}`)
                            }}
                        >Editar</Button>
                        <DeleteButton onConfimation={() => {
                            axios.delete("/api/tratamentos", {
                                params: {
                                    id: tratamento.id
                                }
                            }).then((axiosResult) => {
                                const data = axiosResult.data;
                                toast({ title: "Sucesso!", description: data.message ?? "Feito com sucesso!", status: "success" })
                                updateTratamentos()
                            }).catch((err) => {
                                const data = err.response.data;
                                toast({ title: "Error!", description: data.message ?? "Erro desconhecido!", status: "error" })
                            })
                        }} />
                    </ButtonGroup>
                )
            })

            setTratamentos(data);
        })
    }
    useEffect(() => {
        updateTratamentos();
    }, [])


    const tratamentosFiltred = tratamentos.filter((item: any) => {
        return item.identificador?.toUpperCase().includes(searchText?.toUpperCase()) ||
            item.pronuncia?.toUpperCase().includes(searchText?.toUpperCase());
    })

    return (
        <>
            <Heading>Pron. Tratamentos</Heading>

            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Tratamentos</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>



            <VStack width={'100%'} paddingRight={6}>
                <Flex direction={'row'} width={'100%'}>

                    <Flex flex={1} />

                    <InputGroup flex={0.3}>
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input type='text' value={searchText} onChange={(ev: any) => { setSearchText(ev.target.value) }} placeholder='Procurar...' />
                    </InputGroup>
                    <HStack spacing={2} ml={2}>
                        {/* <Button ml={2}>Buscar</Button> */}
                        <Link href={'tratamentos/novo'}>
                            <Button colorScheme='brand' rightIcon={<MdPersonAdd />}>Novo</Button>
                        </Link>
                    </HStack>
                </Flex>

                <Box width={{ md: '70%', sm: '80%' }}  >
                    <DataTable columns={
                        [
                            { accessor: 'id', Header: "id" },
                            { accessor: 'identificador', Header: "Indentificador" },
                            { accessor: 'pronuncia', Header: "Pronúncia.", columnWidth: 1 },
                            { accessor: "actions", Header: "Ações" }

                        ]} data={tratamentosFiltred} />
                </Box>
            </VStack>


        </>

    )
}
