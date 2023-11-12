'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function EditShotcutsPage() {

    const [tratamento, setTratamento] = useState({
        indentificador: '',
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
        // Lógica para enviar o novo usuário para o servidor
        console.log(tratamento);
    };


    return (
        <>
            <Heading>Novo Shotcut</Heading>

            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link href={'/admin/configs/shotcuts'}>
                        <BreadcrumbLink>Shotcuts</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Novo</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            

            <Box width={500}>
                <form onSubmit={handleSubmit}>
                    <VStack mt={10} spacing="4" alignItems={'flex-start'}>
                        <FormControl id="nome">
                            <FormLabel>Indentificador</FormLabel>
                            <Input
                                type="text"
                                name="indentificador"
                                placeholder='ex: João Ferreira Santos'
                                value={tratamento.indentificador}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="pronuncia">
                            <FormLabel>Pronúncia</FormLabel>
                            <Input
                                type="text"
                                name="pronuncia"
                                placeholder='ex: João Santos'
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
