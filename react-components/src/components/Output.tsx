import { Component, ReactNode } from 'react';

interface MyComponentProps {
  dataOutput: {
    img: string;
    title: string;
  } | null;
}
class Output extends Component<MyComponentProps> {
  render(): ReactNode {
    if (!this.props.dataOutput) return null;
    return (
      <div>
        <div key={this.props.dataOutput.title} className="element">
          <img src={this.props.dataOutput.img} alt={this.props.dataOutput.title} />
          <h2>{this.props.dataOutput.title}</h2>
        </div>
      </div>
    );
  }
}

export default Output;