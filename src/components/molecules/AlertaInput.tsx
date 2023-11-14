import { Box, Button, Flex, FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useState } from "react"

export const AlertaInput = () => {

    const [value, setValue] = useState("");

    return (<Flex bg={'white'} borderRadius={10} mt={4} w={'100%'} flexDirection={'column'} padding={2}>
        <Flex flexDirection={'column'}>
            <FormControl>
                <FormLabel>Alerta</FormLabel>
                <Textarea value={value} onChange={(ev) => setValue(ev.target.value)} size={'sm'} placeholder='Nome do paciente que deseja chamar.' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <Flex mt={2}>
                <Box flex={1} />
                <Button size={'sm'}>
                    Enviar alerta
                </Button>
            </Flex>
        </Flex>
    </Flex>)
}