const React = require('react');
const ReactRedux = require('react-redux');

let {connect} = ReactRedux;

class Main extends React.PureComponent {
  render(){
    let {components, data, visible, checkoutProcess} = this.props,
      {Form, Title, Fields, SubmitButton} = components;
    
    return (
      <Form className="form form-wrapper">
        <h4 className="mb-4">{data.title}</h4>
        <div className="form__fields mb-4">
          <Fields/>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <SubmitButton className="btn btn-primary" disabled={checkoutProcess}/>
          <button 
            className="btn btn-secondary"
            onClick={e => {
              e.stopPropagation(); 
              this.props.hide();
            }}>
            <span>Hide</span>
          </button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.checkoutIsVisible,
  checkoutProcess: state.checkoutProcess
})

const mapDispatchToProps = dispatch => ({
  hide(){
    dispatch({type: 'HIDE_CHECKOUT'});
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main);