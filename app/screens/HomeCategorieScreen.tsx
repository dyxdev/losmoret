import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { CategoryBlock } from "app/components/CategoryBlock"
import { NativeBaseProvider } from "native-base"
import { useHeader } from "app/utils/useHeader"
import { colors } from "app/theme/colors"
import { useCartHeader } from "app/hooks/customHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeCategorieScreenProps extends AppStackScreenProps<"HomeCategorie"> {}


const categories = [
  {
    id: 1,
    title: 'MEN',
    image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_489/v1500284127/pexels-photo-497848_yenhuf.jpg'
  },
  {
    id: 2,
    title: 'WOMEN',
    image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_460/v1500284237/pexels-photo-324030_wakzz4.jpg'
  },
  {
    id: 3,
    title: 'KIDS',
    image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_445/v1500284286/child-childrens-baby-children-s_shcevh.jpg'
  },
  {
    id: 4,
    title: 'ACCESORIES',
    image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_467/v1500284346/pexels-photo-293229_qxnjtd.jpg'
  }
  ];

function renderCategories() {
  const cat = [];
  for(var i=0; i<categories.length; i++) {
    cat.push(
      <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} />
    );
  }
  return cat;
}



export const HomeCategorieScreen: FC<HomeCategorieScreenProps> = observer(function HomeCategorieScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useCartHeader()
  
  return (
    <NativeBaseProvider>
    <Screen style={$root} preset="scroll">
       {renderCategories()}
    </Screen>
    </NativeBaseProvider>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
