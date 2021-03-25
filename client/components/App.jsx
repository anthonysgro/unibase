import React, { Component } from "react";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { fetchAllCampuses } from "../store/campus";
import { fetchAllStudents } from "../store/student";

// Components
import NotFound from "./NotFound.jsx";
import Loading from "./Loading.jsx";
import Header from "./Header.jsx";
import HomePage from "./Homepage/Homepage.jsx";
import AboutUs from "./AboutUs.jsx";
import CampusListing from "./CampusViews/CampusListing.jsx";
import CampusDetail from "./CampusViews/CampusDetail.jsx";
import CampusAdd from "./Forms/CampusAdd.jsx";
import StudentListing from "./StudentViews/StudentListing.jsx";
import StudentDetail from "./StudentViews/StudentDetail.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // Fetches all the campuses
        this.props.loadAllCampuses();
        this.props.loadAllStudents();

        this.setState({
            loading: false,
        });
    }

    render() {
        const { students } = this.props;
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <main className="listing-main">
                        {this.state.loading ? (
                            <Loading />
                        ) : (
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route
                                    exact
                                    path="/campuses"
                                    component={CampusListing}
                                />
                                <Route
                                    exact
                                    path="/campuses/add"
                                    component={CampusAdd}
                                />
                                <Route
                                    exact
                                    path="/campuses/:id"
                                    component={CampusDetail}
                                />
                                <Route
                                    exact
                                    path="/students"
                                    render={() => (
                                        <StudentListing students={students} />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/students/:id"
                                    component={StudentDetail}
                                />
                                <Route
                                    exact
                                    path="/about-us"
                                    component={AboutUs}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        )}
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.studentInfo.allStudents,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAllCampuses: () => dispatch(fetchAllCampuses()),
        loadAllStudents: () => dispatch(fetchAllStudents()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
