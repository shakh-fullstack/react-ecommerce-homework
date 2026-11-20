import { ArrowLeftIcon } from "../components/Icons";
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <section className="auth-section" aria-label="Kirish">
      <div className="auth-card">
        <div className="auth-card-top">
          <span className="auth-badge">Kirish</span>
          <Link to="/" className="auth-back-btn">
            <ArrowLeftIcon />
            <span>Do‘konga qaytish</span>
          </Link>
        </div>

        <h3 className="auth-title">Hisobga kirish</h3>
        <p className="auth-desc">
          Buyurtmalar tarixi va savatingizni ko‘rish uchun hisobingizga kiring.
        </p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-email">
            Elektron pochta
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-input"
            placeholder="azizbek@example.com"
          />
        </div>

        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-password">
            Parol
          </label>
          <input
            id="login-password"
            type="password"
            className="auth-input"
            placeholder="Parolingizni kiriting"
          />
        </div>

        <label className="auth-checkbox-row">
          <input type="checkbox" className="auth-checkbox" />
          <span>Meni eslab qol</span>
        </label>

        <button type="button" className="auth-submit-btn">
          Kirish
        </button>
      </form>

        <p className="auth-switch">
          Hali hisobingiz yo‘qmi?{" "}
          <Link to="/register" className="auth-switch-link">
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
    