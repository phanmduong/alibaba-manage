/**
 * Created by phanmduong on 4/6/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ClassComponent from '../components/ClassComponent';
import * as classActions from '../actions/classActions';
import {NavigationActions} from 'react-navigation';

class ClassContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }


    onSelectedItem(classId) {
        this.props.classActions.selectedClassId(classId);
        this.props.listStudentClassScreen();
    }

    render() {
        return (
            <ClassComponent
                classData={this.props.classData}
                onSelectedItem={this.onSelectedItem}
            />
        );
    }
}

ClassContainer.navigationOptions = {
    title: 'Danh sách lớp học',
};

function mapStateToProps(state) {
    return {
        classData: state.dashboard.dashboardData.classes,
        token: state.login.token,
        selectedClassId: state.class.selectedClassId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch),
        listStudentClassScreen: () =>
            dispatch(NavigationActions.navigate({routeName: 'ListStudentClass'}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);