import { AlertDialog, Button } from "native-base";
import React from "react"

interface PropsAlert {
  status: "primary" | "danger",
  titleButton: string,
  isOpen: boolean,
  description: string,
  onOK: ()=>void,
  onClose: ()=>void
  isLoading: boolean
}

export const AlertShow = (props:PropsAlert) => {
  
  const cancelRef = React.useRef(null);
  return (
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={props.isOpen} onClose={props.onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{props.titleButton}</AlertDialog.Header>
          <AlertDialog.Body>
            {props.description}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={props.onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button isLoading={props.isLoading} colorScheme={props.status} onPress={()=>props.onOK()}>
                {props.titleButton}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      )
  
};