/** Componente para o perfil do usuário
 */
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../../context/auth-context";
import { iClient } from "../../../domain/model/interfaces/iClient";
import { iFreight } from "../../../domain/model/interfaces/iFreight";
import { FreightHttp } from "../../../domain/services/api/freight-http";
import { Utils } from "../../../domain/services/function/utils";
import { appCss } from "../../../styles/app.css";
import { FreightHistory } from "./profile-freight-history";
import { ProfileSettings } from "./profile-settings";

export const Profile = () => {
  const client: iClient = useAuthContext().client;
  console.log(client);

  const [freights, setFreights] = useState([] as iFreight[]);

  const phoneNumber = Utils.formatPhoneNumber(client.phoneNumber);
  const birthdate = Utils.formatDate(client.birthdate);
  const name = client.name;

  useEffect(() => {
    FreightHttp.getFreights()
      .then(setFreights);
  }, []);

  return (
    <SafeAreaView style={appCss.container}>
      <View style={styles.card}>
        <View style={styles.settings}>
          <ProfileSettings />
        </View>
        <View>
          <Image style={styles.img} source={require("../../../assets/perfil.jpeg")} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={[styles.card, styles.infoCard]}>
        <View style={styles.info}>
          <Text style={appCss.infoText}>Número de Telefone</Text>
          <Text>{phoneNumber}</Text>
        </View>
        <View style={styles.info}>
          <Text style={appCss.infoText}>Data de nascimento</Text>
          <Text>{birthdate}</Text>
        </View>
      </View>
      <View style={[styles.card, styles.lastFreightsCard]}>
        <Text style={appCss.title}>Fretes recentes</Text>
        <FreightHistory freightList={freights} />
        <TouchableOpacity>
          <Text style={styles.lastFreightsButton}>Ver mais antigos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    marginBottom: 5,
    backgroundColor: "white",
    width: "95%",
    elevation: 3,
    padding: 5,
  },
  settings: {
    alignSelf: "flex-start",
  },
  infoCard: {
    flexGrow: 0,
    justifyContent: "space-around",
  },
  info: {
    marginBottom: 5,
    padding: 5,
  },
  lastFreightsCard: {
    flexGrow: 5,
    justifyContent: "space-around",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    alignSelf: "center",
  },
  lastFreightsButton: {
    fontSize: 15,
    opacity: 0.5,
    alignSelf: "center",
  },
});
