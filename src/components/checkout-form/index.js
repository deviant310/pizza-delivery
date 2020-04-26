const React = require('react');
const ReactForm = require('@jfxteam/react-form');

const Components = require.context('./components', false, /\.js$/);

class CheckoutForm extends React.PureComponent {
  constructor(props){
    super(props);
    
    this.ref = React.createRef();
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
          ...this.props.onSubmit ? {
            onSubmit: this.props.onSubmit
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
                  name: 'order[address]',
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