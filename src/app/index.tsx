import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  function handleSignIn(){
    router.push('/home');
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
            <Pressable style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Acessar</Text>
            </Pressable>

            <Link href='/signup' style={styles.link}>
              <Text>Ainda não possui uma conta? Cadastre-se</Text>
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
    color: colors.white,
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
    color: colors.zinc,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
    },
    button: {
    backgroundColor: colors.green,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    },
    buttonText: {
    color: colors.white,
    fontWeight: 'bold'
    },
    link: {
    marginTop: 16,
    textAlign: 'center',
  },
  userLogo1: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});