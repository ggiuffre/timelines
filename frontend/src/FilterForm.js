import React from 'react';
import './FilterForm.css';

class FilterForm extends React.Component {
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
        name="filter"
        id="filter"
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
        languages
      </label>

      <label>
        <input
          type="checkbox"
          id="libraries"
          value="libraries"
          onChange={this.updateTypes}
          checked={this.props.types.libraries || ''}
        />
        libraries
      </label>

      <label>
        <input
          type="checkbox"
          id="softwares"
          value="softwares"
          onChange={this.updateTypes}
          checked={this.props.types.softwares || ''}
        />
        softwares
      </label>

      <input type="submit" value="Update" />
    </form>;
  }
}

export default FilterForm;
