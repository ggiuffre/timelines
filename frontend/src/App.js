import React from 'react';
import TopicForm from './TopicForm.js';
import Timeline from './Timeline.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {technologies: [], topic: ''};
    this.updateTopic = this.updateTopic.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
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
      <TopicForm
        topic={this.state.topic}
        updateTopic={this.updateTopic}
        updateTimeline={this.updateTimeline}
      />
      <Timeline
        techs={this.state.technologies}
      />
    </div>;
  }
}

export default App;
