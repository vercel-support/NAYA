import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import styled from "styled-components"
import { ShopContext } from "../../context/shop-context"
import CartContainer from "../cart/cart-container"
import Logo from "../logo"
import { NavigationDesktop } from "../navigation"
import Button from "../_shared/button"
import ModalContainer from "../_shared/modal-container"

const Header = ({ siteTitle, openBasket }) => {
  const [isHidden, setIsHidden] = useState(false)
  const { openCart, setOpenCart, cart } = useContext(ShopContext)
  //const [isCartOpen, setOpenCart] = useState(false)

  const quantity = cart.totalProductsCount

  if (typeof window !== "undefined") {
    let prevScrollPosition = window.pageYOffset
    window.onscroll = () => {
      /* if (isCartOpen) {
        return
      } */
      window.pageYOffset < prevScrollPosition
        ? setIsHidden(false)
        : setIsHidden(true)
      prevScrollPosition = window.pageYOffset
    }
  }

  return (
    <>
      <Container hideHeader={isHidden}>
        {/*  <Column>
          <NavigationDesktop />
        </Column> */}
        <Column style={{margin: '0 auto'}}>
          <Logo styles={{ border: "solid", margin: '0 auto' }} />
        </Column>
        {/*   <Column>
          <Button
            basket
            quantity={quantity}
            onClick={() => setOpenCart(!openCart)}
          /> 
        </Column>*/}
      </Container>
      <ModalContainer isOpen={openCart} slideLeft={false}>
        <CartContainer closeCart={() => setOpenCart(false)} />
      </ModalContainer>
    </>
  )
}
//justify-content: space-between;
const Container = styled.header`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 60px;
  position: sticky;
  position: -webkit-sticky;
  z-index: 99;
  background-color: #fbfaf8;

  top: ${props => (props.hideHeader ? "-60px" : "0")};
  transition: top 0.5s;
`

const Column = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  &:first-child {
    justify-content: flex-start;
  }

  &:last-child {
    justify-content: flex-end;
  }
`

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
