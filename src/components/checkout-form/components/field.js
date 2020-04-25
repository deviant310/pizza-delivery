const React = require('react');

module.exports = ({components, data}) => {
  let {Input} = components;
  
  return (
    <div className="form-field form-group">
      <label className="d-block">
        <div className="form-field__label">{data.label}</div>
        <Input className="form-control"/>
      </label>
    </div>
  );
}