import React from 'react';
import {
    List
} from 'native-base';
import {Dimensions} from 'react-native';
import ListItemClass from './listItem/ListItemClass';
import Loading from "./common/Loading";

var {height, width} = Dimensions.get('window');

class ClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 500);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Loading size={width / 8}/>
            )
        } else {
            return (
                (
                    <List
                        dataArray={this.props.classData}
                        renderRow={
                            (item, sectionID, rowID) => (
                                <ListItemClass
                                    nameClass={item.name}
                                    avatar={item.avatar_url}
                                    studyTime={item.study_time}
                                    totalPaid={item.total_paid}
                                    totalRegisters={item.total_registers}
                                    paidTarget={item.paid_target}
                                    registerTarget={item.register_target}
                                    onPress={this.props.onSelectedItem}
                                    classId={item.id}
                                />
                            )
                        }
                    />
                )
            );
        }
    }
}

export default ClassComponent;