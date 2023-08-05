import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { deleteAsync, updateAsync, updateCartQtyAsync } from "./cartSlice";
import { useState } from "react";

export function Cart() {
  const items = useSelector((state) => state.cart.items);

  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    console.log(e.target.value);
    dispatch(updateAsync({ id, change: { quantity: +e.target.value } }));
  };

  const handleDesc = (e, item) => {
    if(item.quantity>1){
      dispatch(
        updateCartQtyAsync({
          id: item.id,
          change: { quantity: Number(item.quantity - 1) },
        })
      );
    }
  };

  const handleInc = (e, item) => {
    dispatch(
      updateCartQtyAsync({
        id: item.id,
        change: { quantity: Number(item.quantity + 1) },
      })
    );
  };

  const handleInput = (e, id) => {
    setQty(+e.target.value);
  };

  return (
    <div>
      <div>
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <img className="img-fluid" src={item.thumbnail} alt="" />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              {/* <select
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select> */}
              <button onClick={(e)=>handleDesc(e, item)}>-</button>
              <input
              disabled
                type="text"
                value={item.quantity}
                style={{ width: "50px" }}
                onChange={(e) => handleInput(e, item.id)}
              />
              <button onClick={(e) => handleInc(e, item)}>+</button>
            </div>
            <div className="close">
              <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
      </div>
      <h2>
        Total:{" "}
        {items.reduce((acc, item) => item.price * item.quantity + acc, 0)}
      </h2>
    </div>
  );
}
