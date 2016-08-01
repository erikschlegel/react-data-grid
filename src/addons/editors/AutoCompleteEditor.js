const React                   = require('react');
const ReactDOM                = require('react-dom');
const Select                  = require('react-select');
const ExcelColumn             = require('../../PropTypeShapes/ExcelColumn');

let optionPropType = React.PropTypes.shape({
  value: React.PropTypes.required,
  label: React.PropTypes.string
});

const AutoCompleteEditor = React.createClass({

  propTypes: {
    onCommit: React.PropTypes.func,
    options: React.PropTypes.arrayOf(optionPropType),
    label: React.PropTypes.any,
    value: React.PropTypes.any,
    height: React.PropTypes.number,
    valueParams: React.PropTypes.arrayOf(React.PropTypes.string),
    column: React.PropTypes.shape(ExcelColumn),
    search: React.PropTypes.string,
    onKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  handleChange() {
    debugger;
    this.props.onCommit();
  },

  getValue(): any {
    debugger;
    let value = '';
    let updated = {};
    if (this.hasResults() && this.isFocusedOnSuggestion()) {
      let focusedOption = this.refs.autoComplete.state.focusedOption;
      if (focusedOption) {
        value = this.getLabel(focusedOption);
        if (this.props.valueParams) {
          value = this.constuctValueFromParams(this.refs.autoComplete.state.focusedOption, this.props.valueParams);
        }
      }
    } else {
      if (this.refs.autoComplete.searchTerm) {
        value = this.refs.autoComplete.state.searchTerm;
      }
    }

    updated[this.props.column.key] = value;
    return updated;
  },

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
  },

  getLabel(item: any): string {
    let label = this.props.label != null ? this.props.label : 'label';
    if (typeof label === 'function') {
      return label(item);
    } else if (typeof label === 'string') {
      return item[label];
    }
  },

  hasResults(): boolean {
    return this.refs.autoComplete.filterOptions().length > 0;
  },

  isFocusedOnSuggestion(): boolean {
    return this.refs.autoComplete.state.isFocused;
  },

  constuctValueFromParams(obj: any, props: ?Array<string>): string {
    debugger;
    if (!props) {
      return '';
    }

    let ret = [];
    for (let i = 0, ii = props.length; i < ii; i++) {
      ret.push(obj[props[i]]);
    }
    return ret.join('|');
  },

  render(): ?ReactElement {
    return <Select ref={'autoComplete'} options={this.props.options} placeholder={''} clearable={false} />;
  }
});

module.exports = AutoCompleteEditor;
