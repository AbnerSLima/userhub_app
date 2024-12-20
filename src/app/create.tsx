import { useState } from 'react';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {

  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSignUp(){
    if (!nome || !usuario || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://savir11.tecnologia.ws/userhub/create_app.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          login: usuario,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.message || 'Usuário cadastrado com sucesso!');
        setNome('');
        setUsuario('');
        setSenha('');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
          <View style={styles.header}>

            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.zinc}/>
            </Pressable>

            <View style={[styles.logo2]}>  
              <Image
                source={require('@/assets/images/logo2.png')}
                style={styles.userLogo}
              />
            </View>

            <Text style={styles.slogan}>
              Cadastrar usuário
            </Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome</Text>
              <TextInput
              placeholder='Digite seu nome...'
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

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
            <Pressable style={styles.button} onPress={handleSignUp} disabled={carregando}>
              <Text style={styles.buttonText}>{carregando ? 'Cadastrando...' : 'Cadastrar'}</Text>
            </Pressable>
          </View>

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
    buttonCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#6b8bb2',
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
    backButton: {
      backgroundColor: colors.green,
      alignSelf: 'flex-start',
      padding: 8,
      borderRadius: 25,
      marginBottom: 8,
    },
    logo2: {
      height: 100,
      width: 200,
      justifyContent:'flex-end',
    },
    userLogo: {
      height: 100,
      width: 150,
    },
});