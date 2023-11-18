import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { redirect, useRouter } from "next/navigation"
import { BackButton } from "../atoms/BackButton"


export const SemPermissao = (props) => {

    return (
        <Flex p="4" bg="#F8F9FC" minH="96vh" flexDirection={'column'}>   
            <Flex direction="column" align="center" justify="center" flex={1}>
                <Heading color="#4E73DF" mb="4">
                    Acesso Negado, {props.user.nomeTratamento}!
                </Heading>
                <Text color="gray.600" textAlign="center" mb="6">
                    Parece que você não tem permissão para acessar esta página.
                </Text>

                <BackButton colorScheme="brand" >Voltar</BackButton>
                {/* Adicione mais detalhes ou mensagens personalizadas aqui */}
            </Flex>

            {/* Adicione um footer estilizado */}
            <Box mt="auto" py="4" bg="brand.500" color="white" textAlign="center">
                © 2023 Maxson Araújo. Todos os direitos reservados.
            </Box>
        </Flex>
    )
}
