'use client'
import { Box, Center, Flex, HStack, Heading, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { MdCalendarMonth, MdList } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { cumprimentoDoDia, formatarDataHora } from '@/utils';

import Link from 'next/link';
import { MenuList } from '../organismes/MenuList';
import { MenuItem } from '../atoms/MenuItem';

export function ConfigsPage() {

    const [dataFormatada, setDataFormatada] = useState("");

    useEffect(() => {
        let timeRefresh = setInterval(() => {
            const data = new Date(); // Novamente, o mês é 7 para representar agosto.

            const dataHoraFormatada = formatarDataHora(data);
            setDataFormatada(dataHoraFormatada)
            return () => {
                clearInterval(timeRefresh);
            }
        }, 1000)
    }, [])


    return (
        <>
            <Heading size={'lg'}>Configurações</Heading>
            <VStack align={'normal'} pl={5} pt={5}>
                <Heading size={'md'}>Cadastro</Heading>
                <MenuList>
                    <MenuItem href='configs/shotcuts' icon='MdList'>Botões de Atalhos</MenuItem>
                    <MenuItem href='configs/destinos' icon='MdMeetingRoom'>Destinos de Atendimento</MenuItem>
                    <MenuItem href='configs/tratamentos' icon='MdAccountCircle'>Pron. Tratamentos (Sr. Sra, Dr. Dra...)</MenuItem>
                    <MenuItem href='configs/users' icon='MdPeopleAlt'>Usuários</MenuItem>
                </MenuList>
              
                <Heading size={'md'} mt={6}>Outros</Heading>
                <MenuList>
                    <MenuItem href='configs/chamadas' icon='MdSettingsApplications'>Chamadas</MenuItem>
                </MenuList>
            </VStack>


        </>

    )
}
