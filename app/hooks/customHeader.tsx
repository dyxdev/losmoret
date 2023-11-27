import { colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCartHeader = (navigation: any)=>{
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'menu',
            leftIconColor: 'white',
            rightIconColor: 'white',
            onLeftPress: ()=>navigation.toggleDrawer(),
            backgroundColor: colors.palette.secondary
        }
    )
}