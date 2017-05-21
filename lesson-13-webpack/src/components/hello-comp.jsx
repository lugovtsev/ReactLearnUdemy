import React from "react";

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' }
    this.setName = this.setName.bind(this);
  }
  setName(event) {
    this.setState({
      name: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" id="inp" onChange={this.setName} />
      <h1>Hello pock, {this.state.name}</h1>
      </div>
    )
  }
}
