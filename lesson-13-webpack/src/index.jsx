import React from "react";
import ReactDOM from "react-dom";
import HelloComp from "./components/hello-comp";

console.log(HelloComp);

ReactDOM.render(
  <HelloComp />,
  document.getElementById('app')
);
