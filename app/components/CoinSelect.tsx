import { Box, Select, CheckCircleIcon } from "native-base"
import React from "react"

export function CoinSelect(){
    const [coin, setCoin] = React.useState("usd");
    return (
        <Box maxW="100" maxHeight="50" ml={2}>
        <Select 
        borderRadius={"lg"}
        height={"8"}
        color="white"
        selectedValue={coin} minWidth="100" accessibilityLabel="Seleccione una moneda" placeholder="Seleccione una moneda" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckCircleIcon size="5"/>

      }} mt={1} onValueChange={itemValue => setCoin(itemValue)}>
          <Select.Item label="USD" value="usd" />
          <Select.Item label="CUP" value="cup" />
          <Select.Item label="EUR" value="eur" />
        </Select>
      </Box>
    )
}