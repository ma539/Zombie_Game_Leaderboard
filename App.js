import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, Text, View, ScrollView, Image, ImageBackground} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Leaderboard from 'react-native-leaderboard';
type Props = {};

const remote = 'http://the-auditorium.com/wp-content/uploads/2015/11/zombie-background.jpg';

export default class App extends Component<Props> {

  constructor() {
    super()
    this.state = {
      data: []
    }

  }


   componentDidMount() {
     fetch("https://zombie-survival.herokuapp.com/users")
     .then(resp => resp.json())
     .then(data => this.setState({ data }))
   }

   _alert = (title, body) => {
       Alert.alert(title, body,
           [{ text: 'OK', onPress: () => { } },],
           { cancelable: false }
       )
   }


   render() {
       const props = {
           labelBy: 'name',
           sortBy: 'score',
           data: this.state.data,
           icon: 'iconUrl',
           onRowPress: (item, index) => {
               this._alert(item.name + " clicked",
                   item.score + " points, wow!")
           },
           evenRowColor: '#edfcf9',
       }
       const resizeMode = 'center';
       const text = 'Zombie_Survival Leaderboard';


         return (
             <View>
                 {/* Ghetto Header */}
                 <ImageBackground source={{ uri: remote }} style={{ paddingTop: 100, backgroundColor: 'black', alignItems: 'center' }}>
                     <Text style={{ fontSize: 40, color: 'white', paddingBottom: 10 }}>
                         Zombie_Survival Leaderboard
                     </Text>
                 </ImageBackground>
                 <Leaderboard {...props} />
             </View>
         )
   }

}
