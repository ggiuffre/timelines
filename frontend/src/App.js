import React from 'react';
import FilterForm from './FilterForm.js';
import Timeline from './Timeline.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technologies: [],
      topic: '',
      types: {
        languages: 'yup',
        libraries: 'yup',
        softwares: 'yup'
      }
    };
    this.updateTopic = this.updateTopic.bind(this);
    this.updateTypes = this.updateTypes.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    this.topicFormFullPage = true;
  }

  componentDidMount() {
    this.updateTimeline();
  }

  updateTopic(event) {
    this.setState({topic: event.target.value});
  }

  updateTypes(event) {
    let types = this.state.types;
    types[event.target.value] = event.target.checked;
    this.setState(types);
  }

  updateTimeline(event) {
    // if the timeline is updated due to a browser event...
    if (arguments.length > 0) {
      // avoid refreshing the page:
      event.preventDefault();

      // minimize the topic form after its first use:
      if (this.topicFormFullPage)
        this.topicFormFullPage = false;
    }

    // update the state of the timeline:
    let endpoint = '/timeline';
    endpoint += '?topic=' + this.state.topic;
    Object.keys(this.state.types).forEach(key => {
      endpoint += '&' + key + '=' + (this.state.types[key] || '');
    });
    fetch(endpoint)
      .then(res => res.json())
      .then(technologies => this.setState({technologies: technologies}));
  }

  render() {
    const topicForm = <FilterForm
        topic={this.state.topic}
        types={this.state.types}
        updateTopic={this.updateTopic}
        updateTypes={this.updateTypes}
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
