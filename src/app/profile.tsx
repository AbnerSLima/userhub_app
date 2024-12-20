import React, { useEffect, useState } from 'react';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Button, Pressable, ScrollView, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Usuario {
  user_id: number;
  nome: string;
  login: string;
  created_at: string;
}

export default function Profile() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async (id: string) => {
    console.log("ID passado para fetchUserData:", id); // Log para verificar o ID
    try {
      setLoading(true);  // Garantir que o carregamento começa
      const response = await fetch(`http://savir11.tecnologia.ws/userhub/read_user.php?id=${id}`);
      if (!response.ok) {
        console.error('Erro na resposta da API', response);  // Log de erro de resposta
        throw new Error('Erro ao buscar os dados do usuário');
      }
      const data = await response.json();
      console.log('Dados recebidos da API:', data); // Log para verificar os dados retornados
      if (data) {
        setUserData(data);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error); // Log do erro
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    } finally {
      setLoading(false);  // Garantir que o carregamento termina
    }
  };

  useEffect(() => {
    console.log('ID dentro do useEffect:', userId); // Log para verificar o ID no useEffect
    if (userId) {
      fetchUserData(userId as string); // Chama a função de busca de dados
    }
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
              Dados do usuário
            </Text>
          </View>

          <View style={styles.form}>
            {loading ? (
              <Text>Carregando...</Text>
            ) : (
              <View>
                {userData ? (
                <View>
                  <Text>ID: {userData.user_id}</Text>
                  <Text>Nome: {userData.nome}</Text>
                  <Text>Login: {userData.login}</Text>
                  <Text>Criado em: {new Date(userData.created_at).toLocaleDateString()}</Text>
                  <Button title="Editar" onPress={() => router.push(`/profile?userId=${userId}`)} />
                  </View>
              ) : (
                <Text>Usuário não encontrado</Text>
              )}
              </View>
            )}
            
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