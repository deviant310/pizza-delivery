const React = require('react');
const ReactForm = require('@jfxteam/react-form');

const Components = require.context('./components', false, /\.js$/);

const API = {
  Cart: require('api/cart.js'),
  Order: require('api/order.js')
}

class CheckoutForm extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.ref = React.createRef();
  }
  
  async submit(data){
    data['order[positions]'] = API.Cart.positions;
    
    let order = await API.Order.create(data);
    
    debugger;
  }
  
  render(){
    return (
      <ReactForm
        ref={this.ref}
        options={{
          ...this.props.title ? {
            title: this.props.title
          } : {},
          ...this.props.data ? {
            data: this.props.data,
          } : {},
          ...this.props.submitText ? {
            submitText: this.props.submitText,
          } : {},
          ...{
            type: 'div',
            fields: {
              name: {
                label: 'Name',
                input: {
                  name: 'client[name]',
                  type: 'text',
                  required: true
                }
              },
              email: {
                label: 'Email',
                input: {
                  name: 'client[email]',
                  type: 'email',
                  required: true
                }
              },
              phone: {
                label: 'Phone',
                input: {
                  name: 'client[phone]',
                  type: 'tel',
                  required: true
                }
              },
              address: {
                label: 'Address',
                input: {
                  name: 'client[address]',
                  type: 'text',
                  required: true
                }
              },
              comment: {
                label: 'Comment',
                input: {
                  name: 'order[comment]',
                  type: 'textarea',
                  required: true
                }
              }
            },
            onSubmit: e => {
              e.preventDefault();
              this.submit(e.detail);
            }
          },
        }}
        components={{
          main: Components('./main.js'),
          field: Components('./field.js'),
        }}
      />
    );
  }
}

module.exports = CheckoutForm;