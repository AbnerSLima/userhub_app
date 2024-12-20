import React, { useEffect, useState } from 'react';
import colors from '../../constants/Colors';
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
    try {
      setLoading(true);
      const response = await fetch(`http://savir11.tecnologia.ws/userhub/read_user.php?id=${id}`);
      if (!response.ok) {
        console.error('Erro na resposta da API', response);
        throw new Error('Erro ao buscar os dados do usuário');
      }
      const data = await response.json();
      if (data) {
        setUserData(data);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId as string);
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
                  <View style={styles.containerInfo}>
                    <Text style={styles.textInfoTitle}>ID:</Text>
                    <Text style={styles.texrInfoDesc}> {userData.user_id}</Text>
                  </View>
                  <View style={styles.containerInfo}>
                    <Text style={styles.textInfoTitle}>Nome:</Text>
                    <Text style={styles.texrInfoDesc}> {userData.nome}</Text>
                  </View>
                  <View style={styles.containerInfo}>
                    <Text style={styles.textInfoTitle}>Login:</Text>
                    <Text style={styles.texrInfoDesc}> {userData.login}</Text>
                  </View>
                  <View style={styles.containerInfo}>
                    <Text style={styles.textInfoTitle}>Criado em:</Text>
                    <Text style={styles.texrInfoDesc}> {new Date(userData.created_at).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.buttonCenter}>
                    <Pressable style={styles.button} onPress={() => router.push(`/edit?userId=${userId}`)} >
                      <Text style={styles.buttonText}>Editar</Text>
                    </Pressable>
                  </View>
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
    paddingTop: 20,
  },
  button: {
    backgroundColor: colors.amarelo,
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
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  textInfoTitle: {
    fontSize: 20,
    fontWeight: 400,
  },
  texrInfoDesc: {
    fontSize: 14,
  }
});