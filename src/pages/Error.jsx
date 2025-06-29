import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div>
      <p>error</p>
      <button onClick={() => navigate("/")}>Return to home</button>
    </div>
  );
}
export default Error;
