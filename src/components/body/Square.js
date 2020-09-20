import React, {Component} from 'react';

class Square extends Component {
    render() {
    /**
        Square component setup, mouseEvents and background colour

        Return: None
    */
      return (
        <button
        id={this.props.id}
        style={{backgroundColor: this.props.colour}} className="square"
        onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.column)}
        onMouseUp={() => this.props.onMouseUp(this.props.row, this.props.column)}
        onMouseOver={() => this.props.onMouseOver(this.props.row, this.props.column)}
        ></button>
        )}
  }

  export default Square;