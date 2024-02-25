import { useToastErrorApi } from "app/components/AlertToast"
import { goBack, navigate } from "app/navigators"
import { useStores } from "app/store"
import { colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCartHeader = (navigation: any)=>{
    const {
        authenticationStore
    } = useStores()
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'back',
            leftIconColor: 'white',
            rightIconColor: 'white',
            onLeftPress: async ()=> authenticationStore.logout(),
            onRightPress: ()=>navigation.navigate("Cart"),
            backgroundColor: colors.palette.primary
        }
    )
}

export const useBackHeader = ()=>{
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'back',
            leftIconColor: 'white',
            rightIconColor: 'white',
            onLeftPress: ()=>goBack(),
            backgroundColor: colors.palette.primary,
            onRightPress: ()=>navigate("Cart"),
        }
    )
}

export const useLeaveWebView = (navigation:any)=>{
    const { showToastInfoMessage } = useToastErrorApi()
    useHeader(
        {
            backgroundColor: colors.palette.primary,
            leftIcon: 'back',
            leftIconColor: 'white',
            onLeftPress: ()=>{
                showToastInfoMessage("Sera redirigido a la página principal")
                navigation.navigate("HomeCategorie")
            },

        }
    )
}