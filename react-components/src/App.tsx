import { Component } from 'react'

import './App.css'

class App extends Component {
  state = {
    search: ''
  }
  submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    let result = await response.json();
    console.log(result);
  }
  render() {

    return (
      <>
        <div className='wrapper'>
          <div className='search'>
            <form className='form' onSubmit={this.submit} >
              <input className='input' type="text" value={this.state.search} onChange={(event) => this.setState({
                search: event?.target?.value || ''
              })} />
              <input type="submit" />
            </form>
          </div>
          <div className='output'></div>
        </div>
      </>
    )
  }
}

export default App
