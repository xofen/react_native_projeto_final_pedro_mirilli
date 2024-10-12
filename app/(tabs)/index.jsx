import { Image, Platform, Pressable, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [girafas, setGirafas] = useState([]);
  const [torpedoRomano, setTorpedoRomano] = useState([]);
  const [genteTop, setgenteTop] = useState([]);

  const Detalhes = ({ route, navigation }) => {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setGirafas(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/popular",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setTorpedoRomano(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/person/week?language=en-US",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setgenteTop(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerHeight={530}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/john-wick.jpg")}
          style={styles.mainImage}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <Pressable style={styles.buttone}>
          <ThemedText>Play</ThemedText>
        </Pressable>
        <Pressable style={styles.buttwo}>
          <ThemedText>Details</ThemedText>
        </Pressable>
      </ThemedView>


      <ThemedView style={styles.stepContainer}>

        {/* Gente TOP */}
        <ThemedView style={styles.genteContainer}>
          <ThemedText style={styles.subtitles} type="subtitle">Gente TOP!!</ThemedText>
          <ThemedView style={styles.genteList}>
            {genteTop.map((gentes) => (
              <ThemedView key={gentes.id}>
                <Image
                  style={styles.imageGente}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${gentes.profile_path}`,
                  }}
                />
                <ThemedText style={styles.genteName}>{gentes.name}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Filmes Populares */}
        <ThemedView style={styles.movieContainer}>
          <ThemedText style={styles.subtitles} type="subtitle">Filmes Populares na Gringa</ThemedText>
          <ThemedView style={styles.movieList}>
            {girafas.map((girafa) => (
              <ThemedView key={girafa.id}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${girafa.poster_path}`,
                  }}
                />
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Séries Televisivas Populares */}
        <ThemedView style={styles.movieContainer}>
          <ThemedText style={styles.subtitles} type="subtitle">Séries Borocas Pra Roubar seu Tempo</ThemedText>
          <ThemedView style={styles.movieList}>
            {torpedoRomano.map((torpedo) => (
              <ThemedView key={torpedo.id}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${torpedo.poster_path}`,
                  }}
                />
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
    justifyContent: "center",
  },

  stepContainer: {
    gap: 50,
    marginTop: 10,
  },

  mainImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  buttone: {
    backgroundColor: "#545454",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
  },

  buttwo: {
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },

  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },

  movieList: {
    flexDirection: "row",
    gap: 38,
    overflow: "auto",
  },
  
  genteList: {
    flexDirection: "row",
    gap: 20,
    overflow: "auto",
  },

  genteName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },

  imageGente: {
    width: 200,
    height: 300,
    marginBottom: 8,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "darkred",
    borderWidth: 5,
  },

  genteContainer: {
    gap: 20,
  },

  movieContainer: {
    gap: 20,
  },

  subtitles: {
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 10,
  }
});