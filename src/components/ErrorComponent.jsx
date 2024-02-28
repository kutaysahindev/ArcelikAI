import { useNavigate, useRouteError } from "react-router";

const ErrorComponent = () => {
    let error = useRouteError();
    const navigate = useNavigate()

    // console.log('Error:', error);

    return (
        <div style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "#ff000088",
            padding: "30px",
            color: "white",
            fontSize: "20px",
            borderRadius: "10px",
            backdropFilter: "blur(10px)"
          }}>
            <h1 style={{fontWeight: "bolder"}}>Oops! Something went wrong.</h1>
            <p style={{fontStyle: "italic"}}>{ error.message }</p>
            <button onClick={() => navigate("/home")} style={{
              padding: "5px",
              marginTop: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              width: "fit-content",
              alignSelf: "center",
              cursor: "pointer"
            }}>Go to home page</button>
          </div>
        </div>
    );
};

export default ErrorComponent;
