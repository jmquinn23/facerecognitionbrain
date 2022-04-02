import React, {Component} from 'react'; 
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import 'tachyons';
import Particles from "react-tsparticles";

const app = new Clarifai.App({
  apiKey: '4653a888d2ce42fc8e27191b26abe80e'
});

const particlesOptions = {

        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    } 
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})  
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
      )
    .then((response) => {console.log(response.outputs[0].data.regions[0].region_info.bounding_box)})
  
  }

  render(){
    return (
      <div className="App">
      <Particles
        options={particlesOptions}
      />
        <Navigation/>
        <Logo />
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />        
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div> 
      );
    }    
}



export default App;
