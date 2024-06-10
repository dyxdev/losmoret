import { useStores } from "app/store";
import { observer } from "mobx-react-lite";
import { Center, Select, CheckCircleIcon } from "native-base"
import React from "react"


export const CoinSelect = observer ( () => {
    
    const {
      cartStore
    } = useStores()
    
    /* autorun(() => {
      setCoin(cartStore.pricelistApply)
    },{name:"onChangePricelist",}) */

    return (
        <Center maxW="100" maxHeight="70" ml={2}>
        <Select 
        borderRadius={"lg"}
        height={"10"}
        color="white"
        selectedValue={cartStore.pricelistApply} minWidth="100" accessibilityLabel="Seleccione una moneda" placeholder="Seleccione una moneda" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckCircleIcon size="5"/>

      }} mt={1} onValueChange={itemValue => {
        cartStore.setCoin(itemValue)
        cartStore.applyPricelist(itemValue).then(()=>{console.log('Finish change coin')})
        }}>
          <Select.Item label="USD" value="2" />
          <Select.Item label="CUP" value="1" />
        </Select>
      </Center>
    )
})