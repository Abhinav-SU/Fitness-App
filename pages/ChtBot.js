import ChatBot from 'react-simple-chatbot';
import { Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';


function ChtBot() {
  const publicAddress = window.localStorage.getItem('publicAddress')

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#4F46E5',
    headerFontColor: '#ffffff',
    headerFontSize: '15px',
    botBubbleColor: '#4F46E5',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  }; 
  if(window.localStorage.getItem('theme') === "dark"){theme.background= '#1d2a3f';theme.userBubbleColor='#162132';theme.userFontColor='#fffff'}

  return (
    <ThemeProvider theme={theme}>

      <ChatBot
        floating={true}
        headerTitle='Web3AssetManager Chat'
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!, What do you want me to do ?',
            trigger: '4',
          },
          {
            id: '4',
            options: [
              { value: 1, label: 'Workout related', trigger: '5' },
              { value: 2, label: 'Nutritional related', trigger: '6' },
              { value: 5, label: 'Exit', trigger: '8' },
            ],
          }

        ]}
      />
    </ThemeProvider>


  );
}

export default ChtBot;