import { useToastErrorApi } from "app/components/AlertToast"
import { CoinSelect } from "app/components/CoinSelect"
import { UserMenu } from "app/components/Menu"
import { goBack } from "app/navigators"
import { useStores } from "app/store"
import { colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import React from "react"
// eslint-disable-next-line @typescript-eslint/ban-types
export const useCartHeader = (navigation: any)=>{
    const {
        authenticationStore
    } = useStores()
    useHeader(
        {
            
            RightActionComponent: <UserMenu navigation={navigation}/>,
            onLeftPress: async ()=> authenticationStore.logout(),
            onRightPress: ()=>navigation.navigate("Cart"),
            backgroundColor: colors.palette.bgImage,
            LeftActionComponent: <CoinSelect />
        }
    )
}

export const useBackHeader = (navigation:any)=>{
    useHeader(
        {
            
            leftIcon: 'back',
            leftIconColor: 'white',
            onLeftPress: ()=>goBack(),
            RightActionComponent: <UserMenu navigation={navigation}/>,
            onRightPress: ()=>navigation.navigate("Cart"),
            backgroundColor: colors.palette.bgImage
        }
    )
}

export const useLeaveWebView = (navigation:any)=>{
    const { showToastInfoMessage } = useToastErrorApi()
    useHeader(
        {
            backgroundColor: colors.palette.bgImage,
            leftIcon: 'back',
            leftIconColor: 'white',
            onLeftPress: ()=>{
                showToastInfoMessage("Sera redirigido a la página principal")
                navigation.navigate("HomeCategorie")
            },

        }
    )
}