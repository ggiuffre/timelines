import React from 'react';
import './Timeline.css';
import './Technology.css';

class Technology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {detailsVisible: false};
    this.tags = <ul className="tagsList">{
      this.props.tags.map(tag => <li>#{tag}</li>)
    }</ul>;

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() { // TODO
    this.setState(state => ({
      detailsVisible: !state.detailsVisible
    }));
  }

  render() {
    return <li
      className={"Technology " + this.props.side}
      onClick={this.showDetails}
      >
      <span className="content">
        {this.props.name} ({this.props.birth})
        {this.tags}
      </span>
    </li>;
  }
}

export default Technology;
