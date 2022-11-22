import React, {  useContext, useEffect, useState } from 'react'
import { Container, ProductTable, Total } from './Cart-styles';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../checkout/Checkout.css'
import { TestContext } from '../../App';




const Cart = () => {
  ////props
  const {   updateDb, getDb, cart, clearTheCart, removeFromDb, getCart, setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser, setHeaderActive} = useContext(TestContext);

  const navigate = useNavigate();
/////state
  const [isCartEmpty, setIsCartEmpty] = useState(true);
 

/////checkout button 
useEffect(() => {
 if(cart.length < 1 ){setIsCartEmpty(false)} 

  setActiveTabCart(true)
  setActiveTabOrder(false)
  setActiveTabHome(false)
  setActiveTabUser(false)
  setHeaderActive(false)
}, [])

const ProceedtoPayment = () => {
  navigate("/checkout")      
}
const total = cart.reduce((total, prd) => total + prd.price * prd.abc , 0)

// const subTotal = cart.reduce(( prd) =>   parseInt(prd.price) * prd.abc )

// const subTotal = cart.reduce(( prd) =>   parseInt(prd.price) * prd.abc )
const incrs = (id) => {
  const exists = getDb();
    let shopping_cart = {};
    if (!exists) {
      shopping_cart[id] = 1;
    } 
    else {
      shopping_cart = JSON.parse(exists);
      if (shopping_cart[id]) {
        const newCount = shopping_cart[id] + 1;
        shopping_cart[id] = newCount;
      }
      else {
        shopping_cart[id] = 1;
      }
      updateDb(shopping_cart);
    console.log(shopping_cart);
    }
    getCart()
}

const dcrs = (id) => {
  const exists = getDb();
    let shopping_cart = {};
    if (!exists) {
      shopping_cart[id] = 1;
    } 
    else {
      shopping_cart = JSON.parse(exists);
      if (shopping_cart[id] > 1) {
        const newCount = shopping_cart[id] - 1 ;
        shopping_cart[id] = newCount;
      }
      
      else {
        testCart(id)
            }
      updateDb(shopping_cart);
    console.log(shopping_cart);
    }
    getCart()
}
const testCart = (id) => {
    console.log(id)
    removeFromDb(id)
}


  return (<>
    {cart.length >= 1   && <Container className='mt-10 home-page'>
    <ProductTable>
      <thead>
        <tr>
          <th />
          <th>PRODUCT</th>
          <th>AMOUNT</th>
          <th>SUBTOTAL</th>
        </tr>
      </thead>
      <tbody>
      {cart.map((cart, index) => (
            <tr key={`${cart.id}`}>
            <td>
              <img
              src={cart.images[0].src}
              alt={cart.name}
            />
            </td>
            <td>
              <strong>{cart.name}</strong>
              <span>{cart.price}</span>
            </td>
            <td>
              <div>
                <button type="button" >
                  <MdRemoveCircleOutline size={20} color="#7159c1" onClick={() => dcrs(cart.id)} />
                </button>
                <input type="number" readOnly value={`${cart.abc}`} />
                <button type="button"  onClick={() => incrs(cart.id)} >
                  <MdAddCircleOutline size={20} color="#7159c1"/>
                </button>
              </div>
            </td>
            <td>
              <strong>{cart.price * cart.abc}</strong>
            </td>
            <td>
              <button type="button"  onClick={() => removeFromDb(cart.id)} >
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        ) ) }
      </tbody>
    </ProductTable>

    <footer>

      <button onClick={() => ProceedtoPayment() } className="btn"  >

<span>Proceed to Checkout</span>
</button>


      <Total>
        <span>TOTAL</span>
        <strong>{total}</strong>
      </Total>
      <button  onClick={clearTheCart} >Clear Cart</button>

    </footer>



      {/* </div> */}
      
    {/* ))} */}

</Container> }  {cart < 1 && <p> NO Product Found</p> }</>
  )
}

export default Cart
