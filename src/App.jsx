import React, { useState, useMemo } from 'react';
import './App.css';

const CARS_DATA = [
  {
    id: 1,
    name: "Porsche Taycan Turbo S",
    category: "Sport",
    priceUSD: 350,
    speed: "2.8s",
    power: "761 ot kuchi",
    fuel: "Elektr (450 km)",
    transmission: "Avtomat",
    seats: 4,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    badge: "VIP"
  },
  {
    id: 2,
    name: "Mercedes-AMG GT 63 S",
    category: "Sport",
    priceUSD: 320,
    speed: "3.2s",
    power: "639 ot kuchi",
    fuel: "Benzin (4.0L V8)",
    transmission: "Avtomat",
    seats: 4,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    badge: "Mashhur"
  },
  {
    id: 3,
    name: "BMW M5 CS",
    category: "Biznes",
    priceUSD: 280,
    speed: "3.0s",
    power: "635 ot kuchi",
    fuel: "Benzin (4.4L V8)",
    transmission: "Avtomat",
    seats: 5,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    badge: "Yangilik"
  },
  {
    id: 4,
    name: "Range Rover Autobiography",
    category: "SUV",
    priceUSD: 300,
    speed: "4.6s",
    power: "530 ot kuchi",
    fuel: "Benzin (4.4L V8)",
    transmission: "Avtomat",
    seats: 7,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
    badge: "Komfort"
  },
  {
    id: 5,
    name: "Audi RS e-tron GT",
    category: "Elektr",
    priceUSD: 290,
    speed: "3.3s",
    power: "646 ot kuchi",
    fuel: "Elektr (472 km)",
    transmission: "Avtomat",
    seats: 4,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
    badge: "Eko"
  },
  {
    id: 6,
    name: "Rolls-Royce Cullinan",
    category: "Lyuks",
    priceUSD: 750,
    speed: "5.2s",
    power: "571 ot kuchi",
    fuel: "Benzin (6.75L V12)",
    transmission: "Avtomat",
    seats: 5,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    badge: "Premium"
  }
];

const RATES = { USD: 1, EUR: 0.92, UZS: 12800 };
const SYMBOLS = { USD: '$', EUR: '€', UZS: "so'm" };

