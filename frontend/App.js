import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const handlePress = async () => {
  if (isLogin) {
    if (email === '' || password === '') {
      setMessage('Please fill out all fields.');
      return;
    }
    setMessage('Login successful');
  } else {
    if (email === '' || password === '' || firstName === '' || lastName === '') {
      setMessage('Please fill out all fields.');
      return;
    }
    setMessage('Registration successful');
  }
  const url = isLogin ? 'http://192.168.1.128/login' : 'http://192.168.0.8:5000/register';
  const body = isLogin
    ? { username: email, password }
    : { username: email, password }; // Backend only expects username and password for registration


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });


    const result = await response.json();
    if (response.ok) {
      setMessage(isLogin ? 'Login successful' : 'Registration successful');
      if (isLogin && result.token) {
        // You can save the token for future authenticated requests
        console.log('JWT Token:', result.token);
      }
    } else {
      setMessage(result.message || 'Something went wrong.');
    }
  } catch (error) {
    setMessage('Error connecting to the server.');
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
