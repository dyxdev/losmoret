import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen } from "app/components"
import { CategoryBlock } from "app/components/CategoryBlock"
import { useCartHeader } from "app/hooks/customHeader"
import { colors, spacing } from "app/theme"
import { useStores } from "app/store"
import { Fab, Box } from "native-base";
import { dialCall, sendWhatsAppMessage } from "app/utils/share"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeCategorieScreenProps extends AppStackScreenProps<"HomeCategorie"> {}

const ahumados = require("../../assets/images/ahumado.jpg")
const congelados = require("../../assets/images/congelados.jpg")
const embutidos = require("../../assets/images/embutido.jpg")
const lacteos = require("../../assets/images/lacteo.jpg")





export const HomeCategorieScreen: FC<HomeCategorieScreenProps> = observer(function HomeCategorieScreen(_props) {
  
  const { navigation } = _props
  
  useCartHeader(navigation)

  const {
    cartStore
  } = useStores()

  const categories = [
    {
      id: 1,
      title: 'AHUMADOS',
      image: ahumados,
      click: ()=>{
        cartStore.setCategoryName("Ahumados")
        navigation.navigate('Products')
      }
    },
    {
      id: 2,
      title: 'CONGELADOS',
      image: congelados,
      click: ()=>{
        cartStore.setCategoryName("Congelados")
        navigation.navigate('Products')
      }
    },
    {
      id: 3,
      title: 'EMBUTIDOS',
      image: embutidos,
      click: ()=>{
        cartStore.setCategoryName("Embutidos")
        navigation.navigate('Products')
      }
     },
    {
      id: 4,
      title: 'LÁCTEOS',
      image:  lacteos,
      click: ()=>{
        cartStore.setCategoryName("Lácteos")
        navigation.navigate('Products')
      }
    }
    ];
  
  function renderCategories() {
    const cat = [];
    for(let i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock 
        key={categories[i].id} 
        id={categories[i].id} 
        image={categories[i].image}
        title={categories[i].title} 
        click={categories[i].click}
        />
      );
    }
    return cat;
  }
  
  return (
    
    <Screen style={$root} preset="auto">
      
       {renderCategories()}
       <Box position="relative" h={10} w="100%">
         <Fab bgColor={colors.palette.secondary} bottom={160} onPress={()=>dialCall("58666060")} position="absolute" size="sm" icon={<Icon color="white" icon="phone" />}  />
         <Fab bgColor={colors.palette.secondary} bottom={100} onPress={()=>sendWhatsAppMessage()} position="absolute" size="sm" icon={<Icon icon="whatsapp" />}  />
      </Box>
       
    </Screen>
    
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.sm,
  backgroundColor: "#FFFFFF"
}
