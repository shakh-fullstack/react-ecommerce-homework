import { ArrowLeftIcon } from "../components/Icons";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">Ro‘yxatdan o‘tish</span>

        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </Link>
      </div>

      <h3 className="auth-title">Yangi hisob yaratish</h3>
      <p className="auth-desc">
        Tezkor buyurtma berish va sevimlilarni saqlash uchun ro‘yxatdan o‘ting.
      </p>

      <form className="auth-form">
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="register-name">
            To‘liq ism
          </label>
          <input
            id="register-name"
            type="text"
            className="auth-input"
            placeholder="Azizbek Karimov"
          />
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-email">
              Elektron pochta
            </label>
            <input
              id="register-email"
              type="email"
              className="auth-input"
              placeholder="azizbek@example.com"
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-phone">
              Telefon raqam
            </label>
            <input
              id="register-phone"
              type="tel"
              className="auth-input"
              placeholder="+998 90 123 45 67"
            />
          </div>
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-password">
              Parol
            </label>
            <input
              id="register-password"
              type="password"
              className="auth-input"
              placeholder="Kamida 6 ta belgi"
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-confirm">
              Parolni tasdiqlang
            </label>
            <input
              id="register-confirm"
              type="password"
              className="auth-input"
              placeholder="Parolni qayta kiriting"
            />
          </div>
        </div>

        <button type="button" className="auth-submit-btn">
          Ro‘yxatdan o‘tish
        </button>
      </form>

      <p className="auth-switch">
        Allaqachon hisobingiz bormi?{" "}
        <Link to="/login" className="auth-switch-link">
          Kirish
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
