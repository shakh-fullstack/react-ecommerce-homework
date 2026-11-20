import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../components/Icons";
import { useStore } from "../context/store";
import { isValidEmail } from "../utils/validators";

function LoginPage() {
  const { user, login, showNotice, t } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  // Tizimga kirgan foydalanuvchi bu sahifani ko'rmaydi
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) return setError("errors.loginRequired");
    if (!isValidEmail(email)) return setError("errors.emailInvalid");
    if (password.length < 6) return setError("errors.passwordShort");

    const result = await login({ email, password, remember });
    if (result.error) return setError(result.error);

    showNotice("notice.welcome", { name: result.user.name });
    navigate("/", { replace: true });
  };

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">{t("login.badge")}</span>
        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>{t("common.backToShop")}</span>
        </Link>
      </div>

      <h3 className="auth-title">{t("login.title")}</h3>
      <p className="auth-desc">{t("login.desc")}</p>
      <p className="auth-hint">
        {t("login.demo")} azizbek@example.com / 123456
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-email">
            {t("login.email")}
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-input"
            placeholder="azizbek@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-password">
            {t("login.password")}
          </label>
          <input
            id="login-password"
            type="password"
            className="auth-input"
            placeholder={t("login.passwordPlaceholder")}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <label className="auth-checkbox-row">
          <input
            type="checkbox"
            className="auth-checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>{t("login.remember")}</span>
        </label>

        {error && (
          <p className="form-error" role="alert">
            {t(error)}
          </p>
        )}

        <button type="submit" className="auth-submit-btn">
          {t("login.submit")}
        </button>
      </form>

      <p className="auth-switch">
        {t("login.noAccount")}{" "}
        <Link to="/register" className="auth-switch-link">
          {t("header.register")}
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
