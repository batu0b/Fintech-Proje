import Spinner from "react-bootstrap/Spinner";

export default function LoaderPage() {
  return (
    <div style={{ height: "100vh" , display: "flex" , justifyContent: "center" , alignItems: "center"}}>
      <Spinner animation="grow" />
    </div>
  );
}


