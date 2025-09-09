import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image, StyleSheet, TouchableOpacity, useColorScheme, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Socket } from 'socket.io-client';

import Itens from "./components/itens"

// salvar
//await AsyncStorage.setItem('@token', '12345');
// ler
//const token = await AsyncStorage.getItem('@token');
// remover
//await AsyncStorage.removeItem('@token');

//TODO mudar a sintaxe para:
//[ {id: number, nome: string, status: boolean}, ... ]

//AsyncStorage.clear()

type objects = {
  id: number,
  nome: string,
  status: boolean
}

export default function App() {
  const [itens, setItens] = useState<objects[]>([])
  const [item, setItem] = useState<string>("")

  async function salvarSappora(algumaCoisa: string) {
    if (algumaCoisa.trim().length <= 0) {
      return
    }
    setItens((prev) => {
      const retorno: objects[] = [...prev, { id: prev.length + 1, nome: algumaCoisa, status: false }]
      void salv(prev, retorno);
      return retorno
    })
  }

  const salv = async (prev: objects[], entrada: objects[]) => {
    const lista: objects[] = [...prev, ...entrada]
    const envio = JSON.stringify(lista);
    await AsyncStorage.setItem('@lista', envio);
  }

  useEffect(() => {
    const r2 = async () => {
      const data: string | null = await AsyncStorage.getItem('@lista')
      if (data != null) {
        console.log(data)
        const lista = JSON.parse(data)
        console.log(lista)
        setItens(lista)
      }
    }
    r2()
  }, [])

  async function remover(index: number) {
    setItens((prev) => {
      const removido = prev.splice(index, 1);
      salv(prev, removido);
      return prev
    })
  }

  async function marcar(index: number, novo: boolean) {
    console.log("Mudar o status do item:", index, "para o valor:", novo)
    setItens((prev) => {
      prev[index - 1].status = novo;
      r(prev)
      return prev
    })

    const r = async (prev: objects[]) => {
      const envio = JSON.stringify(prev);
      await AsyncStorage.setItem('@lista', envio);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.viewTopo} >
        <Text style={styles.h1} >Lista de compras</Text>
      </View>
      <View style={styles.viewDosImput} >
        <View style={styles.viewDoImput}>
          <TextInput style={styles.placeholder} placeholder="Digite o produto:" placeholderTextColor={"#00e5ffff"} value={item} onChangeText={(novo) => {
            setItem(novo);
          }} />
        </View>

        <TouchableOpacity
          style={styles.touchableOcaralho}
          onPress={() => {
            setItem("")
            salvarSappora(item);
          }}
        >
          <View>
            <Text style={styles.botao} >+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.componentes} >
        {itens.map((item: objects) => {
          return (
            <View key={item.id}>
              <Itens objeto={item} marcar={marcar} />
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,

    flexDirection: "column",
    backgroundColor: '#383838ff',
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: "#000",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  botao: {
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    color: "white",
    fontSize: 20,
    width: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  h1: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  viewTopo: {
    width: "100%",
    backgroundColor: "#00e5ffff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDosImput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  viewDoImput: {
    width: "75%",
    height: 60,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  touchableOcaralho: {
    backgroundColor: "black",
    width: "15%",
    height: 60,
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10
  },
  componentes: {
    padding: 20,
    borderWidth: 2,
    borderColor: "00e5ffff",
    borderRadius: 40,
  }

});
