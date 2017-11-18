import React from'react';
import {Dimensions} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Left,
    Right,
    Title,
    Body,
    Icon,
    View,
    ListItem,
    List,
    Text,
    Thumbnail
} from 'native-base';
var {height, width} = Dimensions.get('window');
import Spinkit from 'react-native-spinkit';
import _ from 'lodash';
import theme from '../styles';

class BaseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        let baseData = nextProps.baseData;
        _.reverse(baseData);
    }

    render() {
        return (
            (<Container>
                <Header style={{paddingLeft: 0, paddingRight: 0}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Left/>
                        <Body>
                        <Title>Cơ sở</Title>
                        </Body>
                        <Right>
                            <Button
                                transparent
                                onPress = {this.props.openDrawer}
                            >
                                <Icon name='menu' style={{color: '#fff'}}/>
                            </Button>
                        </Right>
                    </View>
                </Header>

                    {(this.props.isLoading) ?
                        (
                        <View style={styles.container}>
                            <Spinkit
                                isVisible
                                color={theme.mainColor}
                                type='Wave'
                                size={width/8}
                            />
                        </View>
                        ) :
                        (
                            <Content>
                            <List
                                dataArray={this.props.baseData}
                                renderRow={
                                    (item) => (
                                        <ListItem
                                            onPress = {() => this.props.onSelectedItem(item.id)}
                                            onLongPress = {()=>{}}
                                            button
                                        >
                                            <Thumbnail small source = {require('../../assets/img/avartar_colorme.jpg')}/>
                                            <Body>
                                            <Text>{item.name}</Text>
                                            </Body>
                                            <Right>
                                                <Icon name="arrow-forward"/>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            >
                            </List>
                            </Content>
                        )}

            </Container>)
        );
    }
}

const styles = ({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 37
    },
    list: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BaseComponent;