import { useDispatch } from "react-redux";
import "./Products.css";
import { fetchAsync } from "./productsSlice";

export function Products() {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAsync())}
        >
          Fetch Products
        </button>

        <div className="card">
          <img src="jeans3.jpg" alt="Denim Jeans" style={{ width: "100%" }} />
          <h1>Tailored Jeans</h1>
          <p className="price">$19.99</p>
          <p>Some text about the jeans..</p>
          <p>
            <button>Add to Cart</button>
          </p>
        </div>
      </div>
    </div>
  );
}
