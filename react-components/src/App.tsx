import { Component, ReactNode } from 'react'

import './App.css'
import Output from './components/Output.tsx'
import WholeList from './components/WholeList.tsx'

class App extends Component {
  state = {
    search: localStorage.getItem('searchValue') || '',
    output: null
  }
  submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    const result = await response.json();

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
            <input className='input' type="text" value={this.state.search} onChange={(event) => {
              const value = event?.target?.value || ''
              localStorage.setItem('searchValue', value)
              this.setState({ search: value })
            }} />
            <input type="submit" />
          </form>
        </div>
        <div className='output'>
          {
            this.state.search ? <Output dataOutput={this.state.output} /> : <WholeList />
          }
        </div>
      </div>
    )
  }
}

export default App
