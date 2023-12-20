import { useSelector } from "react-redux";

const TestRedux = () => {
  const user = useSelector((state) => state.user);
  const nav = useSelector((state) => state.nav);
  // const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div>
      <div>TestRedux</div>
      <p>{ String(user.isSignedIn) }</p>
      <p>{ user.userInfo.name }</p>
      <p>{ user.userInfo.surname }</p>
      <p>{ user.userInfo.age }</p>
      <p>nav: { nav.index }</p>
    </div>
  );
};
export default TestRedux;