function App() {
  const [currency, setCurrency] = useState('USD');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modallar
  const [selectedCarForDetail, setSelectedCarForDetail] = useState(null);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Bron qilish hisoblagichlari
  const [days, setDays] = useState(1);
  const [withDriver, setWithDriver] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);

  // Bildirishnomalar
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const formatPrice = (usdAmount) => {
    const val = Math.round(usdAmount * RATES[currency]);
    return currency === 'UZS' 
      ? `${val.toLocaleString()} ${SYMBOLS[currency]}`
      : `${SYMBOLS[currency]}${val}`;
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      showToast("Sevimlilardan olib tashlandi");
    } else {
      setFavorites([...favorites, id]);
      showToast("Sevimlilarga qo'shildi ❤️");
    }
  };

  // Filtr va Saralash
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter(car => {
      const matchCat = selectedCategory === 'Barchasi' || car.category === selectedCategory;
      const matchSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFav = showFavoritesOnly ? favorites.includes(car.id) : true;
      return matchCat && matchSearch && matchFav;
    }).sort((a, b) => {
      if (sortBy === 'low') return a.priceUSD - b.priceUSD;
      if (sortBy === 'high') return b.priceUSD - a.priceUSD;
      return 0;
    });
  }, [selectedCategory, searchTerm, sortBy, showFavoritesOnly, favorites]);

  const calculateTotal = () => {
    if (!selectedCarForBooking) return 0;
    let base = selectedCarForBooking.priceUSD * days;
    if (withDriver) base += 50 * days;
    if (withInsurance) base += 30 * days;
    return base;
  };

  return (
    <div className="rent-app">
      {/* Toast Notification */}
      {toastMessage && <div className="toast">{toastMessage}</div>}

      {/* Top Utility Bar */}
      <div className="top-bar">
        <span>📍 Toshkent, O'zbekiston | 24/7 Qo'llab-quvvatlash: +998 71 200 00 00</span>
        <div className="top-controls">
          <div className="currency-selector">
            {['USD', 'EUR', 'UZS'].map((cur) => (
              <button
                key={cur}
                className={`cur-btn ${currency === cur ? 'active' : ''}`}
                onClick={() => setCurrency(cur)}
              >
                {cur}
              </button>
            ))}
          </div>
          <button 
            className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            ❤️ Sevimlilar ({favorites.length})
          </button>
        </div>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo" onClick={() => { setShowFavoritesOnly(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="logo-icon">⚡</span>
          <span>DRIVE<span className="highlight">X</span></span>
        </div>

        <nav className="nav-links">
          <a href="#cars" onClick={() => setShowFavoritesOnly(false)}>Avtomobillar</a>
          <a href="#about">Biz haqimizda</a>
          <a href="#faq">FAQ</a>
        </nav>

        <button className="btn-accent nav-btn" onClick={() => setIsContactOpen(true)}>
          Bog'lanish
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🔥 Premium Avto Ijara Service</span>
          <h1>Orzungizdagi Avtomobilni <br /><span className="gradient-text">Bugunoq Boshqaring</span></h1>
          <p>Yuqori darajadagi qulaylik, tezkor rasmiylashtirish va xavfsizlik kafolati.</p>

          <div className="search-box">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Avtomobil nomini kiriting..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-accent search-btn" onClick={() => {
              document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Qidirish
            </button>
          </div>
        </div>
      </section>

      {/* Cars Catalog Section */}
      <section className="cars-section" id="cars">
        <div className="section-header">
          <h2>
            {showFavoritesOnly ? "Sizning Sevimlilaringiz ❤️" : <>Mavjud <span className="gradient-text">Avtomobillar</span></>}
          </h2>
          <p>Ehtiyojingiz va uslubingizga mos transport vositasini tanlang</p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="controls-wrapper">
          <div className="category-pills">
            {['Barchasi', 'Sport', 'Biznes', 'SUV', 'Elektr', 'Lyuks'].map((cat) => (
              <button
                key={cat}
                className={`pill ${selectedCategory === cat && !showFavoritesOnly ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat); setShowFavoritesOnly(false); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Saralash: Standart</option>
            <option value="low">Narx: Arzonroq</option>
            <option value="high">Narx: Qimmatroq</option>
          </select>
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => {
              const isFav = favorites.includes(car.id);
              return (
                <div key={car.id} className="car-card">
                  <div className="car-image-wrapper">
                    <img src={car.image} alt={car.name} />
                    <span className="badge">{car.badge}</span>
                    <button 
                      className={`fav-heart-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(car.id, e)}
                    >
                      ♥
                    </button>
                    <div className="price-tag">
                      <span className="amount">{formatPrice(car.priceUSD)}</span>
                      <span className="period">/kun</span>
                    </div>
                  </div>

                  <div className="car-info">
                    <span className="car-category">{car.category}</span>
                    <h3>{car.name}</h3>

                    <div className="car-specs">
                      <span>🚀 {car.speed}</span>
                      <span>⚡ {car.power}</span>
                      <span>⛽ {car.fuel}</span>
                    </div>

                    <div className="card-actions">
                      <button className="btn-outline" onClick={() => setSelectedCarForDetail(car)}>
                        Batafsil
                      </button>
                      <button className="btn-card" onClick={() => { setSelectedCarForBooking(car); setDays(1); }}>
                        Bron Qilish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <h3>Hech narsa topilmadi 😕</h3>
              <button className="btn-accent" onClick={() => { setSearchTerm(''); setSelectedCategory('Barchasi'); setShowFavoritesOnly(false); }}>
                Filtrni tozalash
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedCarForDetail && (
        <div className="modal-overlay" onClick={() => setSelectedCarForDetail(null)}>
          <div className="modal-card detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCarForDetail(null)}>✕</button>
            <img src={selectedCarForDetail.image} alt={selectedCarForDetail.name} className="modal-img" />
            <h2>{selectedCarForDetail.name}</h2>
            <p className="modal-price">{formatPrice(selectedCarForDetail.priceUSD)} / kun</p>
            
            <div className="modal-specs-grid">
              <div><strong>Kategoriya:</strong> {selectedCarForDetail.category}</div>
              <div><strong>Tezlanish (0-100):</strong> {selectedCarForDetail.speed}</div>
              <div><strong>Quvvat:</strong> {selectedCarForDetail.power}</div>
              <div><strong>Yoqilg'i:</strong> {selectedCarForDetail.fuel}</div>
              <div><strong>Uzatma qutisi:</strong> {selectedCarForDetail.transmission}</div>
              <div><strong>O'rinlar:</strong> {selectedCarForDetail.seats} kishi</div>
            </div>

            <button 
              className="btn-accent full-width"
              onClick={() => {
                const car = selectedCarForDetail;
                setSelectedCarForDetail(null);
                setSelectedCarForBooking(car);
              }}
            >
              Ushbu Avtomobilni Bron Qilish
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal with Calculator */}
      {selectedCarForBooking && (
        <div className="modal-overlay" onClick={() => setSelectedCarForBooking(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCarForBooking(null)}>✕</button>
            <h3>Bron Qilish: <span className="gradient-text">{selectedCarForBooking.name}</span></h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              showToast("Muvaffaqiyatli bron qilindi! 🎉");
              setSelectedCarForBooking(null);
            }} className="booking-form">
              <div className="form-group">
                <label>Ismingiz va Familiyangiz</label>
                <input type="text" required placeholder="Ali Valiyev" />
              </div>

              <div className="form-group">
                <label>Telefon raqamingiz</label>
                <input type="tel" required placeholder="+998 90 123 45 67" />
              </div>

              <div className="form-group">
                <label>Ijara muddat (kunlar): <strong>{days} kun</strong></label>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))} 
                />
              </div>

              <div className="checkbox-group">
                <label>
                  <input type="checkbox" checked={withDriver} onChange={(e) => setWithDriver(e.target.checked)} />
                  Shaxsiy haydovchi xizmati (+{formatPrice(50)}/kun)
                </label>
                <label>
                  <input type="checkbox" checked={withInsurance} onChange={(e) => setWithInsurance(e.target.checked)} />
                  VIP Sug'urta CASCO (+{formatPrice(30)}/kun)
                </label>
              </div>

              <div className="total-calculator">
                <span>Jami summa:</span>
                <span className="total-price">{formatPrice(calculateTotal())}</span>
              </div>

              <button type="submit" className="btn-accent submit-btn">
                Bronni Tasdiqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="modal-overlay" onClick={() => setIsContactOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsContactOpen(false)}>✕</button>
            <h3>Biz bilan <span className="gradient-text">Bog'lanish</span></h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              showToast("Xabaringiz yuborildi! 📩");
              setIsContactOpen(false);
            }} className="booking-form">
              <div className="form-group">
                <label>Ismingiz</label>
                <input type="text" required placeholder="Ismingiz" />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" required placeholder="+998 90 123 45 67" />
              </div>
              <div className="form-group">
                <label>Xabar</label>
                <textarea rows="3" required placeholder="Savolingizni kiriting..."></textarea>
              </div>
              <button type="submit" className="btn-accent submit-btn">Yuborish</button>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Accordion */}
      <section className="faq-section" id="faq">
        <h2>Ko'p Beriladigan <span className="gradient-text">Savollar</span></h2>
        <div className="faq-list">
          {[
            { q: "Ijara uchun qanday hujjatlar kerak?", a: "Pasport va haydovchilik guvohnomasi (kamida 2 yillik staj) yetarli." },
            { q: "Golosovanie va depozit bormi?", a: "Ha, avtomobil turiga qarab $200-$500 atrofida qaytariladigan depozit olinadi." },
            { q: "Mashinani boshqa shaharga olib borish mumkinmi?", a: "Ha, O'zbekiston bo'ylab harakatlanishga ruxsat beriladi." }
          ].map((faq, idx) => (
            <div key={idx} className="faq-item" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div className="faq-question">
                <span>{faq.q}</span>
                <span>{openFaq === idx ? '−' : '+'}</span>
              </div>
              {openFaq === idx && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 DRIVEX. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

export default App;