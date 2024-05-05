import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";

function ChtBot() {
  const [nutritionData, setNutritionData] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [userInput, setUserInput] = useState('');  // State to store the user's input

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

  // Adjust theme for dark mode if needed
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
          headers: { "X-Api-Key": "DMKtEmwxdv4j9/e04ErTyQ==Fm88Trke8pC5OVB6" }
        }
      );
      if (response.status === 200 && response.data.length > 0) {
        setExerciseList(response.data);
      } else {
        setExerciseList([]);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setExerciseList([]);
    }
  };
  
  // Function to fetch nutrition data based on query
  const fetchNutritionData = async (query) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          headers: { "X-Api-Key": "DMKtEmwxdv4j9/e04ErTyQ==Fm88Trke8pC5OVB6" }
        }
      );
      if (response.status === 200 && response.data.length > 0) {
        setNutritionData(response.data[0]);
      } else {
        setNutritionData(null);
      }
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating={true}
        headerTitle="Fitness Tracker Chat"
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
            message: "Hi {previousValue}, nice to meet you! What do you want me to do?",
            trigger: "4",
          },
          {
            id: "4",
            options: [
              { value: 1, label: "Workout related", trigger: "5" },
              { value: 2, label: "Nutritional related", trigger: "10" },
              { value: 3, label: "Exit", trigger: "end" },
            ],
          },
          {
            id: "5",
            message: "Sure, I can help with that. Which muscle are you interested in?",
            trigger: "6",
          },
          {
            id: "6",
            user: true,
            validator: (input) => {
              setUserInput(input);  // Store user input to use in API call
              return true;
            },
            trigger: "7",
          },
          {
            id: "7",
            message: "Fetching exercises for {previousValue}...",
            trigger: "8",
          },
          {
            id: "8",
            component: <ExerciseComponent exercises={exerciseList} />,
            asMessage: true,
            trigger: "end",
          },
          {
            id: "10",
            message: "What food are you curious about?",
            trigger: "11",
          },
          {
            id: "11",
            user: true,
            validator: (input) => {
              setUserInput(input);  // Store user input to use in API call
              return true;
            },
            trigger: "12",
          },
          {
            id: "12",
            message: "Fetching nutrition data for {previousValue}...",
            trigger: "13",
          },
          {
            id: "13",
            component: <NutritionComponent nutrition={nutritionData} />,
            asMessage: true,
            trigger: "end",
          },
          {
            id: "end",
            message: "Thank you for using the chatbot!",
            end: true,
          },
        ]}
      />
    </ThemeProvider>
  );
}

const ExerciseComponent = ({ exercises }) => (
  <div>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            Instructions: {exercise.instructions}
          </li>
        ))}
      </ul>
  </div>
);

const NutritionComponent = ({ nutrition }) => (
  <div>
    {nutrition ? (
      <ul>
        <li>Calories: {nutrition.calories}</li>
        <li>Protein: {nutrition.protein_g}</li>
        <li>Fat Total: {nutrition.fat_total_g}</li>
        <li>Fat Saturated: {nutrition.fat_saturated_g}</li>
        <li>Carbohydrates: {nutrition.carbohydrates_total_g}</li>
      </ul>
    ) : (
      <p>No nutrition data available.</p>
    )}
  </div>
);

export default ChtBot;