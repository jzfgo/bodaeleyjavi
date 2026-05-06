// Direction B — Olive / Sage
// Warm romantic palette: cream, deep olive ink, sage accent.
// Type: "DM Serif Display" + "Jost" by default. Softer, more "garden party".

const B_THEME = {
  // Palette borrowed from Direction A — warm cream + terracotta.
  bg: '#f5efe6',
  bg2: '#ede5d6',
  ink: '#2b1d12',
  inkSoft: '#5a4632',
  rule: '#d8cbb6',
  accent: '#b85a3a',   // terracotta
  accentSoft: '#e9c5b3',
};

const B_FONTS = {
  display: '"DM Serif Display", "Cormorant Garamond", Georgia, serif',
  body: '"Jost", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ── shared bits ──────────────────────────────────────────────
function BPlaceholder({ ratio = '4/5', label, style = {} }) {
  return (
    <div style={{
      aspectRatio: ratio,
      background: `repeating-linear-gradient(135deg, ${B_THEME.bg2} 0 14px, ${B_THEME.bg} 14px 28px)`,
      border: `1px solid ${B_THEME.rule}`,
      borderRadius: 4,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
      padding: 12, color: B_THEME.inkSoft,
      fontFamily: B_FONTS.mono, fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase',
      ...style,
    }}>
      <span style={{ background: B_THEME.bg, padding: '3px 6px', border: `1px solid ${B_THEME.rule}`, borderRadius: 2 }}>
        {label}
      </span>
    </div>
  );
}

function BNav({ page, onPage }) {
  const items = [
    { id: 'home', label: 'Inicio' },
    { id: 'galeria', label: 'Galería' },
  ];
  return (
    <div style={{
      padding: '24px 48px', background: B_THEME.bg, textAlign: 'center',
    }}>
      <div style={{
        fontFamily: B_FONTS.display, fontSize: 26, color: B_THEME.ink,
        lineHeight: 1, marginBottom: 4,
      }}>
        Elena <span style={{ fontFamily: B_FONTS.body, fontSize: 14, fontStyle: 'italic', color: B_THEME.accent }}>&amp;</span> Javier
      </div>
      <div style={{
        fontFamily: B_FONTS.body, fontSize: 10, letterSpacing: 5,
        textTransform: 'uppercase', color: B_THEME.inkSoft, marginBottom: 18,
      }}>
        15 noviembre 2025
      </div>
      <div style={{
        height: 1, width: 80, background: B_THEME.accent,
        margin: '0 auto 18px',
      }} />
      <nav style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        {items.map((it) => (
          <button key={it.id} onClick={() => onPage(it.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: B_FONTS.body, fontSize: 13, fontWeight: 400,
            padding: '4px 0', color: page === it.id ? B_THEME.accent : B_THEME.ink,
            fontStyle: page === it.id ? 'italic' : 'normal',
          }}>{it.label}</button>
        ))}
      </nav>
    </div>
  );
}

function BFooter() {
  return (
    <div style={{
      padding: '56px 48px 40px', background: B_THEME.bg,
      color: B_THEME.inkSoft, fontFamily: B_FONTS.body, fontSize: 12,
      textAlign: 'center', lineHeight: 1.8,
      borderTop: `1px solid ${B_THEME.rule}`,
    }}>
      <div style={{ fontFamily: B_FONTS.display, fontSize: 24, color: B_THEME.ink, marginBottom: 10 }}>
        Gracias
      </div>
      <div style={{ marginBottom: 4 }}>
        Por compartir con nosotros un día tan especial.
      </div>
      <div style={{ letterSpacing: 3, textTransform: 'uppercase', fontSize: 10, marginTop: 24, color: B_THEME.accent }}>
        elenica@gmail.com · #bodaeleyjavi2025
      </div>
    </div>
  );
}

// ── Hero variants ────────────────────────────────────────────
function BHeroCentered() {
  return (
    <div style={{ padding: '32px 48px 80px', textAlign: 'center', background: B_THEME.bg }}>
      <div style={{ maxWidth: 320, margin: '0 auto 36px' }}>
        <BPlaceholder ratio="4/5" label="foto · pareja" />
      </div>
      <div style={{
        fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
        textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 18,
      }}>
        Recuerdos del día
      </div>
      <h1 style={{
        fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 84,
        lineHeight: 1, color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
      }}>
        Elena
      </h1>
      <div style={{
        fontFamily: B_FONTS.body, fontStyle: 'italic', fontSize: 22,
        color: B_THEME.accent, margin: '4px 0',
      }}>&amp;</div>
      <h1 style={{
        fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 84,
        lineHeight: 1, color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
      }}>
        Javier
      </h1>
      <div style={{
        marginTop: 36, fontFamily: B_FONTS.body, fontSize: 12,
        letterSpacing: 5, textTransform: 'uppercase', color: B_THEME.inkSoft,
      }}>
        15 . 11 . 2025  ·  Pamplona
      </div>
    </div>
  );
}

function BHeroSplit() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 540, background: B_THEME.bg }}>
      <BPlaceholder ratio="auto" style={{ aspectRatio: 'auto', height: '100%', borderRadius: 0 }} label="foto · vertical" />
      <div style={{ padding: '80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: B_FONTS.body, fontSize: 10, letterSpacing: 5,
          textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 28,
        }}>
          Nuestra boda
        </div>
        <h1 style={{
          fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 64,
          lineHeight: 1.05, color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
        }}>
          Elena
          <span style={{
            display: 'block', fontFamily: B_FONTS.body, fontStyle: 'italic',
            fontSize: 24, color: B_THEME.accent, margin: '6px 0',
          }}>&amp;</span>
          Javier
        </h1>
        <div style={{
          marginTop: 36, height: 1, width: 60, background: B_THEME.accent,
        }} />
        <div style={{
          marginTop: 24, fontFamily: B_FONTS.body, fontSize: 14,
          color: B_THEME.inkSoft, lineHeight: 1.7,
        }}>
          <div style={{ letterSpacing: 4, textTransform: 'uppercase', fontSize: 10, color: B_THEME.ink, marginBottom: 8 }}>
            15 noviembre 2025
          </div>
          Ciudadela de Pamplona<br />Navarra, España
        </div>
      </div>
    </div>
  );
}

