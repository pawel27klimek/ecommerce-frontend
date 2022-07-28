import Link from "next/link";
import {FiShoppingBag} from "react-icons/fi";
import {NavStyles, NavItems} from "../styles/NavStyles";
import Cart from "./Cart";
import store from "../lib/contex";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";

export default function Nav() {
  const {showCart, setShowCart, totalQuantities} = store();
  return (
    <NavStyles>
      <Link href={"/"}>Style</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{scale: 1}} initial={{scale: 0}}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Card</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
