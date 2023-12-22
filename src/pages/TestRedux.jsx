import { useSelector } from "react-redux";

const TestRedux = () => {
  const user = useSelector((state) => state.user);
  const nav = useSelector((state) => state.nav);
  return (
    <div>
      <p>{String(user.isSignedIn)}</p>
      <p>{user.userInfo.name}</p>
      <p>{user.userInfo.email}</p>
      <p>{user.userInfo.date}</p>
    </div>
  );
};
export default TestRedux;
