Конфиг обновляется премиум юзерами

Пример сообдения с yaml, которое ищется среди всех

`
#хонконфиг

anounces:
  /command1: description1
  /command2: description2

commands:
  /command1: t.me/c/1/1
  /command2:
    - message: t.me/c/1/2
      weight: 3
    - message: t.me/c/1/3
  /command3: VARIABLE_NAME
  SERVICE_JOIN:
    - t.me/c/1/4
    - t.me/c/1/5
  SERVICE_LEAVE: Текст
  SERVICE_RENAME: Переменная VARIABLE_NAME
  SERVICE_PIN: t.me/c/1/1

cooldown:
  common: 5m
  premium: 2m

ads:
  - message: t.me/c/1/100
    period: 8h

stats:
  titles: "#title"

protected: Для обновления хонконфига нужен honk premium
reconfig: Конфигурация изменена
`

Рендерилка картинок

/v1/fit

type Title = {

}

type FitInput = {
  titles: Title[];
}
