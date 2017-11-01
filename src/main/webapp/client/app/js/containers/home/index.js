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

import "./style.scss";

const Home = props => (
  <div>
    <h1>Home</h1>
    <p className="counter">Count: {props.count}</p>

    <p>
      <button onClick={props.increment} disabled={props.isIncrementing}>
        Increment
      </button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement} disabled={props.isDecrementing}>
        Decrementing
      </button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <hr />
    <button onClick={props.changePage}>Go to about page via redux</button>
    <button onClick={props.hello}>Try fetch</button>
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
      changePage: () => push("/about-us")
    },
    dispatch
  );

// Or can be as below if u want to dispatch action
// const mapDispatchToProps = dispatch => ({
//   changePage: () => dispatch(push('/about-us'))
// })

export default connect(mapStateToProps, mapDispatchToProps)(Home);
