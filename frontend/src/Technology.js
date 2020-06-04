import React from 'react';
import './Timeline.css';
import './Technology.css';

class Technology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {detailsVisible: false};
    this.tags = <ul className="tagsList">{
      this.props.tags.map(tag => <li key={tag}>#{tag}</li>)
    }</ul>;

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() { // TODO
    this.setState(state => ({
      detailsVisible: !state.detailsVisible
    }));
  }

  render() {
    const classes = [
      'Technology',
      this.props.side,
      this.state.detailsVisible ? 'detailed' : ''
    ].join(' ');
    return <li
      className={classes}
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
