import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMsg: string = "";

  if (isRouteErrorResponse(error)) {
    errorMsg = error.statusText;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  } else if (typeof error === "string") {
    errorMsg = error;
  } else {
    errorMsg = "Unknown Error";
  }

  console.error(errorMsg);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{errorMsg}</i>
      </p>
    </div>
  );
}
