import React from 'react'
import { Button, SideNav, SideNavItem } from 'react-materialize'
import sidenavImg from '../../assets/sidenavImg.jpg'

const MyButton = React.forwardRef( (props, ref) => <Button {...props}>&#8801;</Button> )

export const SideNavMenu = (props) => {
  return (
    <div>
      {/* <style>
        {`
            #root > div > div {
              z-index: 99999 !important;
            }
          `}
      </style> */}
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
