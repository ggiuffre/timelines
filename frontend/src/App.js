import React from 'react';
import TopicForm from './TopicForm.js';
import Timeline from './Timeline.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {technologies: [], topic: ''};
    this.updateTopic = this.updateTopic.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    this.topicFormFullPage = true;
  }

  componentDidMount() {
    this.updateTimeline();
  }

  updateTopic(event) {
    this.setState({topic: event.target.value});
  }

  updateTimeline(event) {
    // if the timeline is updated due to a browser event...
    if (arguments.length > 0) {
      // ... avoid refreshing the page:
      event.preventDefault();

      // ... minimize the topic form after its first use:
      if (this.topicFormFullPage)
        this.topicFormFullPage = false;
    }

    // update the state of the timeline:
    let endpoint = '/timeline';
    endpoint += '?topic=' + this.state.topic;
    // TODO endpoint += '?types=' + this.state.topic;
    fetch(endpoint)
      .then(res => res.json())
      .then(technologies => this.setState({technologies: technologies}));
  }

  render() {
    const topicForm = <TopicForm
        topic={this.state.topic}
        updateTopic={this.updateTopic}
        updateTimeline={this.updateTimeline}
        fullPage={this.topicFormFullPage}
      />;

    const timeline = this.topicFormFullPage ? '' :
      <Timeline techs={this.state.technologies} />;

    return <div>
      {topicForm}
      {timeline}
    </div>;
  }
}

export default App;
