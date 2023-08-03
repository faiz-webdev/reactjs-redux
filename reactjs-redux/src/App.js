import "./App.css";
import Account from "./components/Account";
import Bonus from "./components/Bonus";
function App({ store }) {
  return (
    <div className="App">
      <h4>App</h4>
      <h3>Current Amount : {store.getState().account.amount}</h3>
      <h3>Total Bonus : {store.getState().bonus.points}</h3>

      <Account></Account>
      <Bonus store={store}></Bonus>
    </div>
  );
}

export default App;
