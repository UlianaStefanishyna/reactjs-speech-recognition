import React from 'react';
import './App.css';
import Artyom from 'artyom.js';
import ArtyomCommandsManager from './ArtyomCommandsManager.js';

import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Jarvis = new Artyom();

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.startAssistant = this.startAssistant.bind(this);
        this.stopAssistant = this.stopAssistant.bind(this);
        this.speakText = this.speakText.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);

        // Prepare simple state
        this.state = {
            artyomActive: false,
            textareaValue: "",
            artyomIsReading: false
        };

        // Load some commands to Artyom using the commands manager
        let CommandsManager = new ArtyomCommandsManager(Jarvis);
        CommandsManager.loadCommands();
    }

    startAssistant() {
        let _this = this;

        console.log("Artyom succesfully started !");

        Jarvis.initialize({
            lang: "ru-RU",
            debug: true,
            continuous: true,
            soundex: true,
            listen: true
        }).then(() => {
            // Display loaded commands in the console
            console.log(Jarvis.getAvailableCommands());

            Jarvis.say("Добро пожаловать в медицынский кабинет. Начинайте вводить данные. Имя пациента.");

            _this.setState({
                artyomActive: true
            });
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });
    }

    stopAssistant() {
        let _this = this;

        Jarvis.say("Спасибо. До встречи!");
        Jarvis.fatality().then(() => {
            console.log("Jarvis has been succesfully stopped");

            _this.setState({
                artyomActive: false
            });

        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen neither!", err);

            _this.setState({
                artyomActive: false
            });
        });
    }

    speakText() {
        let _this = this;

        _this.setState({
            artyomIsReading: true
        });

        // Speak text with Artyom
        Jarvis.say(_this.state.textareaValue, {
            onEnd() {
                _this.setState({
                    artyomIsReading: false
                });
            }
        });
    }

    handleTextareaChange(event) {
        this.setState({
            textareaValue: event.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <SideNav
                        onSelect={() => {
                            console.log("JJJ");

                            // Add your code here
                        }}>
                        <SideNav.Toggle/>
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{fontSize: '1.75em'}}/>
                                </NavIcon>
                                <NavText>
                                    Добавление пациента
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="charts">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{fontSize: '1.75em'}}/>
                                </NavIcon>
                                <NavText>
                                    Список всех пациентов
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <h1>Медицынский кабинет</h1>

                    <input className="form-style-5" type="button" value="Начать" disabled={this.state.artyomActive}
                           onClick={this.startAssistant}/>

                    <textarea id="FirstName" className="textArea" rows="2" defaultValue="Имя"/> <br/>
                    <textarea id="MiddleName" className="textArea" rows="2" defaultValue="Отчество"/> <br/>
                    <textarea id="LastName" className="textArea" rows="2" defaultValue="Фамилия"/> <br/>
                    <textarea id="Age" className="textArea" rows="2" defaultValue="Возраст"/> <br/>
                    <textarea id="Diagnoz" className="textArea" rows="2" defaultValue="Диагноз"/> <br/>
                    {/*<div className="textarea-container">*/}
                    {/*    <textarea id="Diagnoz" rows="5" defaultValue="Диагноз"*/}
                    {/*              onChange={this.handleTextareaChange} value={this.state.textareaValue}/>*/}
                    {/*    <button disabled={this.state.artyomIsReading} onClick={this.speakText}>Прочитать</button>*/}
                    {/*</div>*/}
                    <br/>
                    <input className="form-style-5" type="button" value="Закончить" disabled={!this.state.artyomActive}
                           onClick={this.stopAssistant}/>
                </header>
            </div>
        )
    }
}
