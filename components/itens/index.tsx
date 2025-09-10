import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"

type props = {
    objeto: {
        id: number,
        nome: string,
        status: boolean
    }
    marcar: (entrada: number, novo: boolean) => void;
    remover: (id: number) => void;
    editar: (id: number, novoNome: string) => void;
}

export default function Itens({ objeto, marcar, remover, editar }: props) {
    const styles = createStyles(objeto.status);
    const [menu, setMenu] = useState<boolean>(false);
    const [editarNome, setEditar] = useState<boolean>(false);
    const [nome, setNome] = useState<string>(objeto.nome);


    return (
        <View style={styles.view} >
            <TouchableOpacity style={styles.opacidade} onPress={() => {
                const novoStatus = !objeto.status;
                marcar(objeto.id, novoStatus)
            }} >
                <Text style={styles.completo} >{objeto.status ? "✔" : "X"}</Text>
            </TouchableOpacity>
            <Text style={styles.texto} >{objeto.nome}</Text>
            <TouchableOpacity
                style={styles.touchableOpcoes}
                onPress={() => {
                    //remover(objeto.id);
                    setMenu(!menu);
                }}
            >
                <Text style={styles.pontoPontoPonto}>...</Text>
            </TouchableOpacity>

            {menu &&
                <View style={styles.menu} >
                    <TouchableOpacity style={styles.editar} onPress={() => {
                        setEditar(!editarNome);
                        //editar(objeto.id, nome);
                    }} >
                        <Text>Editar</Text>
                    </TouchableOpacity>

                    {editarNome &&
                        <View style={styles.viewDoInput} >
                            <TextInput style={styles.placeholder} placeholder="Digite o produto:" placeholderTextColor={"#00e5ffff"} value={nome} onChangeText={(novo) => {
                                setNome(novo);
                            }} />
                            <TouchableOpacity style={styles.clicar} onPress={() => {
                                editar(objeto.id, nome);
                                setEditar(!editarNome);
                            }}
                            >
                                <Text>{">"}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <TouchableOpacity style={styles.deletar} onPress={() => {
                        remover(objeto.id);
                    }}>
                        <Text>Remover</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const createStyles = (ativo: boolean | undefined) => StyleSheet.create({
    completo: {
        color: ativo ? "white" : "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    view: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        gap: 10,
        borderBottomColor: "#00e5ffff",
        borderBottomWidth: 5,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,

    },
    opacidade: {
        backgroundColor: ativo ? "green" : "red",
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        gap: 10
    },
    texto: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    touchableOpcoes: {
        backgroundColor: "#000",
        borderRadius: 100,
        width: 30,
        height: 40,
        borderWidth: 2,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",

    },
    pontoPontoPonto: {
        color: "#FFF",
        fontSize: 23,
        fontWeight: "bold",
        lineHeight: 23,
        includeFontPadding: false,
        textAlignVertical: "center",
        transform: [{ rotate: '90deg' }],
        paddingBottom: 15
    },
    menu: {
        backgroundColor: "#00e5ffff",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 5,
    },
    editar: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        alignItems: "center"
    },
    deletar: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        alignItems: "center"
    },
    placeholder: {
        backgroundColor: "#4a4a4aff",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 100,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        minWidth: 100
    },
    clicar: {
        backgroundColor: "#ffffffff",
        width: 30,
        height: 30,
        borderRadius: 100,
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },
    viewDoInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    }
})
