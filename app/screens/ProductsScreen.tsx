import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { useCartHeader } from "app/hooks/customHeader"
import { ProductBlock } from "app/components/Product"
import { NativeBaseProvider } from "native-base"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProductsScreenProps extends AppStackScreenProps<"Products"> {}

const ahumados = require("../../assets/images/ahumado.jpg")


const productos = [
  {
    id: 1,
    title: 'Productos ahumados',
    image: ahumados,
    stock: 10
  }
  ];

function renderProducts() {
  const cat = [];
  for(let i=0; i<productos.length; i++) {
    cat.push(
      <ProductBlock key={productos[i].id} id={productos[i].id} image={productos[i].image} title={productos[i].title} />
    );
  }
  return cat;
}



export const ProductsScreen: FC<ProductsScreenProps> = observer(function ProductsScreen(_props) {
  
  const { navigation } = _props
  
  useCartHeader(navigation)
  
  return (
    <NativeBaseProvider>
    <Screen style={$root} preset="scroll">
       {renderProducts()}
    </Screen>
    </NativeBaseProvider>
    
  )
})

const $root: ViewStyle = {
  flex: 1,
}
