import {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "../features/user/user-api-slice";

const Dashboard = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery({});
  const { data: userById } = useGetUserByIdQuery("1");

  console.log(userById);
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error</h2>
      ) : (
        <div>
          {users?.users?.map((user: { id: string; firstName: string }) => (
            <div key={user.id}>{user.firstName}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
