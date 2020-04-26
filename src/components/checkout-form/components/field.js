const React = require('react');


class Field extends React.PureComponent {
  render(){
    let {components, data} = this.props,
      {Input} = components;
    
    return (
      <div className="form-field form-group">
        <label className="d-block">
          <div className="form-field__label">{data.label}</div>
          <Input className="form-control"/>
        </label>
      </div>
    )
  }
}
module.exports = Field;