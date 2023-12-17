function Albums() {

  function getAlbums() {
    fetch('http://localhost:3001/albums')
  }

  return (
    <div>
      <button type="button" onClick={getAlbums}>test albums</button>
    </div>
  )
}
export default Albums