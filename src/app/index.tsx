import { useState } from 'react';
import colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router'
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSignIn() {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://savir11.tecnologia.ws/userhub/login_app.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: usuario,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/home');
      } else {
        Alert.alert('Erro', data.error || 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao se conectar ao servidor. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
                          source={require('@/assets/images/logo1.png')}
                          style={styles.userLogo1}
                        />

            <Text style={styles.slogan}>
              Login
            </Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Usuário</Text>
              <TextInput
              placeholder='Digite seu usuário...'
              style={styles.input}
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>

          <View>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder='Digite sua senha...'
              style={styles.input}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <View style={styles.buttonCenter}>
            <Pressable style={styles.button} onPress={handleSignIn} disabled={carregando}>
              <Text style={styles.buttonText}>{carregando ? 'Carregando...' : 'Acessar'}</Text>
            </Pressable>
          </View>

            <Text style={styles.link}>Ainda não possui uma conta?</Text>
            <Link href='/signup' style={styles.link1}>
              <Text>Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 34,
    color: '#49688d',
    marginBottom: 34,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    color: '#49688d',
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: '#49688d',
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 14,
    },
  buttonCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.preto,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    borderRadius: 25,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
  link1: {
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  userLogo1: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});