'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Heading, Input, Select, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type IProps = {
    tratamentos: any[],
    roles: any[],
    user?: any
}
export function EditUserPage(props: IProps) {
    const editMode = props.user ? true : false;

    const { tratamentos, roles } = props;

    const toast = useToast({ position: 'top', isClosable: true });
    const router = useRouter();

    const [usuario, setUsuario] = useState(props.user ?? {
        nome: '',
        nomeTratamento: '',
        email: '',
        tratamentoId: '1',
        roleId: '2',
        senha: '',
    });


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Lógica para enviar o novo usuário para o servidor
        let promiseUser = editMode ? axios.patch("/api/users", { id: props.user.id, ...usuario }) : axios.post("/api/users", usuario)

        promiseUser.then((axiosResponse: any) => {
            const data = axiosResponse.data;
            toast({ "title": "Sucesso!", description: data.message, status: 'success' });

            router.push("/admin/configs/users");
        }).catch((err: any) => {
            const data = err.response?.data;
            toast({ "title": "Algo errado!", description: data.message, status: 'error' });
        })
    };


    return (
        <>
            <Heading>{editMode ? "Editar" : "Novo"} Usuário</Heading>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link href={'/admin/configs/users'}>
                        <BreadcrumbLink>Users</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{editMode ? 'Editar' : 'Novo'}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Box width={600}>
                <form onSubmit={handleSubmit}>
                    <VStack mt={10} spacing="4" alignItems={'flex-start'}>
                        <HStack spacing={4} width={'100%'}>
                            <FormControl id="nome" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    name="nome"
                                    placeholder='ex: João Ferreira Santos'
                                    value={usuario.nome}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="nomeTratamento" isRequired>
                                <FormLabel>Nome de Tratamento</FormLabel>
                                <Input
                                    type="text"
                                    name="nomeTratamento"
                                    placeholder='ex: João Santos'
                                    value={usuario.nomeTratamento}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder='exemplo@email.com'
                                value={usuario.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <HStack spacing={4} width={'100%'}>
                            <FormControl id="tratamentoId">
                                <FormLabel>Tratamento</FormLabel>
                                <Select
                                    name="tratamentoId"
                                    value={usuario.tratamentoId}
                                    onChange={handleChange}
                                >
                                    {tratamentos.map((item: any) => {
                                        return <option value={item.id}>{item.identificador}</option>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl id="roleId">
                                <FormLabel>Tipo de Usuário</FormLabel>
                                <Select
                                    name="roleId"
                                    value={usuario.roleId}
                                    onChange={handleChange}
                                >
                                    {roles.map((item: any) => {
                                        return <option value={item.id}>{item.name}</option>
                                    })}
                                </Select>
                            </FormControl>
                        </HStack>
                        <FormControl id="senha" isRequired={!editMode}>
                            <FormLabel>Senha</FormLabel>
                            <Input
                                type="password"
                                name="senha"
                                value={usuario.senha}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="purple">
                            {editMode ? "Alterar" : "Cadastrar"}
                        </Button>
                    </VStack>

                </form>
            </Box >



        </>

    )
}
