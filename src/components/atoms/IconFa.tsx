'use client'
import { Icon, IconProps } from "@chakra-ui/react"
import * as Icons from "react-icons/fa"

interface IPropsIconFa extends IconProps {
    iconeName: string
}
export const IconFa = (props: IPropsIconFa) => {
    let otherProps: any = { ...props }
    delete otherProps['iconeName'];


    return (<Icon {...otherProps} as={Icons[props.iconeName]} />)
}