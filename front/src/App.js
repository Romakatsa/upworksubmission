import React, { useEffect, useState } from 'react'
import './App.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

function App() {

  const [voteGroups, setVoteGroups] = useState(null)

  useEffect(() => {
    async function loadVotes() {
      try {
        const response = await fetch(serverUrl + "/votes")
        const votesData = await response.json()
        setVoteGroups(groupVotesByImageId(votesData))
      } catch(e) {
        console.error("An Error occured: ", e);
      }
    }

    loadVotes()
  }, [])

  function groupVotesByImageId(votes) {
    const map = new Map()
    votes.forEach(vote => {
      const group = map.get(vote.image_id)
      if (!group) {
        map.set(vote.image_id, [vote])
      } else {
        group.push(votes)
      }
    })
    return map
  }

  return (
    <div className="App">
      <div className="TableRow">
          <div className="TableRowCell">Image Id</div>
          <div className="TableRowCell">Total Votes</div>
      </div>
      
      {voteGroups && Array.from(voteGroups).map(group => (
        <div className="TableRow" key={group[0]}>
          <div className="TableRowCell">{group[0]}</div>
          <div className="TableRowCell">{group[1].length}</div>
        </div>
      ))}

      {!voteGroups && "Loading"}
    </div>
  );
}

export default App;
