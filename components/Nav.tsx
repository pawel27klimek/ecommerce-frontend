import Link from "next/link";
import {FiShoppingBag} from "react-icons/fi";
import {NavStyles, NavItems} from "../styles/NavStyles";
import Cart from "./Cart";
import store from "../lib/contex";

export default function Nav() {
  const {showCart, setShowCart, totalQuantities} = store();
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <span>{totalQuantities}</span>}
          <FiShoppingBag />
          <h3>Card</h3>
        </div>
      </NavItems>

      {showCart && <Cart />}
    </NavStyles>
  );
}
