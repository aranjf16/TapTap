import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';



  export default class App extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        color: 'green',
        colorArr: ['green', 'blue', 'red', 'yellow', 'purple', 'black', 'pink', 'orange', 'brown'],
        counter: 0,
        pos: .5,
        gameOver: false,
        winner: '',
        oneWins: 0,
        twoWins: 0

      }
    }
    componentDidMount(){
    let interval =  setInterval(() => { this.setState({
          color: this.state.colorArr[this.state.counter],
          counter: (this.state.counter + 1) % 9
        })
    }, 50)
    }
    moveUp(){
      if(this.state.winner === ''){
      this.setState({
        pos: this.state.pos + .05
      })
      if(this.state.pos > 1){
        this.setState({
          winner: 'One',
          gameOver: true,
        })
      } if(this.state.pos < 1.04 && this.state.pos > .96){
        this.setState({
          oneWins: this.state.oneWins + 1
        })
      }
      }
    }
    moveDown(){
      if(this.state.winner === ''){
      this.setState({
        pos: this.state.pos - .05
      })
      if(this.state.pos < 0){
        this.setState({
          winner: 'Two',
          gameOver: true
        })
      } if(this.state.pos > -.04 && this.state.pos < .04){
        this.setState({
          twoWins: this.state.twoWins + 1
        })
      }
    }
    }
    reset(){
      this.setState({
        pos: .5,
        gameOver: false,
        winner: ''
      })
    }
    newGame(){
      this.setState({
        pos: .5,
        gameOver: false,
        winner: '',
        oneWins: 0,
        twoWins: 0
      })
    }
    render() {
      let won = (this.state.gameOver) ? (<View style={{alignItems:'center'}}><Text style={{fontSize: 50}}>Player {this.state.winner} Wins!</Text>
         <Button
      onPress={this.reset.bind(this)} title='Play again?'/>
      <Text>Player One: {this.state.oneWins}   Player Two: {this.state.twoWins}</Text>
         <Button onPress={this.newGame.bind(this)} title='Reset Game?' />
        </View>) :
      <View style={styles.path}>
      <View style={[{flex: this.state.pos}, styles.ball]} />
      </View>
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.moveUp.bind(this)} style={[{backgroundColor: this.state.color}, styles.buttons]}/>
                   {won}
         <TouchableOpacity onPress={this.moveDown.bind(this)} style={[{backgroundColor: this.state.color}, styles.buttons]}/>
         </View>
      );
    }
  }






  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    path: {
      flex: 1,
      height: 150,
      width: 20,
      backgroundColor: "green"
    },
    buttons: {
      width: 3000,
      height: 150,
    },
    ball: {
      width: 20,
      height: 20,
      backgroundColor: 'red'
    },
  });
