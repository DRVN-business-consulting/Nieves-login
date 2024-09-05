import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, Alert, Switch, TextInput, TouchableOpacity} from 'react-native';

export default function App() {
  const hardcodedUsername = 'jirehnieves';
  const hardcodedPassword = 'jirehPSA2024!';

  //for username
  const [text, setText] = React.useState('');
  const minLength = 6;
  const maxLength = 20;
  const [charCount, setCharCount] = React.useState(0);
//for password
  const passwordRequirements = {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!passwordRequirements.hasUppercase.test(pass)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!passwordRequirements.hasLowercase.test(pass)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!passwordRequirements.hasNumber.test(pass)) {
      return 'Password must include at least one number.';
    }
    if (!passwordRequirements.hasSpecialCharacter.test(pass)) {
      return 'Password must include at least one special character.';
    }
    return ''; 
  };
    
//for theme

const [isDarkTheme, setIsDarkTheme] = React.useState()
const toggleTheme = () => {
  setIsDarkTheme((prevTheme) => !prevTheme);
};
  const emoji = isDarkTheme ? '🙈' : '🙉';
  const placeholderColor = isDarkTheme ? 'white' : 'gray';

  //character counter
  useEffect(() => {
    setCharCount(text.length);
  },[text]);

  const handleChangeText = (newText) => {
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setIsValid(!validationMessage);
  };

  const handleSubmit = () => {
    if (text.trim().length < minLength) {
      Alert.alert(`Username must be at least ${minLength} characters long.`);
      return;
    }
    if (text.trim() !== hardcodedUsername) {
      Alert.alert('Username is incorrect.');
      return;
    }
    if (password !== hardcodedPassword) {
      Alert.alert('Password is incorrect.');
      return;
    }
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      Alert.alert(validationMessage);
      return;
    }
    Alert.alert('Input accepted.');
  };
  


  return (
    <ScrollView style={[styles.scrollView,(isDarkTheme ? styles.darkMode : styles.lightMode)]}>
    <View style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
      <Text style={[isDarkTheme && styles.darkText]}>Mobile Development using React Native Training 2024</Text>
      <View style={styles.container2}>
      <Text style={[styles.title, isDarkTheme && styles.darkText]}>Login</Text>
      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        onChangeText={handleChangeText}
        value={text}
        placeholder="Enter Username"
        placeholderTextColor={placeholderColor}
      />
      <Text style={[isDarkTheme && styles.darkText]}>Character Count: {charCount}</Text>
      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        onChangeText={handleChangePassword}
        value={password}
        placeholder="Enter Password"
        placeholderTextColor={placeholderColor}
      />
      <TouchableOpacity
        style={[styles.button, isDarkTheme && styles.darkButton]}
        onPress={handleSubmit}>
      <Text style={{fontSize: 20}}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.emojiButton, isDarkTheme && styles.darkEmojiButton]}
          onPress={toggleTheme}
        >
          <Text style={[styles.emojiText, isDarkTheme && styles.darkEmojiText]}>
            {emoji}
          </Text>
        </TouchableOpacity>

        </View>
    </View>
    </ScrollView>
  )};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    width:'100%',
    padding: 10
  },
  container: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  container2:{
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width:'100%'
  },
  title:{
    fontSize: 30
  },
  button:{
    backgroundColor:'lightblue',
    borderRadius: 10,
    width: '50%',
    padding: 5,
    alignItems:'center',
    marginTop:10
  },
  darkMode:{
    color: 'white',
    backgroundColor:'black'
  },
  input:{
    fontSize:16,
          borderBottomWidth: 1,
          padding: 5,
          width: '50%'
  },
  darkInput: {
    borderBottomColor: 'white',
    color: 'white'
  },
  darkText:{
    color:'white'
  },
  lightMode:{
    backgroundColor: 'white'
  },
  emojiText:{
    fontSize: 50
  }
})