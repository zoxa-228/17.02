import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

const Home = () => (
  <div className="green-text">
    <h2>Главная страница</h2>
    <p>Добро пожаловать на наш сайт! Здесь вы найдете полезную информацию о финансах и расчетах налогов.</p>
  </div>
);

const About = () => (
  <div className="green-text">
    <h2>О нас</h2>
    <p>Мы - команда профессионалов, помогающая людям правильно управлять своими финансами. Наша цель - предоставить удобные инструменты для расчетов и финансового планирования.</p>
  </div>
);

const Contacts = () => (
  <div className="green-text">
    <h2>Контакты</h2>
    <p>Email: ZOXA.228@MAIL.RU</p>
    <p>Телефон: +7 7073927359</p>
    <p>Адрес: г. Уральск, ул. Бинаговая, д. 6</p>
  </div>
);

const FinanceCalculator = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [taxRate, setTaxRate] = useState(13);
  
  const calculateTax = () => (income - expenses) * (taxRate / 100);

  return (
    <div className="green-text">
      <h2>Калькулятор финансов</h2>
      <label>Доход: <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></label>
      <br />
      <label>Расходы: <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} /></label>
      <br />
      <p>Налоги: {calculateTax()} руб.</p>
    </div>
  );
};

const ProtectedPage = ({ taxRate, setTaxRate }) => {
  return (
    <div className="green-text">
      <h2>Настройка налогов</h2>
      <label>Текущий процент налогов: <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} /></label>
    </div>
  );
};

const Login = ({ setIsAuthenticated }) => {
  const handleLogin = () => {
    const password = prompt("Введите пароль для доступа к настройкам налогов");
    if (password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Неверный пароль");
    }
  };
  return <button className="green-button" onClick={handleLogin}>Войти</button>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [taxRate, setTaxRate] = useState(13);

  return (
    <Router>
      <nav className="green-text">
        <Link to="/">Главная</Link> | <Link to="/about">О нас</Link> | <Link to="/contacts">Контакты</Link> | <Link to="/finance">Калькулятор</Link> | <Link to="/login">Защищённая</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/finance" element={<FinanceCalculator />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/protected" element={isAuthenticated ? <ProtectedPage taxRate={taxRate} setTaxRate={setTaxRate} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
