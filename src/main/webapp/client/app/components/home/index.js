import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../actions/counter";
import { hello } from "../../api/hello";

import Title from "./Title";
import Counter from "./Counter";
import Notes from "./Notes";
import Footer from "./Footer";

import "./style.scss";

const Home = props => (
  <div className="home g-flex-column g-flex-item-stretch">
    <Title />
    <Counter {...props} />
    <Notes />
    <Footer {...props} />
  </div>
);

const mapStateToProps = ({ counter }) => ({ ...counter });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      hello,
      changePage: () => push("/about")
    },
    dispatch
  );

// Or can be as below if u want to dispatch action
// const mapDispatchToProps = dispatch => ({
//   changePage: () => dispatch(push('/about-us'))
// })

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/* To push to history:
import { push } from "react-router-redux";
push("/about")
-- OR --
this.props.histtory.push("/about")
*/
