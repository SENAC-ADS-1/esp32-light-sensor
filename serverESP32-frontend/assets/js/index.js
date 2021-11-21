fetch('http://localhost:3000/api/device-history')
  .then(function (response) {
    return response.json();
  })
  .then(data => {
    let table = document.getElementById("tableBody");
    let row, cell;

    for (let i = 0; i < data.length; i++) {
      row = table.insertRow();
      cell = row.insertCell();
      cell.textContent = data[i].id;
      cell = row.insertCell();
      cell.textContent = data[i].name;
      cell = row.insertCell();
      cell.textContent = data[i].status === 1 ? 'Ligado' : 'Desligado';
    }
  })
  .catch(function (err) {
    console.warn('Something went wrong.', err);
  });