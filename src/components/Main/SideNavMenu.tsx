import React from 'react'
import { Button, SideNav, SideNavItem } from 'react-materialize'
import sidenavImg from '../../assets/sidenavImg.jpg'

type PropsType = {
  user: {
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
  },
  signOutHandler: () => void
}

const MyButton = React.forwardRef<HTMLButtonElement, any>( (props, ref) => <Button {...props}>&#8801;</Button> )

export const SideNavMenu: React.FC<PropsType> = (props): React.ReactElement => {
  return (
    <div>
      <SideNav
        id="SideNav-10"
        options={{
          draggable: true
        }}
        trigger={
          <MyButton 
            node="button"
            flat
            style={{fontSize: 60, marginTop: 10}}
          >&#8801;</MyButton>
        }
      >
        <SideNavItem
          user={{
            background: sidenavImg,
            email: props.user.email,
            image: props.user.photoURL,
            name: props.user.displayName,
          }}
          userView
        />
          <Button
            style={{
              marginRight: '5px',
              textAlign: 'center'
            }}
            waves="light"
            onClick={props.signOutHandler}
          >
            Sign out
          </Button>
      </SideNav>
    </div>
  )
}
