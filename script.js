let myExpenses = [];
let partnerExpenses = [];
let myTotalExpenses = 0;
let partnerTotalExpenses = 0;

function calculatePercentage() {
  const myName = document.getElementById('myName').value;
  const partnerName = document.getElementById('partnerName').value;
  const myIncome = parseFloat(document.getElementById('myIncome').value);
  const partnerIncome = parseFloat(document.getElementById('partnerIncome').value);

  if (myName.trim() !== '' && partnerName.trim() !== '' && !isNaN(myIncome) && !isNaN(partnerIncome)) {
    const totalIncome = myIncome + partnerIncome;
    const myPercentage = (myIncome / totalIncome) * 100;
    const partnerPercentage = (partnerIncome / totalIncome) * 100;

    document.getElementById('percentage').innerText = `Pourcentage de revenu de ${myName} : ${myPercentage.toFixed(2)}%, Pourcentage de ${partnerName} : ${partnerPercentage.toFixed(2)}%`;

    // Afficher la section des dépenses
    document.getElementById('expenses-section').style.display = 'block';

    // Mettre à jour les options du drop-down avec les prénoms entrés
    updateDropdownOptions(myName, partnerName);
  } else {
    alert('Oups! Il nous manque des informations dans la section Revenus.');
  }
}

function addExpense() {
  const expenseLabel = document.getElementById('expenseLabel').value;
  const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
  const expenseAuthor = document.getElementById('expenseAuthor').value;

  if (isNaN(expenseAmount) || expenseAmount <= 0 || expenseLabel.trim() === '') {
    alert('Oups! Il semblerait que les informations entrées ne soient pas valides.');
    return;
  }

  const expense = {
    label: expenseLabel,
    amount: expenseAmount,
    author: expenseAuthor
  };

  if (expenseAuthor === 'my') {
    myExpenses.push(expense);
    myTotalExpenses += expenseAmount;
  } else if (expenseAuthor === 'partner') {
    partnerExpenses.push(expense);
    partnerTotalExpenses += expenseAmount;
  }

  updateExpenseList();

  document.getElementById('expenseLabel').value = '';
  document.getElementById('expenseAmount').value = '';

  // Mettre à jour le solde à chaque ajout de dépense
  calculateTotal();
}

function updateExpenseList() {
  const expenseList = myExpenses.concat(partnerExpenses);
  const expenseListElement = document.getElementById('expenseList');

  expenseListElement.innerHTML = '';

  expenseList.forEach(expense => {
      const listItem = document.createElement('li');
      const authorName = expense.author === 'my' ? document.getElementById('myName').value : document.getElementById('partnerName').value;
      listItem.innerText = `${expense.label}: ${expense.amount.toFixed(2)} (Auteur: ${authorName})`;
      expenseListElement.appendChild(listItem);
  });
}

function calculateTotal() {
  let totalExpenses = myTotalExpenses + partnerTotalExpenses;

  document.getElementById('totalExpenses').innerText = `Total des Dépenses du Foyer : ${totalExpenses.toFixed(2)}`;

  const myIncome = parseFloat(document.getElementById('myIncome').value);
  const partnerIncome = parseFloat(document.getElementById('partnerIncome').value);
  const totalIncome = myIncome + partnerIncome;

  const myBalance = (totalExpenses * (myIncome / totalIncome)) - myTotalExpenses;
  const partnerBalance = (totalExpenses * (partnerIncome / totalIncome)) - partnerTotalExpenses;

  document.getElementById('balance').innerText = `Solde - ${document.getElementById('myName').value}: ${myBalance.toFixed(2)}, ${document.getElementById('partnerName').value}: ${partnerBalance.toFixed(2)}`;
}

// Fonction pour mettre à jour les options du drop-down avec les prénoms entrés
function updateDropdownOptions(myName, partnerName) {
  const expenseAuthorDropdown = document.getElementById('expenseAuthor');

  // Vérifier si l'option existe déjà avant de l'ajouter
  if (!Array.from(expenseAuthorDropdown.options).some(option => option.value === 'my')) {
    const myOption = document.createElement('option');
    myOption.value = 'my';
    myOption.text = myName;
    expenseAuthorDropdown.add(myOption);
  }

  if (!Array.from(expenseAuthorDropdown.options).some(option => option.value === 'partner')) {
    const partnerOption = document.createElement('option');
    partnerOption.value = 'partner';
    partnerOption.text = partnerName;
    expenseAuthorDropdown.add(partnerOption);
  }
}
