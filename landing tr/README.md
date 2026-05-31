# Лендинг — Тимур Рамазанов

Одностраничный сайт врача ЛФК и спортивной медицины. Статическая вёрстка без сборщика.

## Структура проекта

```
landing tr/
├── index.html          # разметка, Schema.org JSON-LD
├── favicon.svg         # иконка сайта
├── css/
│   └── styles.css      # кастомные стили
├── js/
│   ├── main.js         # интерактив: меню, форма, lightbox, свайпы
│   └── tailwind-config.js
└── images/             # фото врача, проблем, методик, сертификатов
```

## Запуск

Откройте `index.html` в браузере или поднимите локальный сервер:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Сайт будет доступен по адресу `http://localhost:8080`.

## Изображения

Положите файлы в папку `images/`:

| Назначение | Файлы |
|---|---|
| Проблемы | `neck-pain.jpg`, `pain.jpg`, `headake.jpeg`, `travma.jpeg`, `artroz.jpeg`, `spinapain.jpeg`, `reabilitacia.jpeg`, `skolioz.webp`, `kontraktura.jpeg` |
| Методики | `maligan.jpg`, `meitland-1.jpg`, `sling-terapia.jpg`, `syhie-igly.jpg`, `kinezio.jpeg`, `imma.jpeg` |
| Сертификаты | `certificat-test.jpg` |

## Технологии

- HTML5, CSS3, JavaScript (vanilla)
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Lucide Icons](https://lucide.dev/) (CDN)
- Яндекс.Карты (виджет)

## Контакты на сайте

- Email: doc@tim-rmznv.ru
- Telegram: [@dr_rmznv](https://t.me/dr_rmznv)
- Клиника Динамика: Москва, Вернадского пр. д. 9/10, м. Университет

## Профили на площадках

- [ПроДокторов](https://prodoctorov.ru/moskva/vrach/663877-ramazanov/)
- [НаПоправку](https://napopravku.ru/moskva/doctor-profile/ramazanov-timur-gusenovich/)
- [СберЗдоровье](https://docdoc.ru/doctor/Ramazanov_Timur_2)
