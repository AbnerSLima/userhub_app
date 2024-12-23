import React, { useEffect, useState } from 'react';
import colors from '@/constants/colors';
import { Link, useRouter, } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

interface Usuario {
  user_id: number;
  nome: string;
  login: string;
  data_cadastro: string;
}  

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();
  const [data, setData] = useState([]);
  
  const filteredUsers = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      usuario.login.toLowerCase().includes(searchText.toLowerCase())
  );  

  const fetchUsers = async () => {
    setLoading(true);
      try {
        const response = await fetch(`http://savir11.tecnologia.ws/userhub/read_app.php`);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsuarios(data);
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Erro", "Não foi possível carregar os usuários.");
      } finally {
        setLoading(false);
      }
  };

    const fetchUserById = async (id: number) => {
      try {
        const response = await fetch(`http://savir11.tecnologia.ws/userhub/read_user.php?id=${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar o usuário: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const clearFilter = () => {
    setSearchText("");
    fetchUsers();
  };

  
  const deleteUser = async (id: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: async () => {
    try {
      const response = await fetch(`http://savir11.tecnologia.ws/userhub/delete_app.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ user_id: id }),
      });
      if (!response.ok) {
        throw new Error(`Erro ao deletar: ${response.status}`);
      }
      const result = await response.json();
      Alert.alert("Sucesso", result.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  }
}
  ]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    router.push("/create");
  };

  const handleProfile = (id: number) => {
    router.push(`/profile?userId=${id}`);
  };
  
  const handleEditar = (id: number) => async () => {
    router.push(`/edit?userId=${id}`);
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.button]}>
              <View style={[styles.logo2]}>  
                <Image
                  source={require('@/assets/images/logo2.png')}
                  style={styles.userLogo}
                />
              </View>
              <View style={[styles.logo3]}>
                <View style={styles.linkUser}>
                  <Text>Bem-vindo!</Text>
                  <Link href="/" asChild>
                    <Pressable onPress={() => { router.push('/'); }}>
                      <Text style={styles.linkLogoff}>Sair</Text>
                    </Pressable>
                  </Link>
                </View>
                <View style={styles.buttonCenter}>
                  <Pressable style={[styles.button, styles.creatButton]} onPress={handleCreate}>
                    <Text style={styles.buttonText}>Novo Usuário</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Digite o nome ou login"
                placeholderTextColor="gray"
                style={styles.input}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              <TouchableOpacity style={styles.searchClean} onPress={clearFilter}>
                <Text style={styles.searchCleanText}>Limpar filtro</Text>
              </TouchableOpacity>
            </View>
          </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
          <View style={styles.form}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell, styles.idColumn]}>ID</Text>
              <Text style={[styles.tableCell, styles.headerCell, styles.nameColumn]}>Nome</Text>
              <Text style={[styles.tableCell, styles.headerCell, styles.loginColumn]}>Login</Text>
              <Text style={[styles.tableCell, styles.headerCell, styles.actionColumn]}>Ações</Text>
            </View>
        
            {filteredUsers.map((usuario) => (
              <View key={usuario.user_id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.idColumn]}>{usuario.user_id}</Text>
                <Text style={[styles.tableCell, styles.nameColumn]}>{usuario.nome}</Text>
                <Text style={[styles.tableCell, styles.loginColumn]}>{usuario.login}</Text>
                <View style={[styles.tableCell, styles.actionColumn]}>
                  <TouchableOpacity
                    style={[styles.button, styles.viewButton]}
                    onPress={() => handleProfile(usuario.user_id)}
                  >
                    <Text style={styles.buttonText}>Visualizar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={handleEditar(usuario.user_id)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteUser(usuario.user_id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.zinc,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor:'#49688d',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#fff',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D3D3D',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
  },
  userLogo: {
    height: 100,
    width: 150,
  },
  creatButton: {
    backgroundColor: colors.azul,
    padding: 8,
    paddingStart: 16,
    paddingEnd: 16,
  },
  viewButton: {
    backgroundColor: colors.verde,
  },
  editButton: {
    backgroundColor: colors.amarelo,
  },
  deleteButton: {
    backgroundColor: colors.vermelho,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  buttonCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    marginHorizontal: 2,
    margin: 8,
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButton: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  linkUser: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  linkLogoff: {
    color: '#F44336',
  },
  searchClean: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginLeft: 10,
  },
  searchCleanText: {
    color: '#F44336',
    marginLeft: 5,
  },
  idColumn: {
    flex: 0.5,
  },
  nameColumn: {
    flex: 2,
  },
  loginColumn: {
    flex: 2,
  },
  actionColumn: {
    flex: 2,
  },
  logo2: {
    height: 100,
    width: 200,
    justifyContent:'flex-end',
  },
  logo3: {
    flex: 2,
    justifyContent: 'center',
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
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
})