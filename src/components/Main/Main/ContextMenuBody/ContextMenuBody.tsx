import { connectMenu, ContextMenu, MenuItem, ConnectMenuProps } from "react-contextmenu"
import styles from "./ContextMenuBody.module.css"

interface CustomConnectMenuProps extends ConnectMenuProps {
  trigger: {
    idItem: number
  }
}

const ContextMenuBody: React.FC<CustomConnectMenuProps> = (props) => {
  const clickHandle = () => {
    console.log(props.trigger.idItem)
  } 

  return (
    <>
      <ContextMenu 
        id={props.id}
        className={styles.contextMenu}
      >
        <MenuItem onClick={clickHandle}>
          Delete
        </MenuItem>
      </ContextMenu>
    </>
  )
}

export default connectMenu('context-menu')(ContextMenuBody);