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
      .then(options => this.options = options)
      .catch(() => alert('Error while fetching data.'));
  }

  render() {

    // checkboxes that provide extra filtering capabilities:
    const typeButtons = Object.keys(this.props.types).map(type =>
      <label key={type}>
        <input
          type="checkbox"
          id={type}
          value={type}
          onChange={this.updateTypes}
          checked={this.props.types[type] || ''}
        /> {type}
      </label>
    );

    // the whole form:
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

      {typeButtons}

      <label>
        <input type="submit" value="Update" />
      </label>
    </form>;
  }
}

export default FilterForm;
