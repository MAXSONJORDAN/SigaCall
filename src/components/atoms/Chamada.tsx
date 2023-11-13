import { Box, Flex, HStack, Heading, Icon, IconButton, Text, Tooltip, VStack } from "@chakra-ui/react"
import { type } from "os";
import * as icons from 'react-icons/md'

type IProps = {
    onClick?: () => void,
    nome: string,
    sala: string,
    hora: string

}
export const Chamada = (props: IProps) => {


    return (<>
        <Box borderRadius={10}shadow={'xl'} border={'1px'} borderColor={'gray.200'} bg={'white'} h={'70px'} w={'100%'} cursor={'pointer'} onClick={() => props.onClick ? props.onClick() : null}>
            <Flex padding={2}>
                <Flex textAlign={'left'} flex={1} direction={'column'}>
                    <Tooltip label={props.nome}>
                        <Heading w={'100%'} size={'md'} textAlign={'left'} noOfLines={1} textOverflow={'ellipsis'}>
                            {props.nome}
                        </Heading>
                    </Tooltip>
                    <Tooltip label={props.sala}>
                        <Heading w={'100%'} size={'xs'} flex={1} noOfLines={1} textOverflow={'ellipsis'}>
                            {props.sala}
                        </Heading>
                    </Tooltip>
                </Flex>
                <Flex direction={'column'}>
                    <IconButton size={'xs'} aria-label="repetir" icon={<Icon boxSize={'6'} as={icons['MdRefresh']} />} variant={'ghost'} colorScheme="purple" />
                    <Text>Hora: {props.hora}</Text>
                </Flex>

            </Flex>
        </Box >
    </>)
}