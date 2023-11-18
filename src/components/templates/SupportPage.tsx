
import React from 'react';
import { Box, Heading, Text, Link, VStack, Flex } from '@chakra-ui/react';
import { IconFa } from '../atoms/IconFa';

export const SupportPage = () => {

  return (
    <Flex p="4" bg="#F8F9FC" minH="97vh" flexDirection={'column'}>
      <Box flex={1}>
        <VStack spacing="4" align="center" justify="center" py="12" overscroll={'auto'} overflow={'auto'} height={'50vh'}>
          <Heading color="brand.500">Sobre o SigaCall</Heading>
          <Text color="gray.600" textAlign="center">
            Bem-vindo à página de informações sobre o SigaCall, um aplicativo desenvolvido por Maxson Araújo.
            Este servidor e frontend de guichê oferece uma solução eficiente para o gerenciamento de atendimentos,
            permitindo o chamado de senhas ou nomes.
          </Text>
          <Text color="gray.600" textAlign="center">
            O SigaCall é construído para garantir uma experiência suave e eficiente no gerenciamento de chamadas
            em ambientes diversos.
          </Text>
          <Text color="gray.600" textAlign="center">
            Para mais detalhes técnicos sobre instalação e execução, entre em contato pelo email:{' '}
            <Link color="brand.500" href="mailto:maxson.jordan@gmail.com">
              maxson.jordan@gmail.com
            </Link>
            .
          </Text>
        </VStack>

        {/* Informações de Suporte */}
        <VStack spacing="4" align="center" justify="center" py="2">
          <Heading color="brand.500">Suporte</Heading>
          <Text color="gray.600" textAlign="center">
            Se precisar de suporte técnico, entre em contato conosco pelos meios abaixo:
          </Text>
        </VStack>

        {/* Opções de contato para Suporte */}
        <Flex justify="center" align="center" py="4">
          <Box mx="2">
            <Link href="mailto:maxson.jordan@gmail.com" color="brand.500">
              <IconFa iconeName={'FaEnvelope'} mr="2" />
              maxson.jordan@gmail.com
            </Link>
          </Box>
          <Box mx="2">
            <Link href="tel:+5573988958985" color="brand.500">
              <IconFa iconeName={'FaPhone'} mr="2" />
              +55 73 98895-8985
            </Link>
          </Box>
          <Box mx="2">
            <Link href="https://wa.me/5573988958985" color="brand.500" isExternal>
              <IconFa iconeName={'FaWhatsapp'} mr="2" />
              WhatsApp
            </Link>
          </Box>
        </Flex>
      </Box>
      {/* Adicione um footer estilizado */}
      <Box mt="auto" py="4" bg="brand.500" color="white" textAlign="center">
        © 2023 Nome da Sua Empresa. Todos os direitos reservados.
      </Box>
    </Flex>
  );
};

export const revalidate = 0;
