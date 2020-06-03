import React from 'react';
import Technology from './Technology.js';
import './Timeline.css';

class Timeline extends React.Component {
  render() {
    return <ul className="Timeline">
      {this.props.techs
        .sort((a, b) => (a.birth - b.birth))
        .map((item, idx) =>
          this.decoratedTechnology(item, (idx % 2 ? 'left' : 'right')))
      }
    </ul>;
  }

  decoratedTechnology(data, side = 'right') {
    return <Technology
      key={data.name}
      name={data.name}
      birth={data.birth}
      tags={data.tags}
      side={side}
    />;
  }
}

export default Timeline;
