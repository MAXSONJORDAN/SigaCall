import { Box, HStack, Heading, Icon, Tooltip, VStack } from "@chakra-ui/react"
import { type } from "os";
import * as icons from 'react-icons/md'

type IProps = {
    onClick?: () => void,
    title: string,
    description: string,

}
export const Shotcut = (props: IProps) => {


    return (<>
        <Box _hover={{backgroundColor:'purple.300'}}  borderRadius={10} bg={'purple.500'} h={'70px'} w={'99%'} cursor={'pointer'} onClick={() => props.onClick ? props.onClick() : null}>
            <HStack padding={2} color={'white'}>
                <VStack textAlign={'left'}>
                    <Tooltip label={props.title}>
                        <Heading w={'100%'} size={'md'} textAlign={'left'} flex={1} noOfLines={1} textOverflow={'ellipsis'}>
                            {props.title}
                        </Heading>
                    </Tooltip>
                    <Tooltip label={props.description}>
                        <Heading w={'100%'} size={'xs'} flex={1} noOfLines={1} textOverflow={'ellipsis'}>
                            {props.description}
                        </Heading>
                    </Tooltip>
                </VStack>
                <Icon as={icons['Md10K']} boxSize={'12'} />
            </HStack>
        </Box >
    </>)
}