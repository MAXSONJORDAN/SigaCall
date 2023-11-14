import { Box, Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react"
import { useState } from "react"


type IProps = {
    destino: any,
    onChange: (value: any) => void,
    destinos: any[]
}
export const DestinoSelector = (props: IProps) => {

    const [editMode, setEditMod] = useState(false);
    const [value, setValue] = useState(props.destino);

    return (
        <Flex bg={'white'} borderRadius={10} mt={4} w={'100%'} flexDirection={'column'} padding={2}>
            <Flex flexDirection={'row'}>
                <FormControl id="tratamentoId" size={'sm'}>
                    <FormLabel>Destino de Atendimento</FormLabel>
                    <Select
                        name="tratamentoId"
                        disabled={!editMode}
                        size={'sm'}
                        value={value}
                        onChange={(ev) => { setValue(ev.target.value) }}
                    >
                        {props.destinos.map((item: any) => {
                            return <option value={item.id}>{item.identificador}</option>
                        })}

                    </Select>
                </FormControl>
                <Flex mt={2}>
                    <Box flex={1} />
                    <Button ml={2} mt={6} size={'sm'}
                        onClick={() => {
                            if (!editMode) {
                                setEditMod(true);
                            } else {
                                props.onChange(value)
                                setEditMod(false)
                            }
                        }}
                    >
                        {editMode ? "Salvar" : "Alterar"}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}