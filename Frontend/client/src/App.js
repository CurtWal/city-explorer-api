import React, { Component } from "react";
import FormInput from "./component/FormInput";
import Footer from "./component/Footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <FormInput />
        <Footer />
      </div>
    );
  }
}
