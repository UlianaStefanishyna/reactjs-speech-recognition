import React from 'react';

export default class ArtyomCommandsManager extends React.Component {

    constructor(ArtyomInstance, props) {
        super(props);
        this._artyom = ArtyomInstance;
        this.state = {
            firstname: '',
            middlename: '',
            lastname: '',
            age: '',
            diagnoz: ''
        }
    }

    loadCommands() {
        let Artyom = this._artyom;

        return Artyom.addCommands([
            {
                indexes: ["Имя *"],
                smart: true,
                action: (i, wildcard) => {
                    console.log("WAS TOLD" + wildcard);
                    this.state.firstname = wildcard;
                    console.log("SAVED" + this.state.firstname);

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
                    this.state.middlename = wildcard;
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
                    this.state.lastname = wildcard;
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
                    this.state.age = wildcard;
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
                    this.state.diagnoz = wildcard;
                    Artyom.say(wildcard);
                    Artyom.say("Спасибо. Подтвердите данные.");
                    document.getElementById("Diagnoz").value = wildcard;
                }
            },
            {
                indexes: ["Отправить"],
                action: () => {
                    console.log("DATA: " + this.state.firstname);
                    console.log("DATA: " + this.state.middlename);
                    console.log("DATA: " + this.state.lastname);
                    console.log("DATA: " + this.state.age);
                    console.log("DATA: " + this.state.diagnoz);

                    fetch('http://localhost:8080/api/save', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstname: this.state.firstname,
                            middlename: this.state.middlename,
                            lastname: this.state.lastname,
                            age: this.state.age,
                            diagnoz: this.state.diagnoz
                        })
                    });
                    Artyom.say("Спасибо. Данные сохранены. До свидания.");
                }
            },
            {
                indexes: ["Привет! Как дела ?"],
                action: () => {
                    Artyom.say("Спасибо, что спросили. У меня все хорошо. Надеюсь, никто не болеет.");
                }
            }
            // ,
            // {
            //     indexes: ["*"],
            //     smart: true,
            //     action: () => {
            //         Artyom.say("Повторите еще раз, пожалуйста!");
            //     }
            // }
        ]);
    }
}
