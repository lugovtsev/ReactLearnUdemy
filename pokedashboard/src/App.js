import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0,
      loaded: false,
      showModal: false,
      selectedPokemon: null
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  loadPokemon(url) {
    fetch(url)
      .then(response => {
        console.log(response.json());
        return response.json();
      }).then(json => {
        let pages = Math.ceil(json.count / this.state.limit);
        this.setState({
          pokemon: json.results,
          totalPages: pages,
          count: json.count,
          loaded: true
        })
      }).catch(err => {
        console.log(err)
      })
  }

  componentWillMount() {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`);
  }

  handlePaginationSelect(selectPage) {
    this.setState({activePage: selectPage});
    let offset = this.state.limit * (selectPage-1);
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
  }

  handleLimitChange(event) {
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {
      this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`)
    })
  }

  openModal(pokemon) {
    if (pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
      .then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        this.setState({
          selectedPokemon: json,
          showModal: true
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pokemon Dashboard</h2>
        </div>
        {this.state.loaded ? null : "Loading..."}
        <PokemonIndexList
          display={this.state.loaded}
          options={[10,50,100,200]}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          btnSize="smal"
          totalPages={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePaginationSelect}
          openModal={this.openModal}
        />
        <PokemonModal
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          pokemon={this.state.selectedPokemon}
        />
      </div>
    );
  }
}

export default App;
