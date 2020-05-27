import React from 'react';
import './TopicForm.css';

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateTopic = this.props.updateTopic;
    this.updateTimeline = this.props.updateTimeline;
    fetch('/timeline/tags')
      .then(res => res.json())
      .then(tags => tags.map(tag => <option value={tag} key={tag} />))
      .then(options => options.sort((a, b) => a.key.localeCompare(b.key)))
      .then(options => this.options = options);
  }

  render() {
    return <form name="topic" id="topic" onSubmit={this.updateTimeline}>
      <label>
        Topic:
        <input
          type="text"
          value={this.props.topic}
          onChange={this.updateTopic}
          placeholder="web, Python, OOP..."
          list="topics"
        />
      </label>
      <datalist id="topics">
        {this.options}
      </datalist>
      <input type="submit" value="Update" />
    </form>;
  }
}

export default TopicForm;
