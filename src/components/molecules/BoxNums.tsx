import { Flex, HStack, VStack } from "@chakra-ui/react"
import { BoxNum } from "../atoms/BoxNum"

type BoxNum = {
    label: string,
    value: string | number | undefined
}
type IProps = {
    BoxNums: Array<BoxNum>
}
export const BoxNums = (props: IProps) => {

    return (
        <HStack height={'75px'}>
            {props.BoxNums.map(item => {
                return <><BoxNum {...item} /></>
            })}
        </HStack>
    )
}