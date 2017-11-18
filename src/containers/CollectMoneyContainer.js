/**
 * Created by phanmduong on 4/24/17.
 */
import React from'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as collectMoneyActions from '../actions/collectMoneyActions';
import CollectMoneyComponent from '../components/CollectMoneyComponent';
import {Dimensions, Keyboard, Platform, Alert} from 'react-native';
import * as alert from '../constants/alert';

class CollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDataStudentList = this.loadDataStudentList.bind(this);
        this.updateFormAndLoadDataSearch = this.updateFormAndLoadDataSearch.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormDataAll = this.updateFormDataAll.bind(this);
        this.updateMoneyStudent = this.updateMoneyStudent.bind(this);
    }


    componentWillMount() {
        this.loadDataStudentList();
    }

    updateFormData(name, value) {
        let formInfoMoney = Object.assign({}, this.props.formInfoMoney);
        formInfoMoney[name] = value;
        this.props.collectMoneyActions.updateFormInfoMoney(formInfoMoney);
    }

    updateFormDataAll(formInfoMoney) {
        this.props.collectMoneyActions.updateFormInfoMoney(formInfoMoney);
    }

    updateMoneyStudent(registerId) {
        this.props.collectMoneyActions.updateMoneyStudent(this.props.token, this.props.formInfoMoney, registerId);
    }

    loadDataStudentList() {
        this.props.collectMoneyActions.loadDataStudentList(this.props.token, this.props.search);
    }

    updateFormAndLoadDataSearch(search) {
        this.props.collectMoneyActions.updateFormAndLoadDataSearch(search, this.props.token);
    }

    selectStudent(student) {
        this.props.collectMoneyActions.selectStudentClassRegister(student);
        this.props.navigation.navigate("StudentRegisterClass");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUpdatingData !== this.props.isUpdatingData) {
            if (!nextProps.isUpdatingData) {
                if (!nextProps.errorUpdate) {
                    Alert.alert(
                        'Thông báo',
                        alert.COLLECT_MONEY_SUCCESSFUL
                    );
                } else {
                    if (nextProps.messageErrorUpdate && nextProps.messageErrorUpdate.trim().length > 0) {
                        Alert.alert(
                            'Thông báo',
                            nextProps.messageErrorUpdate
                        );
                    } else {
                        Alert.alert(
                            'Thông báo',
                            alert.COLLECT_MONEY_FAILED
                        );
                    }
                }
            }

        }
    }

    render() {

        return (
            <CollectMoneyComponent
                studentList={this.props.studentListData}
                error={this.props.error}
                isLoading={this.props.isLoading}
                search={this.props.search}
                loadDataStudentList={this.loadDataStudentList}
                updateFormAndLoadDataSearch={this.updateFormAndLoadDataSearch}
                nextCode={this.props.nextCode}
                nextWaitingCode={this.props.nextWaitingCode}
                onSelectStudent={this.selectStudent}
                updateFormData={this.updateFormData}
                updateFormDataAll={this.updateFormDataAll}
                updateMoneyStudent={this.updateMoneyStudent}
                formInfoMoney={this.props.formInfoMoney}
                isUpdatingMoneyStudent={this.props.isUpdatingData}
                errorUpdate={this.props.errorUpdate}
            />
        );
    }
}

CollectMoneyContainer.navigationOptions = {
    title: 'Nộp tiền',
};

function mapStateToProps(state) {
    return {
        token: state.login.token,
        studentListData: state.collectMoney.studentListData,
        isLoading: state.collectMoney.isLoading,
        error: state.collectMoney.error,
        isUpdatingData: state.collectMoney.isUpdatingData,
        errorUpdate: state.collectMoney.errorUpdate,
        messageErrorUpdate: state.collectMoney.messageErrorUpdate,
        search: state.collectMoney.search,
        nextCode: state.collectMoney.nextCode,
        nextWaitingCode: state.collectMoney.nextWaitingCode,
        formInfoMoney: state.collectMoney.formInfoMoney,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        collectMoneyActions: bindActionCreators(collectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectMoneyContainer);