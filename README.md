# Чат на Node.js + Sock.js #
Реализовать простой чат. Требования к реализации:
- SockJS
- ECMASCRIPT 6
- nodejs 6.5
- хотя бы пару unit-тестов

### Фичи: ###
1. Первоначально вводится имя
2. При входе в чат, всем сообщается о входе нового человека.
3. Новому человеку подгружается история чата, которая была до него.
4. При вводе сообщения отображается время + имя + сообщение.
5. Когда кто-то покидает чат, всем об этом оповещаются.
6. при добавлении нового сообщения чат прокручивается к последнему сообщению.

Для запуска
```bash
npm i && npm start
```

Для тестов
```bash
npm start && npm test
```
Добавил для красоты:

1. Сделал более приятную расцветку чата, и вообще просто сделал чтобы были хоть какие либо стили.
2. Свои собственные посты выделяются сиреневым цветом
3. Слева видны юзеры-онлайн, при регистрации нового юзера - они туда добавляются, а при выходе юзера, они оттуда удаляются.


#### Заключение ####

Чат определенно можно улучшать:
- можно сделать чтобы дата сообщения была не в сообщении а под ним.
- было бы хорошо также сохранять данные о пользователи, чтобы чат не обновлялся при перезагрузке страницы.
- код можно разбить на модули как серверную, так и клиентскую часть
- можно дописать больше тестов, которые бы тестировали ответы сервера
- было бы правильно также прикрутить базу данных например Монго, чтобы сообщения хранились на ней
- правильно было бы сделать более правильные стили(чтобы были красиво видно и на больших и на маленьких экранах), возможно их больше продумать
- в конце концов все можно было сминифицировать, пересжать, картинки собрать в спрайты
- если чат будет расти дальше, то правильней было бы положить его на какую либо структуру/фреймворк, для более удобного масштабирования.
