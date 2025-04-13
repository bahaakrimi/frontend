import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Connexion en cours...");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Connexion réussie !");
        console.log("Utilisateur connecté :", data.user);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Une erreur s'est produite.");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto", paddingTop: 50 }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Se connecter
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
