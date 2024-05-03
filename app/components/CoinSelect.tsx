import { useStores } from "app/store";
import { Box, Select, CheckCircleIcon } from "native-base"
import React from "react"


export function CoinSelect(){
    
    const {
      cartStore
    } = useStores()
    const [coin, setCoin] = React.useState("2");

    /* autorun(() => {
      setCoin(cartStore.pricelistApply)
    },{name:"onChangePricelist",}) */

    return (
        <Box maxW="100" maxHeight="50" ml={2}>
        <Select 
        borderRadius={"lg"}
        height={"8"}
        color="white"
        selectedValue={cartStore.pricelistApply} minWidth="100" accessibilityLabel="Seleccione una moneda" placeholder="Seleccione una moneda" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckCircleIcon size="5"/>

      }} mt={1} onValueChange={itemValue => {
        setCoin(itemValue)
        cartStore.applyPricelist(itemValue).then(()=>{console.log('Finish change coin')})
        }}>
          <Select.Item label="USD" value="2" />
          <Select.Item label="CUP" value="1" />
        </Select>
      </Box>
    )
}