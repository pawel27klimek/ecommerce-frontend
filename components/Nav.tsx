import Link from "next/link";
import {FiShoppingBag} from "react-icons/fi";
import {NavStyles, NavItems} from "../styles/NavStyles";
import Cart from "./Cart";
import Store from "../lib/contex";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import User from "./User";
import {useUser} from "@auth0/nextjs-auth0";

export default function Nav() {
  const {showCart, setShowCart, totalQuantities} = Store();
  const {user, error, isLoading} = useUser();
  return (
    <NavStyles>
      <Link href={"/"}>Style</Link>

      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{scale: 1}} initial={{scale: 0}}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
