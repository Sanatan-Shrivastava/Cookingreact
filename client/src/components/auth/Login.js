import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from "prop-types";
import logo from "../../img/iiitk-logo.webp"
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }


onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
render() {
    const { errors } = this.state;
return (
  <div className="app flex-row align-items-center">
  <div className="container">
    <Row className="justify-content-center">
      <Col md="8">
        <CardGroup>
          <Card className="p-4">
            <CardBody>
              <Form noValidate onSubmit={this.onSubmit}>
                <h2>Login</h2>
                <p className="text-muted">Sign In to your ERP account</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                      </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                </InputGroup>
                <Row>
                  <Col xs="6">
                  <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    color: "primary"
                  }}
                  type="submit"
                  className="mt-3"
                >
                  Login
                </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <Card className="text-white py-5 d-md-down-none">
          <img alt="IIIT KOTA" style={{height:'100%', width:'100%', paddingRight:'0em'}} src={logo}/>
            <CardBody style={{backgroundColor:'#fff'}} className="text-center">
              <div>
                <Link to="/register">
                  <Button style={{marginTop: '1em'}} color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  </div>
</div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);