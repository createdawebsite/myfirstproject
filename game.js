const cardContainer = document.getElementById('card-container');
const images = ['Карта Санта.png', 'Карта Санта.png', 'Карта Лев.png', 'Карта Лев.png', 'Карта Лиса.png', 'Карта Лиса.png']; // Массив изображений (пример)
let cardValues = [];
let cardIds = [];
let cardsMatched = 0;

// Перемешиваем массив карт
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

shuffle(images);

// Создаем карточки
for (let i = 0; i < images.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard); // Обработчик клика на карту
    card.innerHTML = `<img src="рубашка.png" alt="Card Back" class="card-image">`; // Рубашка карты
    cardContainer.appendChild(card);
}

// Логика переворота карты
function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (!cardValues.includes(cardId)) { // Проверка, чтобы нельзя было переворачивать открытую карту
        selected.innerHTML = `<img src="${images[cardId]}" alt="Card Front" class="card-image">`; // Показываем изображение
        cardValues.push(images[cardId]);
        cardIds.push(cardId);

        if (cardValues.length === 2) {
            setTimeout(checkForMatch, 500); // Проверка на совпадение через 0.5 секунды
        }
    }
}

// Проверка на совпадение
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardIds;
    
    if (cardValues[0] === cardValues[1]) {
        cards[firstCardId].style.visibility = 'hidden'; // Скрываем совпавшие карты
        cards[secondCardId].style.visibility = 'hidden'; 
        cardsMatched += 2;
    } else {
        cards[firstCardId].innerHTML = `<img src="рубашка.png" alt="Card Back" class="card-image">`; // Скрываем обратно
        cards[secondCardId].innerHTML = `<img src="рубашка.png" alt="Card Back" class="card-image">`;
    }

    cardValues = [];
    cardIds = [];

    if (cardsMatched === images.length) {
        setTimeout(() => {
            window.location.href = 'victory.html'; // Переход на страницу победы
        }, 1000);
    }
}