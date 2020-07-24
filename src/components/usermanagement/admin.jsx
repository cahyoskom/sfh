import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import BlockUi from "react-block-ui";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Label,
  Input,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import * as actions from "../../actions";
import Breadcrumb from "../common/breadcrumb";

class Admin extends Component {
  constructor(props) {
    super(props);
    //console.log('vrovs',props)
    this.state = {};
    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  componentDidMount() {}

  onClickSignOut() {
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL;
  }

  renderView() {
    let {
      taskGuruState,
      setStateTaskListFilter,
      setStateModalForm,
      getTaskGuruList,
    } = this.props;

    return (
      <div>
        <Breadcrumb
          title={
            <Link to={`${process.env.PUBLIC_URL}/usermanagement`}>
              User Management
            </Link>
          }
        />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Card>
                <CardTitle className="text-center" style={{ marginTop: "5px" }}>
                  <h4>Group</h4>
                </CardTitle>
                <Link to={`${process.env.PUBLIC_URL}/usermanagement/group/`}>
                  <CardImg
                    center
                    width="50%"
                    style={{ backgroundColor: "white" }}
                    src={`${process.env.PUBLIC_URL}/assets/images/icon/group.png`}
                    alt="Card image cap"
                  />
                </Link>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardTitle className="text-center" style={{ marginTop: "5px" }}>
                  <h4>User</h4>
                </CardTitle>
                <Link to={`${process.env.PUBLIC_URL}/usermanagement/user/`}>
                  <CardImg
                    center
                    width="50%"
                    style={{ backgroundColor: "white" }}
                    src={`${process.env.PUBLIC_URL}/assets/images/icon/user2.png`}
                    alt="Card image cap"
                  />
                </Link>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardTitle className="text-center" style={{ marginTop: "5px" }}>
                  <h4>Class</h4>
                </CardTitle>
                <Link to={`${process.env.PUBLIC_URL}/usermanagement/class/`}>
                  <CardImg
                    center
                    width="50%"
                    style={{ backgroundColor: "white" }}
                    src={`${process.env.PUBLIC_URL}/assets/images/icon/class.png`}
                    alt="Card image cap"
                  />
                </Link>
              </Card>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <Card>
                <CardTitle className="text-center" style={{ marginTop: "5px" }}>
                  <h4>Subject</h4>
                </CardTitle>
                <Link to={`${process.env.PUBLIC_URL}/usermanagement/subject/`}>
                  <CardImg
                    center
                    width="50%"
                    style={{ backgroundColor: "white" }}
                    src={`${process.env.PUBLIC_URL}/assets/images/icon/subject.png`}
                    alt="Card image cap"
                  />
                </Link>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardTitle className="text-center" style={{ marginTop: "5px" }}>
                  <h4>Student</h4>
                </CardTitle>
                <Link to={`${process.env.PUBLIC_URL}/usermanagement/student/`}>
                  <CardImg
                    center
                    width="50%"
                    style={{ backgroundColor: "white" }}
                    src={`${process.env.PUBLIC_URL}/assets/images/icon/student3.png`}
                    alt="Card image cap"
                  />
                </Link>
              </Card>
            </div>
            {/* <div className="col-md-4">
                        <Card>
                            <CardTitle className="text-center" style={{marginTop:"5px"}}><h4>Role</h4></CardTitle>
                            <Link to={`${process.env.PUBLIC_URL}/usermanagement/role/`}>
                            <CardImg 
                            center 
                            width="50%" 
                            style={{backgroundColor:"white"}}
                            src={`${
                            process.env.PUBLIC_URL
                            }/assets/images/icon/role.png`} 
                            alt="Card image cap" 
                            />
                            </Link>
                        </Card>
                        </div> */}
          </div>
        </div>
      </div>
    );
  }

  render() {
    //console.log('block render')
    let { taskGuruState } = this.props;
    return (
      <BlockUi
        tag="div"
        blocking={taskGuruState.loader}
        message={
          <span>
            <div id="preloader">
              <div id="loader" />
            </div>
          </span>
        }
      >
        {this.renderView()}
      </BlockUi>
    );
  }
}

const mapStateToProps = (state) => ({
  taskGuruState: state.taskGuru,
});

export default connect(mapStateToProps, { ...actions })(withTranslate(Admin));
