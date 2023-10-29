import { Component } from 'react'

interface ResultType {
    img: string;
    title: string;
}
interface WholeListType {
    name: string;
    url: string;
}

class WholeList extends Component {
    state: { output: ResultType[] | null } = {
        output: null
    }

    componentDidMount() {
        this.fetchWholeList()
    }
    fetchWholeList = async () => {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        let resultList = await response.json();
        console.log(resultList)
        const output = await Promise.all(
            resultList.results.map(async (item: WholeListType) => {

                const response = await fetch(`${item.url}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });

                const result = await response.json();
                console.log('один элемент списка', result)
                return {
                    img: result.sprites.front_default,
                    title: result.name,
                }
            })
        )

        this.setState({ output })
    }
    render() {
        if (!this.state.output) return null

        return this.state.output.map((item: ResultType) => {
            return < div key={item.title} className='element'>
                <img src={item.img} alt={item.title} />
                <h2>{item.title}</h2>
            </div>
        })
    }
}

export default WholeList
