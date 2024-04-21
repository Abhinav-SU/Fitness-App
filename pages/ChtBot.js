import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios"; // Import Axios for making HTTP requests

function ChtBot() {
  const [nutritionData, setNutritionData] = useState(null); // State to store nutrition data
  const publicAddress = window.localStorage.getItem("publicAddress");

  const theme = {
    background: "#f5f8fb",
    headerBgColor: "#4F46E5",
    headerFontColor: "#ffffff",
    headerFontSize: "15px",
    botBubbleColor: "#4F46E5",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  // Check for dark mode theme
  if (window.localStorage.getItem("theme") === "dark") {
    theme.background = "#1d2a3f";
    theme.userBubbleColor = "#162132";
    theme.userFontColor = "#ffffff";
  }

  // Function to fetch exercises based on muscle
  const fetchExercises = async (muscle) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
        {
          headers: { "X-Api-Key": "E7vTFPNSAjbTc4DHiC5w7g==rpT42EcqscwbRri4" }, // Replace 'YOUR_API_KEY' with your actual API key
        }
      );
      if (response.status === 200) {
        setExerciseList(response.data);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  // Function to fetch nutrition data based on query
  const fetchNutritionData = async (query) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          headers: { "X-Api-Key": "E7vTFPNSAjbTc4DHiC5w7g==rpT42EcqscwbRri4" }, // Replace 'YOUR_API_KEY' with your actual API key
        }
      );
      if (response.status === 200) {
        setNutritionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <ChatBot
        floating={true}
        headerTitle='Web3AssetManager Chat'
        steps={[
          {
            id: "1",
            message: "What is your name?",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message:
              "Hi {previousValue}, nice to meet you! What do you want me to do?",
            trigger: "4",
          },
          {
            id: "4",
            options: [
              { value: 1, label: "Workout related", trigger: "5" },
              { value: 2, label: "Nutritional related", trigger: "10" }, // Change trigger to 10 for nutrition
              { value: 5, label: "Exit", trigger: "8" },
            ],
          },
          {
            id: "5",
            message:
              "Sure, I can help with that. Which muscle are you interested in?",
            trigger: "6",
          },
          {
            id: "6",
            user: true,
            trigger: "7",
          },
          {
            id: "7",
            message: "Fetching exercises for {previousValue}...",
            trigger: async () => {
              await fetchExercises(userAnswer); 
              return "8";
            },
          },
          {
            id: "8",
            component: (
              <div>
                <p>Here are some exercises:</p>
                <ul>
                  {exerciseList.map((exercise, index) => (
                    <li key={index}>{exercise.name}</li>
                  ))}
                </ul>
              </div>
            ),
            end: true,
          },
          {
            id: "10", 
            message: "What food are you curious about?",
            trigger: "11",
          },
          {
            id: "11",
            user: true,
            trigger: "12",
          },
          {
            id: "12",
            message: "Fetching nutrition data for {previousValue}...",
            trigger: async (userAnswer) => {
              await fetchNutritionData(userAnswer); 
              return "13";
            },
          },
          {
            id: "13",
            component: (
              <div>
                {nutritionData ? (
                  <div>
                    <p>Nutrition data for {userAnswer}:</p>
                    <ul>
                      <li>Calories: {nutritionData.calories}</li>
                      <li>Protein: {nutritionData.protein_g}</li>
                      <li>Fat Total: {nutritionData.fat_total_g}</li>
                      <li>Fat Saturated: {nutritionData.fat_saturated_g}</li>
                      <li>Carbohydrates: {nutritionData.carbohydrates_total_g}</li>
                    </ul>
                  </div>
                ) : (
                  <p>No nutrition data available.</p>
                )}
              </div>
            ),
            end: true,
          },
        ]}
      />
    </ThemeProvider>


  );
}

export default ChtBot;
