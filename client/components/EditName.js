// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {updateUser} from '../store/user';

// export class EditName extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       name: this.props.user.name,
//       id: this.props.user.id
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange (event) {
//     this.setState({
//       name: event.target.value
//     });
//     console.log(this.state);
//   }

//   handleSubmit (event) {
//     event.preventDefault();
//     this.props.updateUser(this.state);
//     console.log(this.state)
//   }

//   render () {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input type="text" onChange={this.handleChange} value={this.state.name} />
//       </form>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   user: state.user
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateUser: (update) => dispatch(updateUser(update))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditName);
