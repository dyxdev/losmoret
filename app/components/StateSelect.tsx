import { useStores } from "app/store";
import { observer } from "mobx-react-lite";
import { Box, Select, CheckCircleIcon } from "native-base"
import React, { useEffect,useMemo } from "react"


export const StateSelect = observer(() => {

    const {
        addressStore
    } = useStores()
   
    useEffect(()=>{
        addressStore.fetchStates()
    },[])

    const memo = useMemo(()=>[
        1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730
    ],[])


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
                {addressStore.stateArray.filter((value)=>{
                    return !memo.includes( Number.parseInt(value.id))
                }).map((value, index) => <Select.Item key={index} label={value.name} value={`${value.id}`} />)}


            </Select>
        </Box>
    )
})