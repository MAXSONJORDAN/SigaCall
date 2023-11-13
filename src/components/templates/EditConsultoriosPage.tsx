'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, Heading, Input, Link, Select, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type IProps = {
    consultorio?: any
}

export function EditConsultoriosPage(props: IProps) {

    const editMode = props.consultorio ? true : false;

    const toast = useToast({ position: "top", isClosable: true });
    const router = useRouter();

    const [consultorios, setConsultorios] = useState(editMode ? props.consultorio : {
        identificador: '',
        pronuncia: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setConsultorios({
            ...consultorios,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (consultorios.identificador &&
            consultorios.identificador.length > 0 &&
            consultorios.pronuncia &&
            consultorios.pronuncia.length > 0) {

            // Lógica para enviar o novo usuário para o servidor
            const promiseEdit = editMode ?
                axios.patch("/api/consultorios", { id: props.consultorio.id, ...consultorios })
                : axios.post("/api/consultorios", consultorios);


            promiseEdit.then(axiosResponse => {
                const data = axiosResponse.data;
                toast({ title: "Sucesso!", description: data.message, status: "success" })
                router.push("/admin/configs/consultorios");
            }).catch((err) => {
                console.error(err);
                toast({ title: "Ops!", description: err.response.data.message ?? "Falha desconhecida!", status: "error" })

            })

        } else {
            toast({ title: "Atenção!", description: "Todos os campos precisam ser preenchidos.", status: "info" })
        }

    };


    return (
        <>
            <Heading>{editMode ? 'Editar' : 'Novo'} Consultorio</Heading>

            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href={'/admin/configs'}>
                        <BreadcrumbLink>Configurações</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link href={'/admin/configs/consultorios'}>
                        <BreadcrumbLink>Consultórios</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{editMode ? 'Editar' : 'Novo'}</BreadcrumbLink>
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
                                placeholder='ex: sala 2'
                                value={consultorios.identificador}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="pronuncia" isRequired>
                            <FormLabel>Pronúncia</FormLabel>
                            <Input
                                type="text"
                                name="pronuncia"
                                placeholder='ex: Consultório 2 no segundo andar.'
                                value={consultorios.pronuncia}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="purple">
                            {editMode ? 'Alterar' : 'Cadastrar'}
                        </Button>
                    </VStack>

                </form>
            </Box >



        </>

    )
}
