import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Order from './Order';
import {getLoggedInUser, updateUser} from '../store/user';
import {withRouter} from 'react-router-dom';

export class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {},
      editing: false,
      name: this.props.user.name,
      id: this.props.user.id
    }
    this.goToEdit = this.goToEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount () {
    this.props.loadInitialData();
    if (+this.props.match.params.id === this.props.user.id) {
      const user = await axios.get(`/api/user/${this.props.match.params.id}`);
      this.setState({
        user: user.data
      });
    }
  }

  goToEdit () {
    this.setState({
      editing: true
    });
    const btn = document.getElementById('edit-btn');
    btn.innerHTML = 'Save';
    btn.type = 'submit';
    btn.onclick = this.handleSubmit;
  }

  handleChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  async handleSubmit (event) {
    event.preventDefault();
    const update = await this.props.updateUser(this.state);
    const btn = document.getElementById('edit-btn');
    btn.innerHTML = 'Edit';
    btn.type = 'button';
    btn.onclick = this.goToEdit;
    this.setState({
      user: update,
      editing: false,
      name: update.name,
      id: this.props.user.id
    });
  }

  render () {

    const EditName = (
    <form onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleChange} value={this.state.name} />
    </form>)

    return (
      <div className="user-container">
      {this.state.user.id ?
        <div>
          <br />
          <span id="name">Name:&nbsp;
            {this.state.editing ? EditName : this.state.user.name}&nbsp;
            <button id="edit-btn" className="link-bordered unpadded-link" type="button" onClick={this.goToEdit}>Edit</button>
          </span>
          <br />
          <p>Email: {this.state.user.email}</p>
          <br />
          <br />
          <br />
          <div>
            <p>Past Orders</p>
            <div>
              {this.state.user.orders ?
                this.state.user.orders.map(order => (
                <Order key={order.id} order={order} />
                ))
              :
              'No order history.'
              }
            </div>
          </div>
        </div>
        :
        <p>Sorry, you are not authorized to view this page.</p>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
    loadInitialData() {
      return dispatch(getLoggedInUser())
    },
    updateUser: (user) => dispatch(updateUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
