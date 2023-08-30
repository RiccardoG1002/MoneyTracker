import { Link, useNavigate, useRouteError } from "react-router-dom";

// libraries
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Oh oh! We've got a problem! 🚨</h1>
      <h4>{error.message || error.statusText}</h4>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={20}></ArrowLeftIcon>
          <span>Go back</span>
        </button>
        <Link to="/" className="btn">
          <HomeIcon width={20}></HomeIcon>
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};
export default Error;
