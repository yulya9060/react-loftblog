import React, { Component } from "react";
import "./Form.css";
import Photo from "./assets/bond_approve.jpg";

const getTypeInput=(type)=>{
  switch(type){
    case 'password':{
      return "password"
    }
    default: return "text"
  }
}

const errorText={
  emptyFirstName:"Нужно указать имя",
  wrongFirstName:"Имя указано не верно",
  emptyLastName:"Нужно указать фамилию",
  wrongLastName:"Фамилия указана не верно",
  emptyPassword:"Нужно указать пароль",
  wrongPassword:"Пароль указан не верно",
}

const Field = ({value,name,error,handleChange,label}) => {
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
        onChange={(event)=>handleChange(event)}
      />
      <span className={`field__error field-error t-error-${name}`}>{error}</span>
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
    console.log('dfdf',value,name)
    if (value.length === 0) {
      this.setState({
        [name]: value,
        error: { firstname: "", lastname: "", password: "" }
      });
    }
  };

  setErrorState=(name,value)=>{
    this.setState({error:{...this.state.error,[name]:value}});
  }

  validateFirstName=(firstname)=>{
    if (firstname.length === 0) {
      this.setErrorState(firstname,errorText.emptyFirstName);
      return false;
    }
    else if (firstname.length>0 && firstname !== 'Джеймс'){
      this.setErrorState(firstname,errorText.wrongFirstName);
      return false;
    }
    return true;
  }

  validateSecondName=(lastname)=>{
    if (lastname.length === 0) {
      this.setErrorState(lastname,errorText.emptyLastName);
      return false;
    }
    else if (lastname.length>0 && lastname !== 'Бонд'){
      this.setErrorState(lastname,errorText.wrongLastName);
      return false;
    }
    return true;
  }

  validatePassword=(password)=>{
    if (password.length === 0) {
      this.setErrorState(password,errorText.emptyPassword);
      return false;
    }
    else if (password.length>0 && password !== '007'){
      this.setErrorState(password,errorText.wrongPassword);
      return false;
    }
    return true;
  }
  valid = () => {
    const { firstname, lastname, password } = this.state;
    let field = "";
    switch (field) {
      case "firstname": {
       return this.validateFirstName(firstname);
        }
      case "lastname": {
        return this.validateSecondName(lastname);
      }
      case "password":{
        return this.validatePassword(password);
      }
      default:
    }
  };

  handleSubmit = () => {
    if (this.valid()) {
      this.setState({ agent007: true });
    }
  };

  render() {
    const { firstname, lastname, password, agent007 ,error} = this.state;
    return (
      <div className="app-container">
        {agent007 ? (
          <img src={Photo} alt="Джеймс Бонд" />
        ) : (
          <form action="" className="form" onSubmit={this.handleSubmit}>
            <h1>Введите свои данные, агент</h1>
            <Field
              value={firstname}
              name={firstname}
              error={error.firstname}
              handleChange={(event)=>this.handleChange(event)}
              label={"Имя"}
            />
            <Field
              value={lastname}
              name={lastname}
              error={error.lastname}
              handleChange={this.handleChange}
              label={"Фамилия"}
            />
            <Field
              value={password}
              name={password}
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
