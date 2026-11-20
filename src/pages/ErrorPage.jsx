import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

// Router ichida biror xato bo'lsa shu sahifa ko'rsatiladi
function ErrorPage() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="page-shell">
      <main className="container main-content">
        <NotFoundPage isError={!isNotFound} />
      </main>
    </div>
  );
}

export default ErrorPage;
