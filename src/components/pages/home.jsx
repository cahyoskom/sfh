import React, { Component } from "react";
import {postLogout} from "../../actions";
import {Button} from "reactstrap";
import { connect } from "react-redux";
class Home extends Component {
  
  render() {
    const {postLogout} = this.props;
    return (
      <div>
        <section className="home-page section-b-space">
          <div className="container">
            <h3>Welcome</h3>
            <Button color="warning" onClick={postLogout}>Logout</Button>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({

});
// export default Home;
export default connect(mapStateToProps, {
  postLogout
})(Home);

