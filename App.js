import React, {Component} from 'react';
import { Image, TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import styles from './styles/Styles';
//Github: https://github.com/isaac-oliveira/Cronometro.git
const delay = 1000;

export default class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    seg: 0,
    min: 0,
    h: 0,
    playing: false,
    icon: require('/assets/ic_play.png'),
  };
  }
  
  atualizar = () => {
     if(this.state.playing) {
      if(this.state.min == 60) this.setState({h: this.state.h + 1, min:0, seg:0});
      else if(this.state.seg == 59) this.setState({min: this.state.min + 1, seg:0});
      else this.setState({seg: this.state.seg + 1});
      setTimeout(this.atualizar, delay);
     }    
  }
  
  resetar = () => {
     this.setState({h:0, min:0, seg: 0, playing: false});
     this.setState({icon: require('/assets/ic_play.png')});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cronometro}>
         <View style={styles.layoutNumb}>
          <Text style={styles.numeros}>{this.state.h}</Text>
         </View>
         <View style={styles.layoutNumb}>
          <Text style={styles.numeros}>{this.state.min}</Text>
         </View>
         <View style={styles.layoutNumb}>
          <Text style={styles.numeros}>{this.state.seg}</Text>
          </View>
        </View>
        <View style={styles.layoutBtn}>
           <TouchableHighlight style={styles.btn} onPress={()=>{
           if(!this.state.playing) {
             this.setState({playing:true});
             setTimeout(this.atualizar, delay);
           } else {
              this.setState({playing: false});
           }
           if(require('/assets/ic_play.png') == this.state.icon) this.setState({icon: require('/assets/ic_pause.png')});
           else this.setState({icon: require('/assets/ic_play.png')});
        }}>
           <Image style={styles.img} source={this.state.icon}/>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.btn} onPress={this.resetar}>
           <Image style={styles.img} source={require('/assets/ic_refresh.png')}/>
        </TouchableHighlight>
        </View>
      </View>
    );
  }
}