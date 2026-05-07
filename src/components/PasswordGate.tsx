import { useState } from "react";
import { THEME, FONTS } from "../tokens";

interface Props {
  onUnlock: () => void;
}

function LockIcon() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: `1.5px solid ${THEME.accent}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 24px",
      }}
    >
      <svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        stroke={THEME.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="12" width="18" height="13" rx="2" />
        <path d="M6 12V8a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  );
}

export function PasswordGate({ onUnlock }: Props) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  function handleSubmit() {
    if (pw.toLowerCase().trim() === import.meta.env.VITE_APP_KEY) {
      onUnlock();
    } else {
      setErr(true);
    }
  }

  return (
    <div
      style={{
        background: THEME.bg,
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: 120,
      }}
    >
      <div
        style={{
          maxWidth: 380,
          width: "100%",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <LockIcon />
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: THEME.accent,
            marginBottom: 12,
          }}
        >
          Galería privada
        </div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: 40,
            lineHeight: 1.1,
            color: THEME.ink,
            margin: "0 0 12px",
          }}
        >
          Las fotos del día
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 13,
            fontStyle: "italic",
            color: THEME.inkSoft,
            margin: "0 0 32px",
          }}
        >
          Para invitados. Introduce la contraseña que te enviamos.
        </p>
        <input
          data-testid="password-input"
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${err ? THEME.accent : THEME.rule}`,
            padding: "8px 0",
            marginBottom: 24,
            fontFamily: FONTS.body,
            fontSize: 14,
            letterSpacing: 2,
            textAlign: "center",
            color: THEME.ink,
            outline: "none",
          }}
        />
        {err && (
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              fontStyle: "italic",
              color: THEME.accent,
              margin: "0 0 16px",
            }}
          >
            No es correcta. Inténtalo de nuevo.
          </p>
        )}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px 0",
            background: THEME.ink,
            color: THEME.bg,
            border: "none",
            borderRadius: 999,
            cursor: "pointer",
            fontFamily: FONTS.body,
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
