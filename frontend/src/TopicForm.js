import React from 'react';
import './TopicForm.css';

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateTopic = this.props.updateTopic;
    this.updateTypes = this.props.updateTypes;
    this.updateTimeline = this.props.updateTimeline;
    fetch('/timeline/tags')
      .then(res => res.json())
      .then(tags => tags.map(tag => <option value={tag} key={tag} />))
      .then(options => options.sort((a, b) => a.key.localeCompare(b.key)))
      .then(options => this.options = options);
  }

  render() {
    return <form
        className={this.props.fullPage ? 'fullpage' : ''}
        name="topic"
        id="topic"
        onSubmit={this.updateTimeline}
      >
      <label>Topic: <input
          tabIndex="1"
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

      <label>
        <input
          type="checkbox"
          id="languages"
          value="languages"
          onChange={this.updateTypes}
          checked={this.props.types.languages || ''}
        />
        show languages
      </label>

      <label>
        <input
          type="checkbox"
          id="libraries"
          value="libraries"
          onChange={this.updateTypes}
          checked={this.props.types.libraries || ''}
        />
        show libraries
      </label>

      <label>
        <input
          type="checkbox"
          id="softwares"
          value="softwares"
          onChange={this.updateTypes}
          checked={this.props.types.softwares || ''}
        />
        show softwares
      </label>

      <input type="submit" value="Update" />
    </form>;
  }
}

export default TopicForm;
