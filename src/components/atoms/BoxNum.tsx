import { Flex, Heading, VStack } from "@chakra-ui/react"

type IProps = {
    label: string,
    value: string | number | undefined
}
export const BoxNum = (props: IProps) => {


    return (
        <Flex flex={1} bgColor={'purple.500'} borderRadius={10}>
            <VStack w={'100%'} h={'100%'} color={'white'} padding={2}>
                <Heading size={'sm'}>
                    {props.label}
                </Heading>
                <Heading size={'lg'}>
                    {props.value}
                </Heading>
            </VStack>
        </Flex>
    )
}