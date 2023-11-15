import { Flex, Heading, VStack } from "@chakra-ui/react"

type IProps = {
    label: string,
    value: string | number | undefined
}
export const BoxNum = (props: IProps) => {


    return (
        <Flex flex={1} bgColor={'white'} shadow={'base'} borderRadius={10}>
            <VStack w={'100%'} h={'100%'} color={'brand.500'} padding={2} borderBottomColor={'brand.500'} borderBottomWidth={'medium'}>
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