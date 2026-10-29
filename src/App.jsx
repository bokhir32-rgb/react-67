import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      {/* Header / Navigatsiya */}
      <header className="navbar">
        <div className="logo">MyReactApp</div>
        <nav className="nav-links">
          <a href="#home">Bosh sahifa</a>
          <a href="#features">Xizmatlar</a>
          <a href="#about">Biz haqimizda</a>
        </nav>
      </header>

      {/* Hero bo'limi */}
      <section className="hero" id="home">
        <h1>React Yordamida Yaratilgan Zamonaviy Sayt</h1>
        <p>Ushbu sayt React JS va CSS yordamida to'liq responsive (moslashuvchan) tarzda yaratildi.</p>
        
        {/* Interaktiv tugma va hisoblagich */}
        <div className="interactive-card">
          <h3>Interaktiv Hisoblagich: {count}</h3>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)} className="btn primary">
              Oshirish (+)
            </button>
            <button onClick={() => setCount(count - 1)} className="btn secondary">
              Kamaytirish (-)
            </button>
            <button onClick={() => setCount(0)} className="btn reset">
              Nollash
            </button>
          </div>
        </div>
      </section>

      {/* Xizmatlar bo'limi */}
      <section className="features" id="features">
        <h2>Xususiyatlar</h2>
        <div className="cards-grid">
          <div className="card">
            <h3>⚡ Tezkor</h3>
            <p>React ning Virtual DOM imkoniyati evaziga sahifa juda tez ishlaydi.</p>
          </div>
          <div className="card">
            <h3>🎨 Zamonaviy Dizayn</h3>
            <p>Toxif va qulay UI/UX uslubida CSS orqali bezatilgan.</p>
          </div>
          <div className="card">
            <h3>📱 Moslashuvchan</h3>
            <p>Har qanday telefon va kompyuter ekraniga moslashadi.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} MyReactApp. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

export default App;