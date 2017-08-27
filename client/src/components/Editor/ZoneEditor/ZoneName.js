/* @flow */

import React from 'react';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const UNDEFINED_ZONE = '-------------';

class ZoneName extends React.Component {
  props: {
    name: string,
    updateName: (value: string) => void,
    classes: Object,
  }
  state: {
    isEditOn: bool,
    name: string,
  } = {
    isEditOn: false,
    name: this.props.name,
  }
  textFieldRef: any

  makeEditable = () => {
    this.setState({ isEditOn: true });
  }
  stopEditing = () => {
    this.setState({ isEditOn: false });
    this.props.updateName(this.state.name);
  }
  updateName = (e: Object) => this.setState({ name: e.target.value });

  setRef = (ref: any) => ref && ref.focus();

  render() {
    const classes = this.props.classes;
    return (
      this.state.isEditOn
      ? <TextField
        value={this.state.name}
        name="zone name"
        onBlur={this.stopEditing}
        onChange={this.updateName}
        inputRef={this.setRef}
      />
      : <div
        onDoubleClick={this.makeEditable}
      >
        <Typography
          className={classes.label}
          noWrap
        >
          {`Zone: ${this.props.name}` || UNDEFINED_ZONE}
        </Typography>
      </div>
    );
  }
}

const styles = (theme: Object) => ({
  label: {
    ...theme.typography.subheading,
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default withStyles(styles)(ZoneName);