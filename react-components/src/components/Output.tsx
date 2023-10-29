import { Component, ReactNode } from 'react'

interface ResultType {
  img: string;
  title: string;
}

interface MyComponentProps {
  dataOutput: ({
    img: string;
    title: string;
  }[]) | null
}
class Output extends Component<MyComponentProps> {
  render(): ReactNode {
    return (
      <div>
        {this.props.dataOutput?.map((item) => (
          <div key={item.title} className='element'>
            <img src={item.img} alt={item.title} />
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    )
  }

}

export default Output