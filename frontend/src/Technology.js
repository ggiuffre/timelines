import React from 'react';
import './Timeline.css';
import './Technology.css';

class Technology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {detailsVisible: false};

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() {
    this.setState(state => ({
      detailsVisible: !state.detailsVisible
    }));
  }

  prettyDetails() {
    return <span> <em>{this.props.details}</em></span>;
  }

  render() {
    return <li
      className={"Technology " + this.props.side}
      onClick={this.showDetails}
      >
      <span className="content">
        {this.props.name} ({this.props.birth})
        {this.state.detailsVisible ? this.prettyDetails() : ''}
      </span>
    </li>;
  }
}

export default Technology;
