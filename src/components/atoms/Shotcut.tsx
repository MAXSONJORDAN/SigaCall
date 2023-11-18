import { Box, Flex, Heading, Icon, Tooltip, VStack } from "@chakra-ui/react"
import { Shotcuts } from "@prisma/client";
import * as icons from 'react-icons/md'

interface IProps extends Shotcuts {
    onClick?: () => void
}
export const Shotcut = (props: IProps) => {

    return (<>
        <Box _hover={{ backgroundColor: 'brand.300' }} shadow={'2xl'} borderRadius={10} bg={'brand.500'} h={'70px'} w={'99%'} cursor={'pointer'} onClick={() => props.onClick ? props.onClick() : null}>
            <Flex padding={2} color={'white'}>
                <VStack textAlign={'left'} flex={1}>
                    <Tooltip label={props.identificador}>
                        <Heading w={'100%'} size={'md'} textAlign={'left'} flex={1}  textOverflow={'ellipsis'}>
                            {props.identificador}
                        </Heading>
                    </Tooltip>
                    <Tooltip label={props.mensagem}>
                        <Heading w={'100%'} size={'xs'} flex={1} noOfLines={1} textOverflow={'ellipsis'}>
                            {props.mensagem}
                        </Heading>
                    </Tooltip>
                </VStack>
                <Icon as={icons[props.icone]} boxSize={'12'} />
            </Flex>
        </Box >
    </>)
}