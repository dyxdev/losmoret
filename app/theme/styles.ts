import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { spacing } from "./spacing"
import { colors } from "./colors"

export const $screenContentContainer: ViewStyle = {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  }
  
export const $signIn: TextStyle = {
    marginBottom: spacing.sm,
  }
  
export const $enterDetails: TextStyle = {
    marginBottom: spacing.lg,
  }
  
export const $hint: TextStyle = {
    color: colors.tint,
    marginBottom: spacing.md,
  }
  
export const $textField: ViewStyle = {
    marginBottom: spacing.lg,
  }
  
export const $tapButton: ViewStyle = {
    marginTop: spacing.xs,
    backgroundColor: colors.palette.secondary
  }
  
export const $image: ImageStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
  
export const $imageFull: ImageStyle = {
  
    width: '100%',
    height: '100%',
  }
  
export const $full: ViewStyle = {
    flex: 1
  }

export const $fullBg: ViewStyle = {
    flex: 1,
    backgroundColor:colors.palette.bgImage
  }

  export const $fullImage: ImageStyle = {
    
    width: '100%',
    height: '100%',
    
  }
  
export const contentCenter: ViewStyle = {
    padding: 40,
    flex: 1,
    justifyContent: "space-between",
  }
  
export const $viewImageStyle: ViewStyle = { marginTop: spacing.lg, width: 200, height: 200, alignSelf: "center" }
  