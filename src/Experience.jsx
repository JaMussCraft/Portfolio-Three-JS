import { Suspense, useState, Shadow, useRef, useEffect } from 'react'
import { OrbitControls, Text, BakeShadows, SoftShadows, Text3D } from '@react-three/drei'
import CameraController from './CameraController'
import MainModel from './MainModel'
import ContactLogos from './ContactLogos'
import Project from './Project'

const waterSamplerProject = {
  title: 'WATER SAMPLER TEAM PROJECT (MATLAB, ONSHAPE)',
  shortTitle: 'WATER SAMPLER TEAM PROJECT',
  description:
    'In July 2023, I participated in a Water Sampler team project that involved using MATLAB, OnShape, and PrusaSlicer. My contributions included designing and integrating the Control Code and GUI subsystem with other subsystems. I implemented features such as Optical Character Recognition (OCR), spreadsheet output, and live camera integration to enhance functionality. Additionally, I designed and 3D-printed a CAD model for a sample ID holder. To ensure efficient project management, I utilized Gantt charts and maintained a bill of materials. I also tested subsystem performance and conducted peer reviews to improve overall quality. Demo: youtu.be/KjzTHafoKiU',
  imagePath: 'images/water_sampler_image.jpg',
}
const stickmanBadmintonProject = {
  title: '2D Stickman Badminton Game (JavaScript, HTML, and CSS)',
  shortTitle: '2D Stickman Badminton Game',
  description:
    'In June and July 2023, I developed a 2D Stickman Badminton Game using JavaScript, HTML, and CSS. I implemented realistic physics to simulate natural badminton birdie behavior and integrated character movement, animations, and sound effects to enhance the gameplay experience. Additionally, I designed a state machine for an intuitive scoring system. You can explore the demo at stickman-badminton-game.vercel.app.',
  imagePath: 'images/stickman_badminton_image.png',
}
const sentimentAnalysisProject = {
  title: 'AMAZON REVIEWS SENTIMENT ANALYSIS (PANDAS, NUMPY, SEABORN, NLTK)',
  shortTitle: 'Amazon Reviews Sentiment Analysis',
  description:
    'In Fall 2024, I conducted an Amazon Reviews Sentiment Analysis project leveraging tools such as Pandas, NumPy, Seaborn, and NLTK. The project began with visual analysis of the dataset using various plotting libraries to uncover patterns and insights. I then preprocessed a large Amazon reviews dataset through tokenization and text embedding to prepare it for training and evaluation. Multiple machine learning models, including VADER, Roberta, Random Forest, and Decision Tree Classifier, were developed and tested. To enhance performance, I fine-tuned the models, optimizing their accuracy while effectively mitigating overfitting.',
  imagePath: 'images/sentiment_analysis_image.png',
}
const textGenerationProject = {
  title: 'TEXT GENERATION (TENSORFLOW, RMSPROP, LSTM)',
  shortTitle: 'TEXT GENERATION',
  description:
    'In Fall 2024, I designed and implemented LSTM-based models to generate text in the style of Shakespeare and movie reviews. To enhance performance, I optimized the model training process using the RMSprop optimizer, achieving improved speed and stability. This project demonstrated my ability to leverage TensorFlow and advanced machine learning techniques for creative text generation tasks.',
  imagePath: 'images/text_generation_image.png',
}

export default function Experience({ currentRoom, loaded, started, setFade }) {
  return (
    <>
      <CameraController
        currentRoom={currentRoom}
        loaded={loaded}
        started={started}
        setFade={setFade}
      />

      <color args={['grey']} attach='background' />

      {/* <OrbitControls makeDefault /> */}

      <MainModel scale={started ? [1, 1, 1] : [0.1, 0.1, 0.1]} />

      <ContactLogos />

      <Project position={[0.13, 1, 1.2]} rotation={[0, 0, 0]} project={waterSamplerProject} />
      <Project position={[0.13, 1.9, 1.2]} rotation={[0, 0, 0]} project={stickmanBadmintonProject} />
      <Project
        position={[1.2, 1.9, 0.13]}
        rotation={[0, -Math.PI * 0.5, 0]}
        project={sentimentAnalysisProject}
      />
      <Project
        position={[1.2, 1, 0.13]}
        rotation={[0, -Math.PI * 0.5, 0]}
        project={textGenerationProject}
      />

      <pointLight intensity={1000.0} position={[0, 20, 0]} />
    </>
  )
}
