import { PermissionsAndroid } from "react-native";

const permission = {
    read_external_storage:PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    write_external_storage:PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
}

const messages = {
    read_external_storage:"Permiso para poder leer ficheros de su almacenamiento",
    write_external_storage: "Permiso para poder escribir ficheros en su almacenamiento"
}

type PermissionsType = typeof permission
type PermissionsKey = keyof PermissionsType
type MessagesKey = keyof (typeof messages)


export async function RequestPermissions(permissionKey:PermissionsKey ,msg:MessagesKey,onError?:()=>void){
    try {
      const granted = await PermissionsAndroid.request(
        permission[permissionKey],
        {
          title: 'Los moret necesita de los permisos de su sistema',
          message: messages[msg],
          buttonNeutral: 'Preguntar despues',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use permission');
      } else {
        console.log('Permission denied');
        onError && onError()
      }
    } catch (err) {
      console.warn(err);
    }
  };