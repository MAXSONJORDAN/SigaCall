'use client'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, FormControl, FormLabel, HStack, Heading, Icon, Input, Link, Select, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as icons from 'react-icons/md';

type IProps = {
    shotcut?: any
}

export function EditShotcutsPage(props: IProps) {

    const editMode = props.shotcut ? true : false;

    const toast = useToast({ position: "top", isClosable: true });
    const router = useRouter();

    const [shotcut, setShotcut] = useState(editMode ? props.shotcut : {
        identificador: '',
        mensagem: '',
        icone: 'MdSpeakerNotes',
    });

    const [icones, setIcones] = useState<any[]>([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setShotcut({
            ...shotcut,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (shotcut.identificador &&
            shotcut.identificador.length > 0 &&
            shotcut.mensagem &&
            shotcut.mensagem.length > 0) {

            // Lógica para enviar o novo usuário para o servidor
            const promiseEdit = editMode ? axios.patch("/api/shotcuts", { id: props.shotcut.id, ...shotcut }) : axios.post("/api/shotcuts", shotcut);
            promiseEdit.then(axiosResponse => {
                const data = axiosResponse.data;
                toast({ title: "Sucesso!", description: data?.message, status: "success" })
                router.push("/admin/configs/shotcuts");
                router.refresh();
            }).catch((err) => {
                console.error(err);
                toast({ title: "Ops!", description: err.response.data.message ?? "Falha desconhecida!", status: "error" })

            })

        } else {
            toast({ title: "Atenção!", description: "Todos os campos precisam ser preenchidos.", status: "info" })
        }

    };

    useEffect(() => {
        const ics: any[] = [];
        for (const key in icons) {
            ics.push(key);
        }
        // setShotcut({
        //     ...shotcut,
        //     icone: 'MdSpeakerNotes'//ics[0],
        // });
        setIcones(ics);
    },[])


    return (
        <>
            <Heading>{editMode ? 'Editar' : 'Novo'} Shotcut</Heading>

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
                                placeholder='ex: Dr.'
                                value={shotcut.identificador}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="mensagem" isRequired>
                            <FormLabel>Mensagem</FormLabel>
                            <Input
                                type="texta"
                                name="mensagem"
                                placeholder='ex: Doutor'
                                value={shotcut.mensagem}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <HStack>
                            <FormControl id="icone">
                                <FormLabel>Icone</FormLabel>
                                <Select
                                    name="icone"
                                    value={shotcut.icone}
                                    onChange={handleChange}
                                >
                                    {icones.map((item: any) => {
                                        return <option value={item}>{item}</option>
                                    })}
                                </Select>
                            </FormControl>
                            <Center mt={7}>
                                {/* @ts-ignore */}
                                <Icon boxSize={'8'} as={icons[shotcut.icone]} />
                            </Center>
                        </HStack>
                        <Button type="submit" colorScheme="brand">
                            {editMode ? 'Alterar' : 'Cadastrar'}
                        </Button>
                    </VStack>

                </form>
            </Box >



        </>

    )
}
