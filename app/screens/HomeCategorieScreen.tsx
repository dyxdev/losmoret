import React, { FC, useEffect, useState } from "react"
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
import { useToastErrorApi } from "app/components/AlertToast"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { getCategory } from "app/services/api/products/service"
import { Category } from "app/services/api/products/types"
import { PaginateResponse, ResultClass } from "app/services/api"
import { SkeletonCategory } from "app/components/Skeleton"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeCategorieScreenProps extends AppStackScreenProps<"HomeCategorie"> {}

//const ahumados = require("../../assets/images/ahumado.jpg")
//const congelados = require("../../assets/images/congelados.jpg")
//const embutidos = require("../../assets/images/embutido.jpg")
//const lacteos = require("../../assets/images/lacteo.jpg")


export const HomeCategorieScreen: FC<HomeCategorieScreenProps> = observer(function HomeCategorieScreen(_props) {
  
  const { navigation } = _props
  
  useCartHeader(navigation)

  const {
    cartStore
  } = useStores()

const [loading, setLoading] = useState(false)
const [categories,setCategories] = useState<Array<Category>>([])
const { showToastApiError } = useToastErrorApi()

  async function load() {
    
    setLoading(true)
    const response = await getCategory()
    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
      setLoading(false)
    } else{
      const items = ((response as ResultClass<any>).result as PaginateResponse<Category>).items
      setCategories(items)
      setLoading(false)
    }
  }
  /* const categories = [
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
    ]; */

    useEffect(()=>{
      load()
 },[])
  
  function renderCategories() {
    const cat = [];
    for(let i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock 
        key={categories[i].id} 
        id={categories[i].id} 
        image={categories[i].logo_url}
        title={categories[i].name} 
        click={()=>{
          cartStore.setCategoryName(categories[i].name)
          navigation.navigate('Products')
        }}
        />
      );
    }
    return cat;
  }

  function renderCategoriesSkeleton() {
    const cat = [];
    for(let i=0; i<5; i++) {
      cat.push(
        <SkeletonCategory 
        />
      );
    }
    return cat;
  }
    
  
  return (
    
    <Screen style={$root} preset="auto">
       {!loading && renderCategories()}
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
