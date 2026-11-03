"use strict";
const form = document.getElementById("contact-form");
document.querySelectorAll("[data-intent]").forEach(link => {
  link.addEventListener("click", () => { document.getElementById("profil").value = link.dataset.intent; });
});
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const type = {vendeur:"Proposition de stock",acheteur:"Recherche de stock",autre:"Demande professionnelle"}[data.get("profil")];
  const subject = `StockValor — ${type} — ${data.get("entreprise").trim()}`;
  const body = `Bonjour StockValor,\n\n${type}\n\nEntreprise : ${data.get("entreprise").trim()}\nContact : ${data.get("nom").trim()}\nEmail : ${data.get("email").trim()}\nLocalisation : ${data.get("localisation").trim()}\n\n${data.get("message").trim()}\n\nCordialement,\n${data.get("nom").trim()}`;
  document.getElementById("prepared-email").value = subject + "\n\n" + body;
  document.getElementById("email-fallback").hidden = false;
  document.getElementById("form-status").textContent = "Message préparé. Envoyez-le depuis votre messagerie. Si elle ne s’ouvre pas, copiez le message ci-dessous et adressez-le à contact.stockvalor@gmail.com.";
  window.location.href = `mailto:contact.stockvalor@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.getElementById("copy-message").addEventListener("click", async () => {
  const message = document.getElementById("prepared-email");
  try { await navigator.clipboard.writeText(message.value); document.getElementById("form-status").textContent = "Message copié. Collez-le dans un email à contact.stockvalor@gmail.com."; }
  catch { message.focus(); message.select(); document.getElementById("form-status").textContent = "Sélectionnez et copiez le message, puis collez-le dans votre messagerie."; }
});
