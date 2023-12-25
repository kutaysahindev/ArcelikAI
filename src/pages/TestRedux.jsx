import { useSelector } from "react-redux";

const TestRedux = () => {
  const user = useSelector((state) => state.user);
  const nav = useSelector((state) => state.nav);

  return (
    <div>
      <p style={{fontSize: "70px"}}>{ String(user.isSignedIn) }</p>
      <p style={{fontSize: "70px"}}>{ user.userInfo.name }</p>
      <p style={{fontSize: "70px"}}>{ user.userInfo.email }</p>
      <p style={{fontSize: "70px"}}>{ user.userInfo.date }</p>
    </div>
  );
};
export default TestRedux;
