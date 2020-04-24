const React = require('react');

require('./style.css');

class PopUp extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.wrapper = React.createRef();
    
    this.state = {
      visible: this.props.visible
    }
  }
  
  componentDidMount(){
    let wrapper = this.wrapper.current;
    window.addEventListener('click', e => {
      if(!wrapper.contains(e.target)){
        this.close();
      }
    });
  }
  
  open(){
    if(!this.state.visible)
      this.setState({...this.state, ...{visible: true}});
  }
  
  close(){
    if(this.state.visible)
      this.setState({...this.state, ...{visible: false}});
  }
  
  toggle(concrete){
    this.setState({...this.state, ...{visible: concrete || !this.state.visible}});
  }
  
  render(){
    return (
      <div className={['popup', this.state.visible ? 'popup--visible' : '', this.props.className, 'position-absolute'].filter(v => v).join(' ')} ref={this.wrapper}>
        <div className={`popup__stick position-${this.props.fixed ? 'fixed' : 'absolute'}`}>
          <div className="popup__container">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

module.exports = PopUp;