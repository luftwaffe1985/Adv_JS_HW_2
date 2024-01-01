"use strict";

/*
Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const productsSelect = document.querySelector("#productField");
const reviewField = document.querySelector("#reviewField");
const reviewForm = document.querySelector("#reviewForm");
const reviewsList = document.querySelector("#reviewList");
const errorField = document.querySelector("#errorField");

let currentReviewId = getCurrentReviewId();

// Filling in the list
initialData.forEach((item) => {
  const field = `<option value="${item.product}">${item.product}</option>`;
  productsSelect.insertAdjacentHTML("beforeend", field);
});

function getCurrentReviewId() {
  return initialData.reduce((max, review) => {
    const maxReviewId = review.reviews.reduce((a, r) => Math.max(a, r.id), 0);
    return Math.max(max, maxReviewId);
  }, 0);
}

function renderError(msg) {
  errorField.textContent = msg || "";
}

function renderReviews() {
  reviewsList.innerHTML = "";
  initialData.forEach(renderProductReviews);
}

function renderProductReviews(item) {
  const field = `<dt>${item.product}</dt>`;
  const subField = `<dd><ul>${item.reviews.reduce(
    (str, review) => str + `<li>${review.text}</li>`,
    ""
  )} </ul></dd>`;
  const insertStr = field + subField;
  reviewsList.insertAdjacentHTML("beforeend", insertStr);
}

renderReviews();

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderError();

  try {
    const selectedProduct = productsSelect.value;
    const selectedProductData = initialData.find(
      (item) => item.product === selectedProduct
    );

    if (!selectedProductData) {
      throw new Error("Продукт не выбран");
    }

    const reviewText = reviewField.value;
    if (reviewText.length < 50 || reviewText.length > 500) {
      throw new Error("Отзыв должен бьты от 50 и до 500 символов");
    }

    selectedProductData.reviews.push({
      id: ++currentReviewId,
      text: reviewText,
    });
  } catch (error) {
    renderError(error.message);
  } finally {
    renderReviews();
  }
});
