import { useStores } from "app/store";
import { observer } from "mobx-react-lite";
import { Box, Select, CheckCircleIcon } from "native-base"
import React, { useEffect } from "react"


export const StateSelect = observer(() => {

    const {
        addressStore
    } = useStores()
   
    useEffect(()=>{
        addressStore.fetchStates()
    },[])


    return (
        <Box w="100%" maxW="90%" maxHeight="100">
            <Select
                borderRadius={"lg"}
                height={"10"}
                color="white"
                selectedValue={`${addressStore.state}`} minWidth="100" accessibilityLabel="Seleccione un estado/provincia" placeholder="Seleccione un estado/provincia" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckCircleIcon size="5" />

                }} mt={1} onValueChange={itemValue => {
                    console.log(itemValue)
                    addressStore.setState(Number.parseInt(itemValue))
                }}>
                {addressStore.stateArray.map((value, index) => <Select.Item key={index} label={value.name} value={`${value.id}`} />)}


            </Select>
        </Box>
    )
})