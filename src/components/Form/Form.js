import React, { Component } from "react";
import "./Form.css";
import Photo from "./assets/bond_approve.jpg";

const getTypeInput = type => {
  switch (type) {
    case "password": {
      return "password";
    }
    default:
      return "text";
  }
};

const errorText = {
  emptyFirstName: "Нужно указать имя",
  wrongFirstName: "Имя указано не верно",
  emptyLastName: "Нужно указать фамилию",
  wrongLastName: "Фамилия указана не верно",
  emptyPassword: "Нужно указать пароль",
  wrongPassword: "Пароль указан не верно"
};

const Field = ({ value, name, error, handleChange, label }) => {
  console.log("field", error);
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        <span className="field-label">{label}</span>
      </label>
      <input
        type={getTypeInput(name)}
        name={name}
        id={name}
        className={`field-input t-input-${name}`}
        value={value}
        onChange={handleChange}
      />
      <span className={`field__error field-error t-error-${name}`}>
        {error}
      </span>
    </div>
  );
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      agent007: false,
      error: {
        firstname: "",
        lastname: "",
        password: ""
      }
    };
  }

  clearError = () => {
    this.setState({ error: { firstname: "", lastname: "", password: "" } });
  };

  handleChange = ({ target: { value, name } }) => {
    this.clearError();
    this.setState({
      [name]: value
    });
  };

  setErrorState = (name, value) => {
    this.setState(state=>({error: {...state.error, [name]: value }}));
  };

  validateFirstName = firstname => {
    let a = true;
    if (firstname.length === 0) {
      a = false;
      this.setErrorState("firstname", errorText.emptyFirstName);
    } else if (firstname.length > 0 && (firstname.toLowerCase() !== "james")) {

      a = false;
      this.setErrorState("firstname", errorText.wrongFirstName);
    }
    else {
      this.setErrorState("firstname", "");
  }
    return a;
  };

  validateSecondName = lastname => {
    let a = true;
    if (lastname.length === 0) {
      a = false;
      this.setErrorState("lastname", errorText.emptyLastName);
    } else if (lastname.length > 0 && (lastname.toLowerCase() !== "bond")) {
      a = false;
      this.setErrorState("lastname", errorText.wrongLastName);
    }
  else {
    this.setErrorState("lastname", "");
  }
  return a;
  };

  validatePassword = password => {
    let a = true;
    if (password.length === 0) {
      a = false;
      this.setErrorState("password", errorText.emptyPassword);
    } else if (password.length > 0 && (password !== "007")) {
      a = false;
      this.setErrorState("password", errorText.wrongPassword);
    }
    else {
      this.setErrorState("password", "");
    }
    return a;
  };

  valid = () => {
    const { firstname, lastname, password } = this.state;
    let first;
    let last;
    let passw;
    first = this.validateFirstName(firstname);
    last = this.validateSecondName(lastname);
    passw = this.validatePassword(password);
    return (first && last && passw)
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.valid()) {
      this.setState({ agent007: true });
    }
  };

  render() {
    const { firstname, lastname, password, agent007, error } = this.state;
    return (
      <div className="app-container">
        {agent007 ? (
          <img src={Photo} alt="Джеймс Бонд" className="t-bond-image"/>
        ) : (
          <form action="" className="form" onSubmit={this.handleSubmit}>
            <h1>Введите свои данные, агент</h1>
            <Field
              value={firstname}
              name={"firstname"}
              error={error.firstname}
              handleChange={this.handleChange}
              label={"Имя"}
            />
            <Field
              value={lastname}
              name={"lastname"}
              error={error.lastname}
              handleChange={this.handleChange}
              label={"Фамилия"}
            />
            <Field
              value={password}
              name={"password"}
              error={error.password}
              handleChange={this.handleChange}
              label={"Пароль"}
            />
            <div className="form__buttons ">
              <button type="submit" className="button t-submit" name="btn">
                Проверить
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Form;
