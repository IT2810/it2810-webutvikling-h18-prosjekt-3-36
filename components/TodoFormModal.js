import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpAlert: true
    }
  }

  addNewTodo = () => {
    // Kjør addNewTodo metoden til TodoScreen så alt av todo states blir gjort av den.
    if (this.state.helpAlert && this.state.date === undefined) {
      // Om brukern ikke har valgt en dato burde det komme en liten varsling om at den ikke kan bli sett i kalendern.
      Alert.alert('No date chosen',
        'You have not chosen a date and will therefore not be able to view your todo in Calender mode, swipe right to view your todos without date.',
        [
          { text: 'Never remind me again', onPress: () => this.setState({helpAlert: false}) },
          { text: 'OK'},
        ],
        { cancelable: false })
    }
    this.props.addNewTodo(this.state.text, this.state.date);
    this.props.toggleModal();
    this.clearForm();
  }

  clearForm = () => {
    this.setState({ text: undefined });
    this.setState({ date: undefined });
  }

  render() {
  return (
    <Modal isVisible={this.props.isModalVisible}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.buttonContainer}>
          <View style={styles.button} ><Button title="Cancel" onPress={this.props.toggleModal} color="red" style={styles.button}></Button></View>
          <View style={styles.button} ><Button title="Submit" onPress={this.addNewTodo} color="green" style={styles.button}></Button></View>
        </View>
        <TextInput
          editable={true}
          multiline
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Write something..."
          placeholderTextColor="grey"
          style={styles.textInput}
          underlineColorAndroid='rgba(0,0,0,0)'
          onSubmitEditing={this.addNewTodo}
          autoFocus={true}></TextInput>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
        />
        <Text>Add a date for your todo (optional)</Text>
      </View>
    </Modal>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: '45%',
  },
  textInput: {
    fontSize: 18,
  }
});