function BHeroFullbleed() {
  return (
    <div style={{ position: 'relative', height: 600, background: B_THEME.bg2, overflow: 'hidden' }}>
      <BPlaceholder ratio="auto" label="foto · panorámica" style={{ aspectRatio: 'auto', height: '100%', border: 'none', borderRadius: 0 }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(45,50,33,0) 0%, rgba(45,50,33,0.4) 70%, rgba(45,50,33,0.6) 100%)',
        color: B_THEME.bg, textAlign: 'center', padding: 24,
      }}>
        <div style={{
          fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', marginBottom: 24, opacity: 0.85,
        }}>15 . 11 . 2025</div>
        <h1 style={{
          fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 100,
          lineHeight: 1, margin: 0, letterSpacing: -1,
          textShadow: '0 2px 30px rgba(0,0,0,0.25)',
        }}>
          Elena <span style={{ fontStyle: 'italic', fontSize: 64, fontWeight: 400 }}>&amp;</span> Javier
        </h1>
        <div style={{
          marginTop: 32, fontFamily: B_FONTS.body, fontSize: 12,
          letterSpacing: 4, textTransform: 'uppercase', opacity: 0.85,
        }}>Pamplona · Navarra</div>
      </div>
    </div>
  );
}

// ── Pages ────────────────────────────────────────────────────
function BHomePage({ heroVariant }) {
  const Hero = heroVariant === 'split' ? BHeroSplit
    : heroVariant === 'fullbleed' ? BHeroFullbleed
    : BHeroCentered;
  return (
    <div>
      <Hero />
      <div style={{ background: B_THEME.bg, padding: '88px 48px 64px' }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p style={{
            fontFamily: B_FONTS.display, fontSize: 26, lineHeight: 1.5,
            fontWeight: 400, margin: 0, color: B_THEME.ink,
          }}>
            "Aún seguimos flotando. Aquí están los recuerdos de un día que, gracias a todos, fue inolvidable."
          </p>
          <div style={{
            fontFamily: B_FONTS.body, fontStyle: 'italic',
            fontSize: 13, color: B_THEME.accent, marginTop: 18,
          }}>— Elena &amp; Javi</div>
        </div>

      </div>
    </div>
  );
}

function BProgramaPage() {
  const items = [
    { time: '13:00', title: 'Bienvenida', detail: 'Llegada a la Ciudadela de Pamplona' },
    { time: '13:30', title: 'Ceremonia', detail: 'Ciudadela · Av. del Ejército s/n' },
    { time: '14:30', title: 'Autobús', detail: 'Salida hacia Gorráiz' },
    { time: '15:00', title: 'Banquete', detail: 'Restaurante Castillo de Gorráiz' },
    { time: '18:30', title: 'Baile', detail: 'Fiesta en los jardines del castillo' },
    { time: '02:00', title: 'Vuelta', detail: 'Autobús al centro de Pamplona' },
  ];
  return (
    <div style={{ background: B_THEME.bg, padding: '64px 48px 96px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 14,
        }}>Cómo fue el día</div>
        <h2 style={{
          fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 60,
          color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
        }}>Programa</h2>
        <div style={{ height: 1, width: 60, background: B_THEME.accent, margin: '24px auto 0' }} />
      </div>

      <div style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
        {/* center timeline rule */}
        <div style={{
          position: 'absolute', left: 100, top: 12, bottom: 12,
          width: 1, background: B_THEME.rule,
        }} />
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '90px 22px 1fr',
            gap: 16, padding: '20px 0', alignItems: 'flex-start',
          }}>
            <div style={{
              fontFamily: B_FONTS.display, fontSize: 24,
              color: B_THEME.ink, lineHeight: 1, textAlign: 'right',
              paddingTop: 4,
            }}>{it.time}</div>
            <div style={{ position: 'relative', height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 6 }}>
              <div style={{
                width: 9, height: 9, borderRadius: '50%',
                background: B_THEME.accent, border: `2px solid ${B_THEME.bg}`,
                boxShadow: `0 0 0 1px ${B_THEME.accent}`, position: 'relative', zIndex: 1,
              }} />
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{
                fontFamily: B_FONTS.body, fontSize: 16, fontWeight: 500,
                color: B_THEME.ink, marginBottom: 3,
              }}>{it.title}</div>
              <div style={{ fontFamily: B_FONTS.body, fontSize: 13, color: B_THEME.inkSoft, lineHeight: 1.5 }}>
                {it.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BAlojamientoPage() {
  const hotels = [
    { name: 'Hotel Tres Reyes', dist: '5 min de la Ciudadela', desc: 'Cuatro estrellas, en pleno centro junto al parque de la Taconera.', tag: 'Recomendado' },
    { name: 'Gran Hotel La Perla', dist: 'Plaza del Castillo', desc: 'Histórico, a un paso del casco viejo. Ideal si quieres pasear por la noche.', tag: null },
    { name: 'NH Pamplona Iruña Park', dist: '10 min en taxi', desc: 'Más amplio, opción cómoda si venís en coche o en familia.', tag: null },
    { name: 'Pensión Santa Cecilia', dist: 'Centro', desc: 'Opción sencilla y económica para una o dos noches.', tag: 'Económico' },
  ];
  return (
    <div style={{ background: B_THEME.bg, padding: '64px 48px 96px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 14,
        }}>Dónde dormir</div>
        <h2 style={{
          fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 60,
          color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
        }}>Alojamiento</h2>
        <p style={{
          fontFamily: B_FONTS.body, fontSize: 14, color: B_THEME.inkSoft,
          maxWidth: 520, margin: '24px auto 0', lineHeight: 1.7, fontStyle: 'italic',
        }}>
          Pamplona se recorre a pie sin esfuerzo. Estas son nuestras recomendaciones.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, maxWidth: 720, margin: '0 auto' }}>
        {hotels.map((h, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr auto',
            gap: 32, padding: '32px 8px', alignItems: 'center',
            borderTop: `1px solid ${B_THEME.rule}`,
            borderBottom: i === hotels.length - 1 ? `1px solid ${B_THEME.rule}` : 'none',
          }}>
            <BPlaceholder ratio="3/2" label={`hotel ${i + 1}`} style={{ borderRadius: 6 }} />
            <div>
              <div style={{
                fontFamily: B_FONTS.display, fontSize: 26, color: B_THEME.ink,
                marginBottom: 4,
              }}>{h.name}</div>
              <div style={{
                fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 3,
                textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 10,
              }}>{h.dist}</div>
              <div style={{ fontFamily: B_FONTS.body, fontSize: 14, color: B_THEME.inkSoft, lineHeight: 1.6 }}>
                {h.desc}
              </div>
            </div>
            {h.tag && (
              <div style={{
                fontFamily: B_FONTS.body, fontSize: 10, letterSpacing: 2.5,
                textTransform: 'uppercase', color: B_THEME.accent,
                border: `1px solid ${B_THEME.accent}`, padding: '6px 12px', borderRadius: 999,
                whiteSpace: 'nowrap',
              }}>{h.tag}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BGaleriaPage() {
  const [unlocked, setUnlocked] = React.useState(false);
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [openIdx, setOpenIdx] = React.useState(null);

  const submit = () => {
    if (pw.toLowerCase().trim() === 'pamplona2025') setUnlocked(true);
    else { setErr(true); setPw(''); }
  };

  if (!unlocked) {
    return (
      <div style={{
        background: B_THEME.bg, padding: '120px 48px 160px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: 380, width: '100%', textAlign: 'center',
          padding: '56px 36px',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            border: `1px solid ${B_THEME.accent}`, margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: B_THEME.accent,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="11" width="14" height="10" rx="1" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <div style={{
            fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
            textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 14,
          }}>Galería privada</div>
          <h2 style={{
            fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 40,
            color: B_THEME.ink, margin: '0 0 14px', lineHeight: 1.1,
          }}>
            Las fotos del día
          </h2>
          <p style={{
            fontFamily: B_FONTS.body, fontSize: 14, color: B_THEME.inkSoft,
            lineHeight: 1.6, margin: '0 0 28px', fontStyle: 'italic',
          }}>
            Para invitados. Introduce la contraseña que te enviamos.
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Contraseña"
            style={{
              width: '100%', padding: '14px 16px',
              border: 'none', borderBottom: `1px solid ${err ? B_THEME.accent : B_THEME.rule}`,
              background: 'transparent', fontFamily: B_FONTS.body, fontSize: 14,
              color: B_THEME.ink, outline: 'none', marginBottom: 24,
              boxSizing: 'border-box', textAlign: 'center', letterSpacing: 2,
            }}
          />
          <button onClick={submit} style={{
            width: '100%', padding: '14px 14px', border: `1px solid ${B_THEME.ink}`,
            cursor: 'pointer', background: B_THEME.ink, color: B_THEME.bg,
            fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 4,
            textTransform: 'uppercase', borderRadius: 999,
          }}>Entrar</button>
          {err && (
            <div style={{
              fontFamily: B_FONTS.body, fontSize: 12, color: B_THEME.accent,
              marginTop: 18, fontStyle: 'italic',
            }}>
              No es correcta. Pista: ciudad · año.
            </div>
          )}
          <div style={{
            fontFamily: B_FONTS.mono, fontSize: 10, color: B_THEME.inkSoft,
            marginTop: 28, opacity: 0.6,
          }}>(demo: pamplona2025)</div>
        </div>
      </div>
    );
  }

  const photos = Array.from({ length: 18 }, (_, i) => i);
  const layout = ['4/5', '4/5', '1/1', '4/5', '4/5', '4/5', '1/1', '4/5', '4/5'];
  return (
    <div style={{ background: B_THEME.bg, padding: '64px 48px 96px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', color: B_THEME.accent, marginBottom: 14,
        }}>15 noviembre 2025</div>
        <h2 style={{
          fontFamily: B_FONTS.display, fontWeight: 400, fontSize: 60,
          color: B_THEME.ink, margin: 0, letterSpacing: -0.5,
        }}>Galería</h2>
        <div style={{ height: 1, width: 60, background: B_THEME.accent, margin: '24px auto 18px' }} />
        <p style={{
          fontFamily: B_FONTS.body, fontSize: 14, color: B_THEME.inkSoft,
          maxWidth: 520, margin: '0 auto', lineHeight: 1.7, fontStyle: 'italic',
        }}>
          Iremos subiendo fotos en los próximos días. Si tienes alguna que quieras compartir,
          escríbenos a elenica@gmail.com.
        </p>
      </div>

      <div style={{
        columnCount: 3, columnGap: 12, maxWidth: 980, margin: '0 auto',
      }}>
        {photos.map((i) => (
          <div key={i} style={{ breakInside: 'avoid', marginBottom: 12, cursor: 'zoom-in' }} onClick={() => setOpenIdx(i)}>
            <BPlaceholder
              ratio={layout[i % layout.length]}
              label={`foto ${String(i + 1).padStart(2, '0')}`}
              style={{ borderRadius: 4 }}
            />
          </div>
        ))}
      </div>

      {openIdx !== null && (
        <BLightbox
          photos={photos}
          layout={layout}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onNav={(d) => setOpenIdx((i) => (i + d + photos.length) % photos.length)}
        />
      )}

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button style={{
          padding: '14px 36px', background: 'transparent',
          border: `1px solid ${B_THEME.ink}`, cursor: 'pointer',
          fontFamily: B_FONTS.body, fontSize: 11, letterSpacing: 4,
          textTransform: 'uppercase', color: B_THEME.ink, borderRadius: 999,
        }}>Cargar más</button>
      </div>
    </div>
  );
}

// ── Site shell ───────────────────────────────────────────────
function SiteB({ heroVariant = 'centered', typePairing = 'dmserif-jost' }) {
  const [page, setPage] = React.useState('home');

  const fonts = React.useMemo(() => {
    if (typePairing === 'cormorant-inter') {
      return { display: '"Cormorant Garamond", Georgia, serif', body: '"Inter", system-ui, sans-serif' };
    }
    if (typePairing === 'playfair-nunito') {
      return { display: '"Playfair Display", Georgia, serif', body: '"Nunito Sans", system-ui, sans-serif' };
    }
    if (typePairing === 'dmserif-jost') {
      return { display: '"DM Serif Display", Georgia, serif', body: '"Jost", system-ui, sans-serif' };
    }
    return B_FONTS;
  }, [typePairing]);

  Object.assign(B_FONTS, fonts);

  const Page = {
    home: <BHomePage heroVariant={heroVariant} />,
    galeria: <BGaleriaPage />,
  }[page] || <BHomePage heroVariant={heroVariant} />;

  return (
    <div style={{
      background: B_THEME.bg, color: B_THEME.ink,
      minHeight: '100%', width: '100%', fontFamily: B_FONTS.body,
    }}>
      <BNav page={page} onPage={setPage} />
      {Page}
      <BFooter />
    </div>
  );
}

window.SiteB = SiteB;

// ── Lightbox ─────────────────────────────────────────────────
function BLightbox({ photos, layout, index, onClose, onNav }) {
  // Lock scroll while open + keyboard nav.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNav]);

  // Touch swipe (horizontal threshold).
  const touch = React.useRef(null);
  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    const s = touch.current; if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) onNav(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const i = index;
  const ratio = layout[i % layout.length];
  // Convert ratio string like "4/5" or "1/1" to numeric for object-fit-style sizing.
  const [rw, rh] = ratio.split('/').map(Number);

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(20, 12, 6, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))',
        fontFamily: B_FONTS.body, color: B_THEME.bg,
      }}
    >
      {/* close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Cerrar"
        style={{
          position: 'absolute', top: 'max(16px, env(safe-area-inset-top))', right: 'max(16px, env(safe-area-inset-right))',
          width: 44, height: 44, borderRadius: 22,
          border: 'none', background: 'rgba(255,255,255,0.1)', color: B_THEME.bg,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, lineHeight: 1, zIndex: 2,
        }}
      >×</button>

      {/* prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Anterior"
        style={{
          position: 'absolute', left: 'max(12px, env(safe-area-inset-left))', top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: 24,
          border: 'none', background: 'rgba(255,255,255,0.1)', color: B_THEME.bg,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6"/></svg>
      </button>

      {/* next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Siguiente"
        style={{
          position: 'absolute', right: 'max(12px, env(safe-area-inset-right))', top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: 24,
          border: 'none', background: 'rgba(255,255,255,0.1)', color: B_THEME.bg,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l6 6-6 6"/></svg>
      </button>

      {/* photo — sized via aspect-ratio so it fits both portrait and landscape viewports */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(92vw, calc((92vh - 80px) * ' + (rw / rh) + '))',
          maxHeight: 'calc(92vh - 80px)',
          aspectRatio: ratio,
          width: '100%',
          background: `repeating-linear-gradient(135deg, ${B_THEME.bg2} 0 24px, ${B_THEME.bg} 24px 48px)`,
          border: `1px solid ${B_THEME.rule}`,
          borderRadius: 4,
          display: 'flex', alignItems: 'flex-end', padding: 18,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          color: B_THEME.inkSoft,
          fontFamily: B_FONTS.mono, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
        }}
      >
        <span style={{ background: B_THEME.bg, padding: '4px 8px', border: `1px solid ${B_THEME.rule}`, borderRadius: 2 }}>
          foto {String(i + 1).padStart(2, '0')}
        </span>
      </div>

      {/* counter */}
      <div style={{
        position: 'absolute', bottom: 'max(20px, env(safe-area-inset-bottom))', left: '50%', transform: 'translateX(-50%)',
        fontFamily: B_FONTS.body, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
        opacity: 0.8, fontVariantNumeric: 'tabular-nums',
      }}>
        {String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </div>
    </div>,
    document.body,
  );
}
