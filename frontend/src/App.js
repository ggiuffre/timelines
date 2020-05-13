import React from 'react';
import Timeline from './Timeline.js';
import './Timeline.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {technologies: [], topic: ''};
    this.updateSubject = this.updateSubject.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    fetch('/timeline/tags')
      .then(res => res.json())
      .then(tags => tags.map(tag => <option value={tag} />))
      .then(options => this.options = options);
  }

  componentDidMount() {
    this.updateTimeline();
  }

  updateSubject(event) {
    this.setState({topic: event.target.value});
  }

  updateTimeline() {
    fetch('/timeline?topic=' + this.state.topic)
      .then(res => res.json())
      .then(technologies => this.setState({technologies: technologies}));
  }

  render() {
    return <div>
      <form id="topic">
        <label>
          Topic:
          <input
            type="text"
            value={this.state.topic}
            onChange={this.updateSubject}
            placeholder="web, Python, OOP..."
            list="topics"
          />
        </label>
        <datalist id="topics">
          {this.options}
        </datalist>
        <button type="button" onClick={this.updateTimeline}>Submit</button>
      </form>
      <Timeline techs={this.state.technologies} />
    </div>;
  }
}

export default App;
