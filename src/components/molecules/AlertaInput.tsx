import { Box, Button, Flex, FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useState } from "react"


type IProps = {
    onClick?: (mensagem) => void,
    chamando?: boolean,
}
export const AlertaInput = (props: IProps) => {

    const [value, setValue] = useState("");
    const chamando = props.chamando;

    return (<Flex bg={'white'} borderRadius={10} mt={4} w={'100%'} flexDirection={'column'} padding={2}>
        <Flex flexDirection={'column'}>
            <FormControl>
                <FormLabel>Alerta Customizado</FormLabel>
                <Textarea disabled={chamando} value={chamando ? "Alertando..." : value} onChange={(ev) => setValue(ev.target.value)} size={'sm'} placeholder='Mensagem personalizada que deseja enviar.' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <Flex mt={2}>
                <Box flex={1} />
                <Button disabled={chamando} colorScheme={chamando?'gray':"brand"} color={chamando?'gray.500':'white'} size={'sm'} onClick={() => {
                    if (props.onClick) {
                        props.onClick(value)
                        setValue("");
                    }
                }}>
                    Enviar alerta
                </Button>
            </Flex>
        </Flex>
    </Flex>)
}