import {
  useAddAccountMutation,
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "../api/adminSlice";

function Admin() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const [addAccount] = useAddAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Admin Component</b>
        </h4>
        {data &&
          data.map((account) => (
            <p>
              {account.id}: {account.amount}
              <button onClick={() => deleteAccount(account.id)}>
                Delete Account
              </button>
            </p>
          ))}
        <button onClick={() => addAccount(101, data.length + 1)}>
          Add Account
        </button>
      </div>
    </div>
  );
}

export default Admin;
