import React, { useState } from 'react';
import './App.css';

const CARS_DATA = [
  {
    id: 1,
    name: "Porsche Taycan Turbo S",
    category: "Sport",
    price: 350,
    speed: "2.8s (0-100)",
    power: "761 ot kuchi",
    fuel: "Elektr (450 km)",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    badge: "VIP"
  },
  {
    id: 2,
    name: "Mercedes-AMG GT 63 S",
    category: "Sport",
    price: 320,
    speed: "3.2s (0-100)",
    power: "639 ot kuchi",
    fuel: "Benzin (4.0L V8)",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    badge: "Mashhur"
  },
  {
    id: 3,
    name: "BMW M5 CS",
    category: "Biznes",
    price: 280,
    speed: "3.0s (0-100)",
    power: "635 ot kuchi",
    fuel: "Benzin (4.4L V8)",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    badge: "Yangilik"
  },
  {
    id: 4,
    name: "Range Rover Autobiography",
    category: "SUV",
    price: 300,
    speed: "4.6s (0-100)",
    power: "530 ot kuchi",
    fuel: "Benzin (4.4L V8)",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
    badge: "Komfort"
  },
  {
    id: 5,
    name: "Audi RS e-tron GT",
    category: "Elektr",
    price: 290,
    speed: "3.3s (0-100)",
    power: "646 ot kuchi",
    fuel: "Elektr (472 km)",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
    badge: "Eko"
  },
  {
    id: 6,
    name: "Rolls-Royce Cullinan",
    category: "Lyuks",
    price: 750,
    speed: "5.2s (0-100)",
    power: "571 ot kuchi",
    fuel: "Benzin (6.75L V12)",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    badge: "Premium"
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = ['Barchasi', 'Sport', 'Biznes', 'SUV', 'Elektr', 'Lyuks'];

  const filteredCars = CARS_DATA.filter(car => {
    const matchesCategory = selectedCategory === 'Barchasi' || car.category === selectedCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedCar(null);
    }, 2500);
  };

  return (
    <div className="rent-app">
      {/* Dynamic Background Blur */}
      <div className="glow-bg top-left"></div>
      <div className="glow-bg bottom-right"></div>

      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span>DRIVE<span className="highlight">X</span></span>
        </div>

        <nav className="nav-links">
          <a href="#cars">Avtomobillar</a>
          <a href="#services">Xizmatlar</a>
          <a href="#about">Biz haqimizda</a>
        </nav>

        <button className="btn-accent nav-btn">Bog'lanish</button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🔥 Premium Avto Ijara Service</span>
          <h1>Orzungizdagi Avtomobilni <br /><span className="gradient-text">Bugunoq Boshqaring</span></h1>
          <p>Har qanday safar uchun yuqori darajadagi qulaylik, tezlik va xavfsizlik kafolati.</p>

          {/* Quick Search Bar */}
          <div className="search-box">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Avtomobil nomini kiriting (masalan, Porsche)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <a href="#cars" className="btn-accent search-btn">Qidirish</a>
          </div>
        </div>
      </section>

      {/* Main Cars Section */}
      <section className="cars-section" id="cars">
        <div className="section-header">
          <h2>Mavjud <span className="gradient-text">Avtomobillar</span></h2>
          <p>Ehtiyojingiz va uslubingizga mos transport vositasini tanlang</p>
        </div>

        {/* Filter Categories */}
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image-wrapper">
                  <img src={car.image} alt={car.name} />
                  <span className="badge">{car.badge}</span>
                  <div className="price-tag">
                    <span className="amount">${car.price}</span>
                    <span className="period">/kun</span>
                  </div>
                </div>

                <div className="car-info">
                  <span className="car-category">{car.category}</span>
                  <h3>{car.name}</h3>

                  <div className="car-specs">
                    <div className="spec-item">
                      <span className="spec-icon">🚀</span>
                      <span>{car.speed}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⚡</span>
                      <span>{car.power}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">⛽</span>
                      <span>{car.fuel}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-card" 
                    onClick={() => setSelectedCar(car)}
                  >
                    Bron Qilish
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>Siz qidirgan avtomobil topilmadi 😕</h3>
              <p>Iltimos, boshqa kalit so'z bilan qidirib ko'ring.</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedCar && (
        <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCar(null)}>✕</button>

            {!bookingSuccess ? (
              <>
                <div className="modal-header">
                  <h3>Bron qilish: <span className="gradient-text">{selectedCar.name}</span></h3>
                  <p>Kunlik narxi: <strong>${selectedCar.price}</strong></p>
                </div>

                <form onSubmit={handleBooking} className="booking-form">
                  <div className="form-group">
                    <label>Ismingiz</label>
                    <input type="text" placeholder="Ismingizni kiriting" required />
                  </div>
                  <div className="form-group">
                    <label>Telefon raqam</label>
                    <input type="tel" placeholder="+998 90 123 45 67" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Boshlanish sanasi</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Tugash sanasi</label>
                      <input type="date" required />
                    </div>
                  </div>
                  <button type="submit" className="btn-accent submit-btn">
                    Tasdiqlash va Bron qilish
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">🎉</div>
                <h3>Muvaffaqiyatli bron qilindi!</h3>
                <p>Operatorimiz tez orada siz bilan bog'lanadi.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>DRIVE<span className="highlight">X</span></h2>
            <p>Premium toifadagi ijaraga beriluvchi avtomobillar portali.</p>
          </div>
          <p className="copyright">© 2026 DRIVEX. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;