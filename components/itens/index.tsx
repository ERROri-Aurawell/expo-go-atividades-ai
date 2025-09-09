import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

type props = {
    objeto:{
        id: number,
        nome: string,
        status: boolean
    }
    marcar: (entrada: number, novo: boolean) => void;
}

export default function Itens({ objeto, marcar }: props) {
    const [on, setOn] = useState<boolean>()

    useEffect(() => {
        setOn(objeto.status)
    }, [objeto])
    const styles = createStyles(on);
    return (
        <View style={styles.view} >
            <TouchableOpacity style={styles.opacidade} onPress={() => {
                setOn((prev) => {
                    const novo = !prev
                    console.log("Mudar status: " + novo)
                    marcar(objeto.id, novo)
                    return novo
                })
            }} >
                <Text style={styles.completo} >{on ? "✔" : "X"}</Text>
            </TouchableOpacity>
            <Text style={styles.texto} >{objeto.nome}</Text>
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
    texto:{
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    }
})
