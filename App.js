<script src="http://192.168.100.15:8097"></script>  
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { vibrate } from './utils'
class Count extends React.Component {
    shouldComponentUpdate() {
        return !this.props.comp
    }
    render() {
        return (
            <Text style={{ fontSize: 42 }}>{this.props.min}:{this.props.sec}</Text>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 'select',
            work: 25,
            break:5,
            min: '00',
            resetprev: '00',
            sec: '00',
            isOn: false,
            completed: false,
            isReady:false,
            red: '#FF1403',
            blue: '#1770CC',
            green: '#00B24A',
            orange: '#FF620A',
            yellow: '#FFD60A'
        } 
    }

    

    componentDidMount() {
        //we check when component is ready to start an interval every second
        this.interval = setInterval(this.dec, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    dec = () => {
        if (this.state.isOn && !this.state.completed) {
            console.log("Start counter")
            if (this.state.sec > 0) {
                this.setState(prevState => ({
                    sec: String(parseInt(prevState.sec) - 1)
                }))
                if (parseInt(this.state.sec) < 10) {
                    this.setState({
                        sec: '0' + String(this.state.sec)

                    })
                }
            }
            else {
                this.setState(prevState => ({
                    min: String(parseInt(prevState.min) - 1), sec:'59'
                }))
                if (parseInt(this.state.min) < 10){
                    this.setState({
                        min: '0' + String(this.state.min)
                    })
                }
            }
            if (parseInt(this.state.min) == '00' && parseInt(this.state.sec) == '00') {
                this.setState({ completed: true })
                this.setState({ ison: false })
                vibrate()
                this.setState({ isReady : false })
            }
        }
    }

    _start = () => {
        if (this.state.isReady) {
            this.setState({ isOn: true })
            console.log("_START PRESSED")
        }
    }

    _pause = () => {
        this.setState({ isOn:false })
    }
    _handleWorkTimer = () => {
        this.setState({ min: this.state.work })
        this.setState({ sec: this.state.resetprev })
        this.setState({ counter: this.state.work })
        this.setState({ isReady: true })
    }

    _handleBreakTimer = () => {
        this.setState({ min: this.state.break })
        this.setState({ sec: this.state.resetprev })
        this.setState({ counter: this.state.break })
        this.setState({ isReady: true })
    }
    _reset = () => {
        this.setState(prevState => ({ min: prevState.resetprev, sec: '00' }))
        this.setState({ isOn: false })
        this.setState({ completed: false })
        this.setState({ isReady: false })
        this.setState({ counter: 'select'})
    }
  render() {
    return (
        <View style={styles.container}>
            <Count min={this.state.min} sec={this.state.sec} comp={this.state.completed} />

            <Text>Welcome to Pomodoro Timer</Text>
            <Text>{this.state.counter} minutes</Text>
            <View style={styles.RowButton2}>
                <View style={styles.RowButtonView}>
                    <Button color={this.state.orange} title="Work" onPress={this._handleWorkTimer} />
                </View>
                <View style={styles.RowButtonView}>
                    <Button color={this.state.yellow} title="Break" onPress={this._handleBreakTimer} />
                </View>
              
            </View>
            <View style={styles.RowButton}>
                <View style={styles.RowButtonView}>
                <Button color={this.state.red} title="Pause" onPress={this._pause} />
                </View>
                <View style={styles.RowButtonView}>
                    <Button color={this.state.blue} title="Start" onPress={this._start} />
                </View>
                <View style={styles.RowButtonView}>
                    <Button color={this.state.green} title="Reset" onPress={this._reset} />
                </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    RowButtonView: {
        flex: 1,
        padding: 9,
    },
    RowButton2: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '60%',
        padding:5,
        
    },
    RowButton: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
