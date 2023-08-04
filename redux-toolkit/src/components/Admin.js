import { useState } from "react";
import {
  useAddAccountMutation,
  useDeleteAccountMutation,
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from "../api/adminSlice";

function Admin() {
  const { data, error, isLoading, isSuccess } = useGetAccountsQuery();
  const [addAccount] = useAddAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [value, setValue] = useState(0);
  const [updateAccount] = useUpdateAccountMutation();

  const handleAddAccount = (value) => {
    // console.log(value);
    addAccount(value, data.length + 1);
    setValue(0);
  };

  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Admin Component</b>
        </h4>
        {isLoading?<p>Loading...</p>:''}
        {isSuccess && data &&
          data.map((account, id) => (
            <p key={id}>
              {account.id}: {account.amount}
              <button onClick={() => deleteAccount(account.id)}>
                Delete Account
              </button>
              <button
                onClick={() => updateAccount({ id: account.id, amount: 777 })}
              >
                Update Account
              </button>
            </p>
          ))}
        <input type="text" onChange={(e) => setValue(+e.target.value)}></input>
        {/* <button onClick={() => addAccount(value, data.length + 1)}>
          Add Account By {value}
        </button> */}
        <button onClick={() => handleAddAccount(value)}>
          Add Account By {value}
        </button>
      </div>
    </div>
  );
}

export default Admin;
