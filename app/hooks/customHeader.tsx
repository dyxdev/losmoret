import { useHeader } from "app/utils/useHeader"

export const useCartHeader = ()=>{
    useHeader(
        {
            rightIcon: 'cart',
            leftIcon: 'menu'
        }
    )
}