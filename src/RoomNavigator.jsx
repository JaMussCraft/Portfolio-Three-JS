import './RoomNavigator.css'

export default function RoomNavigator({ currentRoom, unlockRoom, onSwitchRoom }) {
  const rooms = [0, 1, 2, 3] // Room IDs

  return (
    <div className="room-icons">
      <button className="arrow-icon left" onClick={() => currentRoom > 0 && onSwitchRoom(-1)}>
        &lt;
      </button>
      {rooms.map((roomId) => (
        <div
          key={roomId}
          className={`room-icon ${roomId <= unlockRoom ? 'unlocked' : 'locked'} ${
            roomId === currentRoom ? 'active' : ''
          }`}
          onClick={() => roomId <= unlockRoom && onSwitchRoom(0, roomId)}
        >
          {roomId + 1}
        </div>
      ))}
      <button
        className="arrow-icon right"
        onClick={() => currentRoom < unlockRoom && onSwitchRoom(1)}
      >
        &gt;
      </button>
    </div>
  )
}
