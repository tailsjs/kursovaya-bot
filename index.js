import { Telegram, InlineKeyboard } from "puregram"
import { SceneManager, StepScene } from "@puregram/scenes"
import { session } from "@puregram/session"

const telegram = Telegram.fromToken("YOUR_BOT_TOKEN_HERE")
const ADMIN_ID = 1337

const sceneManager = new SceneManager()

const events = [ "message", "callback_query" ]

telegram.updates.use(session())
telegram.updates.on(events, sceneManager.middleware)
telegram.updates.on(events, sceneManager.middlewareIntercept)

telegram.updates.on("message", (context) => {
    if (context.hasText() && context.text === "/start") {
        context.scene.enter("poll1")
    }
})

sceneManager.addScenes([
    new StepScene("poll1", [
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Согласен",
                            payload: { isAgreed: true }
                        })
                    ], [
                        InlineKeyboard.textButton({
                            text: "Не согласен",
                            payload: { isAgreed: false }
                        })
                    ]
                ])

                return context.send(
                    "Проходя данный опрос, вы соглашаетесь с тем, что ваши персональные данные НЕ будут обрабатываться.", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            if (!context.queryPayload.isAgreed) {
                context.message.delete()
                context.message.send("В таком случае, к нашему сожалению, мы не можем позволить проходить вам опрос. Спасибо за проявленный интерес!")
                return context.scene.step.previous()
            }

            context.scene.state.answers = {}

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Я работаю в одиночку",
                            payload: { selection: "1 человек" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "От 2 до 5 человек",
                            payload: { selection: "2-5 человек" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "От 6 до 10 человек",
                            payload: { selection: "6-10 человек" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Более 10 человек",
                            payload: { selection: "10+ человек" }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "В команде из скольки человек вы работаете?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            context.scene.state.answers.peoplesAmount = context.queryPayload.selection

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Scrum",
                            payload: { selection: "Scrum" }
                        })
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Kanban",
                            payload: { selection: "Kanban" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Extreme Programming (XP)",
                            payload: { selection: "Extreme Programming (XP)" }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "Какой методологией вы пользуетесь чаще всего для разработки кроссплатформенных приложений?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            context.scene.state.answers.mostUsedMethodology = context.queryPayload.selection

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Scrum",
                            payload: { selection: "Scrum" }
                        })
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Kanban",
                            payload: { selection: "Kanban" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Extreme Programming (XP)",
                            payload: { selection: "Extreme Programming (XP)" }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "Какая из представленных методологий, по вашему мнению, наиболее итеративна?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            context.scene.state.answers.mostIterative = context.queryPayload.selection

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Scrum",
                            payload: { selection: "Scrum" }
                        })
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Kanban",
                            payload: { selection: "Kanban" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Extreme Programming (XP)",
                            payload: { selection: "Extreme Programming (XP)" }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "В какой из представленных методологий, по вашему мнению, наиболее гибкое планирование задач?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            context.scene.state.answers.mostFlexibleTaskMngmnt = context.queryPayload.selection

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "5 баллов",
                            payload: { selection: "5 баллов" }
                        })
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "4 балла",
                            payload: { selection: "4 балла" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "3 балла",
                            payload: { selection: "3 балла" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "2 балла",
                            payload: { selection: "2 балла" }
                        }) 
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "1 балл",
                            payload: { selection: "1 балл" }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "На сколько баллов вы оцениваете методологию, которой вы чаще пользуетесь для разработки кроссплатформенных приложений?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            context.scene.state.answers.ranking = context.queryPayload.selection

            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime) {
                const keyboard = InlineKeyboard.keyboard([
                    [
                        InlineKeyboard.textButton({
                            text: "Закончить прохождение",
                            payload: { startAgain: false }
                        })
                    ],
                    [
                        InlineKeyboard.textButton({
                            text: "Пройти заново",
                            payload: { startAgain: true }
                        }) 
                    ]
                ])

                return context.message.editMessageText(
                    "Это был последний вопрос. Хотите закончить или пройти заново?", 
                    { reply_markup: keyboard }
                )
            }

            if (!context.is('callback_query')) {
                return context.delete()
            }

            if (context.queryPayload.startAgain) {
                return context.scene.reenter()
            }

            context.message.send([
                "Пользователь прошёл тест!",
                "",
                `В команде из скольки человек вы работаете?`,
                context.scene.state.answers.peoplesAmount,
                "",
                `Какой методологией вы пользуетесь чаще всего для разработки кроссплатформенных приложений?`,
                context.scene.state.answers.mostUsedMethodology,
                "",
                `Какая из представленных методологий, по вашему мнению, наиболее итеративна?`,
                context.scene.state.answers.mostIterative,
                "",
                `В какой из представленных методологий, по вашему мнению, наиболее гибкое планирование задач?`,
                context.scene.state.answers.mostFlexibleTaskMngmnt,
                "",
                `На сколько баллов вы оцениваете методологию, которой вы чаще пользуетесь для разработки кроссплатформенных приложений?`,
                context.scene.state.answers.ranking
            ].join("\n"), { chat_id: ADMIN_ID })

            context.message.editMessageText("Спасибо за прохождение опроса! Ваши ответы были отправлены администратору для дальнейшего исследования!")
            return context.scene.step.next()
        }
    ])
])

telegram.updates.startPolling()
    .then(() => console.log(`Бот начинает свою работу!`))