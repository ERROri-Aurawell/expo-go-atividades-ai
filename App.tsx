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

//AsyncStorage.clear()

type objects = {
  id: number,
  nome: string,
  status: boolean
}

export default function App() {
  const [itens, setItens] = useState<objects[]>([])
  const [item, setItem] = useState<string>("")

  const salv = async (lista: objects[]) => {
    const envio = JSON.stringify(lista);
    await AsyncStorage.setItem('@lista', envio);
  }

  async function adicionarItem(algumaCoisa: string) {
    if (algumaCoisa.trim().length <= 0) {
      return
    }
    setItens((prev) => {
      const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const novoItem: objects = { id: newId, nome: algumaCoisa, status: false };
      const novaLista = [...prev, novoItem];
      void salv(novaLista);
      return novaLista;
    })
  }

  useEffect(() => {
    const r2 = async () => {
      const data: string | null = await AsyncStorage.getItem('@lista')
      if (data != null) {
        const lista = JSON.parse(data)
        setItens(lista)
      }
    }
    r2()
  }, [])

  async function remover(idParaRemover: number) {
    setItens((prev) => {
      const novaLista = prev.filter(item => item.id !== idParaRemover);
      void salv(novaLista);
      return novaLista;
    });
  }

  async function editar(id: number, novoNome: string){
    if (novoNome.trim().length <= 0) {
      return
    }
    setItens((prev) => {
      const novaLista = prev.map(item =>
        item.id === id ? { ...item, nome: novoNome } : item
      );
      void salv(novaLista);
      return novaLista;
    })
  }

  async function marcar(id: number, novoStatus: boolean) {
    setItens((prev) => {
      const novaLista = prev.map(item =>
        item.id === id ? { ...item, status: novoStatus } : item
      );
      void salv(novaLista);
      return novaLista;
    })
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.viewTopo} >
        <Text style={styles.h1} >Lista de compras</Text>
      </View>
      <View style={styles.viewDosInputs} >
        <View style={styles.viewDoInput}>
          <TextInput style={styles.placeholder} placeholder="Digite o produto:" placeholderTextColor={"#00e5ffff"} value={item} onChangeText={(novo) => {
            setItem(novo);
          }} />
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => {
            setItem("")
            adicionarItem(item);
          }}
        >
          <View>
            <Text style={styles.botao}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.componentes} >
        {itens.map((item: objects) => {
          return (
            <View key={item.id}>
              <Itens objeto={item} marcar={marcar} remover={remover} editar={editar} />
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
  viewDosInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  viewDoInput: {
    width: "75%",
    height: 60,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAdicionar: {
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
