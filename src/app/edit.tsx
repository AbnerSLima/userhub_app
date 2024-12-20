import { useEffect, useState } from 'react';
import colors from '../../constants/Colors';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image, Alert } from 'react-native';
import { router, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Usuario {
  user_id: number;
  nome: string;
  login: string;
  senha: string;
  created_at: string;
}

export default function Edit() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');


  const fetchUserData = async (id: string) => {
      //console.log("ID passado para fetchUserData:", id);
      try {
        setLoading(true);
        const response = await fetch(`http://savir11.tecnologia.ws/userhub/read_user.php?id=${id}`);
        if (!response.ok) throw new Error('Erro ao buscar os dados do usuário');
        
        const data: Usuario = await response.json();
        setNome(data.nome);
      setUsuario(data.login);
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      setLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    if (!nome || !usuario || !senha) {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      setCarregando(true);
      const response = await fetch('http://savir11.tecnologia.ws/userhub/update_app.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          nome,
          login: usuario,
          senha,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        router.back();
      } else {
        Alert.alert('Erro', data.error || 'Erro ao atualizar usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUserData(userId as string);
  }, [userId]);


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
              Editar usuário
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
            <Pressable style={styles.button} onPress={handleUpdate} disabled={carregando}>
              <Text style={styles.buttonText}>{carregando ? 'Alterando...' : 'Alterar'}</Text>
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
      backgroundColor: '#d9c877',
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
    backgroundColor: '#888',
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