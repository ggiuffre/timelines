import React from 'react';
import Timeline from './Timeline.js';
import './Timeline.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {technologies: [], topic: ''};
    this.updateTopic = this.updateTopic.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    fetch('/timeline/tags')
      .then(res => res.json())
      .then(tags => tags.map(tag => <option value={tag} key={tag} />))
      .then(options => this.options = options);
  }

  componentDidMount() {
    this.updateTimeline();
  }

  updateTopic(event) {
    this.setState({topic: event.target.value});
  }

  updateTimeline(event) {
    if (arguments.length > 0) event.preventDefault();
    fetch('/timeline?topic=' + this.state.topic)
      .then(res => res.json())
      .then(technologies => this.setState({technologies: technologies}));
  }

  render() {
    return <div>
      <form name="topic" id="topic" onSubmit={this.updateTimeline}>
        <label>
          Topic:
          <input
            type="text"
            value={this.state.topic}
            onChange={this.updateTopic}
            placeholder="web, Python, OOP..."
            list="topics"
          />
        </label>
        <datalist id="topics">
          {this.options}
        </datalist>
        <input type="submit" value="Update" />
      </form>
      <Timeline techs={this.state.technologies} />
    </div>;
  }
}

export default App;
