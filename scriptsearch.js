// Zdefiniuj stałe, które będą przechowywać szablony kart roślin i kontener na karty
const plantCardTemplate = document.querySelector("[data-plant-template]")
const plantCardContainer = document.querySelector("[data-plant-cards-container]")

// Pobierz elementy z HTML, które będą potrzebne do filtrowania roślin
const searchInput = document.querySelector(".szukaj")
let photo = document.getElementById('image')

// Zdefiniuj pustą tablicę na rośliny, które będą pobrane z pliku JSON
let plants = []

// Dodaj słuchacz zdarzeń, który będzie reagował na wprowadzanie tekstu w polu wyszukiwania
searchInput.addEventListener("input", (e) => {
// Pobierz wartość wpisaną w polu wyszukiwania
const value = e.target.value.toLowerCase()
// Przeiteruj przez każdą roślinę na liście
plants.forEach(plant => {
// Sprawdź, czy nazwa rośliny zawiera wpisaną wartość
const isVisible = plant.name.toLowerCase().includes(value)
// Pokaż/ukryj kartę rośliny w zależności od tego, czy nazwa zawiera wpisaną wartość
plant.element.classList.toggle("hide", !isVisible)
})
})

// Pobierz plik JSON z danymi o roślinach i przetwórz je
fetch('plants.json')
.then(res => res.json())
.then(data => {
// Przeiteruj przez każdą roślinę i stwórz na jej podstawie nową kartę
plants = data.map(plant => {
// Sklonuj szablon karty roślin i pobierz z niego elementy HTML, na których będziemy zmieniać wartości
const card = plantCardTemplate.content.cloneNode(true).children[0]
const header = card.querySelector(".header")
const photo = card.querySelector(".photo")
// Wstaw nazwę rośliny do nagłówka karty
header.textContent = plant.name
card.setAttribute("id", plant.id);
// Wstaw zdjęcie rośliny do karty
photo.src = plant.photo
// Dodaj nową kartę do kontenera na karty
plantCardContainer.append(card)
// Zwróć obiekt reprezentujący daną roślinę, który będzie przechowywać jej nazwę, zdjęcie i element HTML reprezentujący jej kartę
return {name: plant.name, photo: plant.photo, element: card}
})
})