import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../components/Icons";
import { useStore } from "../context/store";
import { isValidEmail, isValidPhone } from "../utils/validators";

const EMPTY_FORM = { name: "", email: "", phone: "", password: "", confirm: "" };

// Xato bo'lsa tarjima kalitini, bo'lmasa "" qaytaradi
function validate(form) {
  const hasEmptyField = Object.values(form).some((value) => !value.trim());

  if (hasEmptyField) return "errors.fillAll";
  if (!isValidEmail(form.email)) return "errors.emailInvalid";
  if (!isValidPhone(form.phone)) return "errors.phoneInvalid";
  if (form.password.length < 6) return "errors.passwordShort";
  if (form.password !== form.confirm) return "errors.passwordMismatch";

  return "";
}

function RegisterPage() {
  const { user, register, showNotice, t } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  // Tizimga kirgan foydalanuvchi bu sahifani ko'rmaydi
  if (user) return <Navigate to="/" replace />;

  // Har bir input o'zining "name" atributi orqali form ichidagi maydonni yangilaydi
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate(form);
    if (validationError) return setError(validationError);

    const result = await register(form);
    if (result.error) return setError(result.error);

    showNotice("notice.registered", { name: result.user.name });
    navigate("/", { replace: true });
  };

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">{t("register.badge")}</span>
        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>{t("common.backToShop")}</span>
        </Link>
      </div>

      <h3 className="auth-title">{t("register.title")}</h3>
      <p className="auth-desc">{t("register.desc")}</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="register-name">
            {t("register.name")}
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            className="auth-input"
            placeholder="Azizbek Karimov"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-email">
              {t("login.email")}
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              className="auth-input"
              placeholder="azizbek@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-phone">
              {t("register.phone")}
            </label>
            <input
              id="register-phone"
              name="phone"
              type="tel"
              className="auth-input"
              placeholder="+998 90 123 45 67"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-password">
              {t("login.password")}
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              className="auth-input"
              placeholder={t("register.passwordPlaceholder")}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-confirm">
              {t("register.confirm")}
            </label>
            <input
              id="register-confirm"
              name="confirm"
              type="password"
              className="auth-input"
              placeholder={t("register.confirmPlaceholder")}
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {t(error)}
          </p>
        )}

        <button type="submit" className="auth-submit-btn">
          {t("register.badge")}
        </button>
      </form>

      <p className="auth-switch">
        {t("register.hasAccount")}{" "}
        <Link to="/login" className="auth-switch-link">
          {t("header.login")}
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
