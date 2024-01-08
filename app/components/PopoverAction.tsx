import { Popover,Button } from "native-base";

import React, { PropsWithChildren } from "react"

interface PropsPopover {
    status: "primary|danger",
    titleButton: string,
    info: string
    
}
export function PopoverAction(props:PropsWithChildren<PropsPopover>){
    
    return (
        <Popover trigger={triggerProps => {
            return <Button {...triggerProps} shadow={2} colorScheme={props.status}>
                    {props.titleButton}
                  </Button>;
          }}>
              <Popover.Content w="32">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Body>
                  {props.info}
                </Popover.Body>
                <Popover.Footer justifyContent="flex-end">
                  <Button.Group space={2}>
                    <Button colorScheme="coolGray" variant="ghost">
                      Cancelar
                    </Button>
                    <Button colorScheme="danger">{props.titleButton}</Button>
                  </Button.Group>
                </Popover.Footer>
              </Popover.Content>
            </Popover>
    )
}