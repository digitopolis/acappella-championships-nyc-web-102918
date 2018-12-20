document.addEventListener('DOMContentLoaded', function() {

  const groupsURL = `http://localhost:3000/a_cappella_groups/`
  const groupTable = document.getElementById('table-body')
  const tableHeader = document.querySelector('.blue');
  let currentWinner
  let previousWinner
  let allGroups = []

  const fetchGroups = () => {
    fetch(groupsURL)
      .then(response => response.json())
      .then(data => {
        showGroups(data)
        allGroups = data
      })
  }

  const showGroups = (groups) => {
    groupTable.innerHTML = ''
    groups.forEach(group => {
      groupTable.innerHTML += `
        <tr class='table-row'>
          <td>${group.college.name}</td>
          <td>${group.name}</td>
          <td>${group.membership}</td>
          <td>${group.college.division}</td>
          <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
          <td><button data-id='${group.id}'>✘</button></td>
        </tr>
      `
    })
  }

  const crownWinner = (group) => {
    const winnerH2 = document.getElementById('winner')
    winnerH2.innerText = `Winner: ${group.name}`
  }

  const deleteGroup = (group) => {
    fetch((groupsURL + group.id), {
      method: 'DELETE'
    })
    .then(fetchGroups)
  }

  const findGroup = (event) => {
    let foundGroup = allGroups.find(group => {
      return group.id == event.target.dataset.id
    })
    return foundGroup
  }

  groupTable.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      let clickedGroup = findGroup(event)
      let winnerRow = event.target.parentNode.parentNode
      let rows = document.querySelectorAll('.table-row')
      rows.forEach(row => {
        row.style.display = ''
      })
      winnerRow.style.display = 'none'
      crownWinner(clickedGroup)
    } else if (event.target.tagName === 'BUTTON') {
      let clickedGroup = findGroup(event)
      deleteGroup(clickedGroup)
    }
  })

  tableHeader.addEventListener('click', (event) => {
    console.log(event.target);
  })

  fetchGroups()
})
