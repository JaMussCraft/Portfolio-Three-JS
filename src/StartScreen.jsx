import './StartScreen.css'

export default function StartScreen({ onStart }) {

  return (
    <div className="start-screen">
      <button className="start-button" onClick={onStart}>
        Start
      </button>
    </div>
  )
}
