'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, Heading, Input, Link, Select, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function EditTratamentoPage() {

    const toast = useToast({ position: "top", isClosable: true });
    const router = useRouter();

    const [tratamento, setTratamento] = useState({
        identificador: '',
        pronuncia: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setTratamento({
            ...tratamento,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (tratamento.identificador &&
            tratamento.identificador.length > 0 &&
            tratamento.pronuncia &&
            tratamento.pronuncia.length > 0) {

            // Lógica para enviar o novo usuário para o servidor
            axios.post("/api/tratamentos", tratamento).then(axiosResponse => {
                const data = axiosResponse.data;
                toast({ title: "Sucesso!", description: "Tratamento cadastrado com sucesso!", status: "success" })
                router.push("/admin/configs/tratamentos");
            }).catch((err) => {
                console.error(err);
                toast({ title: "Algo errado!", description: err.response.data.message ?? "Falha desconhecida!", status: "success" })

            })

        } else {
            toast({ title: "Atenção!", description: "Todos os campos precisam ser preenchidos.", status: "info" })
        }

    };


    return (
        <>
            <Heading>Novo Tratamento</Heading>

            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link href={'/admin/configs/tratamentos'}>
                        <BreadcrumbLink>Tratamentos</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Novo</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>


            <Box width={500}>
                <form onSubmit={handleSubmit}>
                    <VStack mt={10} spacing="4" alignItems={'flex-start'}>
                        <FormControl id="Identificador" isRequired>
                            <FormLabel>Identificador</FormLabel>
                            <Input
                                type="text"
                                name="identificador"
                                placeholder='ex: Dr.'
                                value={tratamento.identificador}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="pronuncia" isRequired>
                            <FormLabel>Pronúncia</FormLabel>
                            <Input
                                type="text"
                                name="pronuncia"
                                placeholder='ex: Doutor'
                                value={tratamento.pronuncia}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="purple">
                            Cadastrar
                        </Button>
                    </VStack>

                </form>
            </Box >



        </>

    )
}
