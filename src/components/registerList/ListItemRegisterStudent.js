import React from'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
    Icon
} from 'native-base';
import theme from '../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from '../common/Call';

class ListItemStudent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onPressed: false
        };
    }

    onChangePress() {
        this.setState({
            onPressed: !this.state.onPressed
        });
    }

    content() {
        const {name, avatar, nameClass, saler, campaign, callStatus, paidStatus, money} = this.props;
        return (
            <View style={styles.container}>
                <View style={{position: 'relative'}}>
                    <Thumbnail small source={{uri: avatar}} style={styles.avatar}/>
                    <View style={{
                        ...styles.dotCall, ...{
                            backgroundColor: (callStatus === 'uncall') ? '#bdbdbd' :
                                (callStatus === 'success') ? '#4dc151' : theme.secondColor
                        }
                    }}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        <View style={styles.contentTitle}>
                            <Text style={styles.title}>{name.trim().toUpperCase()}</Text>
                            {(Boolean(paidStatus)) ?
                                (
                                    <MaterialCommunityIcons
                                        name='checkbox-marked-circle'
                                        color={(money <= 0) ? '#bdbdbd' : '#4dc151'}
                                        size={12}
                                    />
                                )
                                :
                                (
                                    <View/>
                                )
                            }

                        </View>
                        {(this.state.onPressed) ?
                            (
                                <Icon
                                    style={styles.icon}
                                    ios='ios-arrow-up'
                                    android="md-arrow-dropup"
                                    name="ios-arrow-up"/>
                            )
                            :
                            (
                                <Icon
                                    name="ios-arrow-up"
                                    ios='ios-arrow-down'
                                    android="md-arrow-dropdown"
                                    style={styles.icon}
                                />
                            )
                        }
                    </View>
                    <View style={styles.containerSubTitle}>
                        <Text style={styles.subTitle}>{nameClass}</Text>
                    </View>
                    <View style={styles.containerSubTitle}>
                        {(saler) ?
                            (
                                <View style={{
                                    ...styles.card, ...
                                        {
                                            backgroundColor: (!saler.color || saler.color === '')
                                                ? theme.processColor1 : '#' + saler.color
                                        }
                                }}
                                >
                                    <Text style={styles.saler}>{saler.name.trim().toUpperCase()}</Text>
                                </View>
                            )
                            :
                            (
                                <View/>
                            )
                        }
                        {(campaign) ?
                            (
                                <View style={{
                                    ...styles.card, ...
                                        {
                                            backgroundColor: (!campaign.color || campaign.color === '')
                                                ? theme.processColor1 : '#' + campaign.color,
                                            marginLeft: 5
                                        }
                                }}
                                >
                                    <Text style={styles.campaign}>{campaign.name.trim().toUpperCase()}</Text>
                                </View>
                            )
                            :
                            (
                                <View/>
                            )
                        }

                    </View>
                </View>
            </View>
        )
    }

    renderExpand() {
        var {phone, email} = this.props;
        if (this.state.onPressed) {
            return (
                <View style={styles.containerExpand}>
                    <Text style={styles.email}>{email}</Text>
                    <Call
                        url={'tel:' + phone}
                        phone={phone}
                    />
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableNativeFeedback onPress={() => this.onChangePress()}>
                        <View style={styles.containerAll}>
                            {this.content()}
                            {this.renderExpand()}
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.line}/>
                </View>
            );
        }

    }
}

const styles = ({
    containerAll: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    container: {
        flexDirection: 'row',
    },
    containerExpand: {
        marginLeft: 55,
    },
    content: {
        flex: 1,
        marginLeft: 20,
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#555555',
        fontWeight: '900',
        fontSize: (Platform.isPad) ? 18 : 13,
        marginRight: 5
    },
    subTitle: {
        color: '#7d7d7d',
        fontSize: 12
    },
    icon: {
        fontSize: 20,
        color: theme.colorTitle,
    },
    line: {
        height: 1,
        backgroundColor: theme.borderColor,
        marginRight: 20,
        marginLeft: 75
    },
    containerSubTitle: {
        flexDirection: 'row'
    },
    email: {
        color: theme.colorSubTitle,
        marginTop: 5,
        fontSize: (Platform.isPad) ? 18 : 13
    },
    card: {
        height: 15,
        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saler: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    },
    campaign: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    },
    contentTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotCall: {
        position: 'absolute',
        top: 25,
        left: 25,
        height: 12,
        width: 12,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: 'white',
    },
});

export default ListItemStudent;