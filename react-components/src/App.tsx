import { Component, ReactNode } from 'react'

import './App.css'
import Output from './components/Output.tsx'

class App extends Component {
  state = {
    search: '',
    output: null
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

    this.setState({
      output: {
        img: result.sprites.front_default,
        title: result.name,
      }
    })
  }

  render(): ReactNode {

    return (
      <div className='wrapper'>
        <div className='search'>
          <form className='form' onSubmit={this.submit} >
            <input className='input' type="text" value={this.state.search} onChange={(event) => this.setState({
              search: event?.target?.value || ''
            })} />
            <input type="submit" />
          </form>
        </div>
        <div className='output'>
          {
            this.state.search ? <Output dataOutput={this.state.output} /> : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default App
