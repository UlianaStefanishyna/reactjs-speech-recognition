export default class ArtyomCommandsManager {

    constructor(ArtyomInstance) {
        this._artyom = ArtyomInstance;
    }

    loadCommands() {
        let Artyom = this._artyom;

        return Artyom.addCommands([
            {
                indexes: ["Имя *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Произнесите отчество пациента");
                    document.getElementById("FirstName").value = wildcard;
                }
            },
            {
                indexes: ["Отчество *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Произнесите фамилию пациента");
                    document.getElementById("MiddleName").value = wildcard;
                }
            },
            {
                indexes: ["Фамилия *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Произнесите возраст пациента");
                    document.getElementById("LastName").value = wildcard;
                }
            },
            {
                indexes: ["Возраст *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Раскажите о диагнозе пациента");
                    document.getElementById("Age").value = wildcard;
                }
            },
            {
                indexes: ["Диагноз *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Подтвердите данные.");
                    document.getElementById("Diagnoz").value = wildcard;
                }
            },
            {
                indexes: ["Отправить"],
                action: () => {
                    Artyom.say("Спасибо. Данные сохранены. До свидания.");
                }
            },
            {
                indexes: ["Привет! Как дела ?"],
                action: () => {
                    Artyom.say("Спасибо, что спросили. У меня все хорошо. Надеюсь, никто не болеет.");
                }
            }
        ]);
    }
}
