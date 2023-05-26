class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
      this._accountNumber = accountNumber;
      this._accountHolder = accountHolder;
      this._balance = balance;
    }
  
    getAccountNumber() {
      return this._accountNumber;
    }
  
    getAccountHolder() {
      return this._accountHolder;
    }
  
    getBalance() {
      return this._balance;
    }
  
    deposit(amount) {
      this._balance += amount;
    }
  
    withdraw(amount) {
      if (amount <= this._balance) {
        this._balance -= amount;
      } else {
        console.log('Insufficient balance!');
      }
    }
  }
  
  class SavingsAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, interestRate) {
      super(accountNumber, accountHolder, balance);
      this._interestRate = interestRate;
    }
  
    calculateInterest() {
      return this._balance * (this._interestRate / 100);
    }
  }
  
  class CheckingAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, overdraftLimit) {
      super(accountNumber, accountHolder, balance);
      this._overdraftLimit = overdraftLimit;
    }
  
    withdraw(amount) {
      if (amount <= this._balance + this._overdraftLimit) {
        this._balance -= amount;
      } else {
        console.log('Exceeded overdraft limit!');
      }
    }
  }
  
  const accountList = document.getElementById('account-list');
  
  // Create instances of each account type
  const accounts = [];
  
  function createAccount(
    accountType,
    accountNumber,
    accountHolder,
    accountBalance,
    savingsInterestRate,
    checkingOverdraftLimit
  ) {
    let account;
  
    if (accountType === 'savings') {
      account = new SavingsAccount(
        accountNumber,
        accountHolder,
        accountBalance,
        savingsInterestRate
      );
    } else if (accountType === 'checking') {
      account = new CheckingAccount(
        accountNumber,
        accountHolder,
        accountBalance,
        checkingOverdraftLimit
      );
    }
  
    accounts.push(account);
    displayAccountInformation(account);
  }
  
  // Function to display account information
  function displayAccountInformation(account) {
    const accountElement = document.createElement('div');
    accountElement.classList.add('account');
  
    const accountHeader = document.createElement('h2');
    accountHeader.textContent = account instanceof SavingsAccount ? 'Savings Account' : 'Checking Account';
    accountElement.appendChild(accountHeader);
  
    const accountInfo1 = document.createElement('div');
    accountInfo1.classList.add('info');
    accountInfo1.innerHTML = `<span>Account Number:</span> <span>${account.getAccountNumber()}</span>`;
    accountElement.appendChild(accountInfo1);
  
    const accountInfo2 = document.createElement('div');
    accountInfo2.classList.add('info');
    accountInfo2.innerHTML = `<span>Account Holder:</span> <span>${account.getAccountHolder()}</span>`;
    accountElement.appendChild(accountInfo2);
  
    const accountInfo3 = document.createElement('div');
    accountInfo3.classList.add('info');
    accountInfo3.innerHTML = `<span>Balance:</span> <span>${account.getBalance()}</span>`;
    accountElement.appendChild(accountInfo3);
  
    const accountActions = document.createElement('div');
    accountActions.classList.add('actions');
    if (account instanceof SavingsAccount) {
      const calculateInterestBtn = document.createElement('button');
      calculateInterestBtn.textContent = 'Calculate Interest';
      calculateInterestBtn.addEventListener('click', () => {
        const interestAmount = account.calculateInterest();
        alert(`Interest amount: ${interestAmount}`);
      });
      accountActions.appendChild(calculateInterestBtn);
    }
    const depositBtn = document.createElement('button');
    depositBtn.textContent = 'Deposit';
    depositBtn.addEventListener('click', () => {
      const amount = parseFloat(prompt('Enter the amount to deposit:'));
      if (!isNaN(amount) && amount > 0) {
        account.deposit(amount);
        accountInfo3.innerHTML = `<span>Balance:</span> <span>${account.getBalance()}</span>`;
      } else {
        alert('Invalid amount!');
      }
    });
    accountActions.appendChild(depositBtn);
    const withdrawBtn = document.createElement('button');
    withdrawBtn.textContent = 'Withdraw';
    withdrawBtn.addEventListener('click', () => {
      const amount = parseFloat(prompt('Enter the amount to withdraw:'));
      if (!isNaN(amount) && amount > 0) {
        account.withdraw(amount);
        accountInfo3.innerHTML = `<span>Balance:</span> <span>${account.getBalance()}</span>`;
      } else {
        alert('Invalid amount!');
      }
    });
    accountActions.appendChild(withdrawBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Account';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      const index = accounts.indexOf(account);
      if (index !== -1) {
        accounts.splice(index, 1);
        accountElement.remove();
      }
    });
    accountActions.appendChild(deleteBtn);
    accountElement.appendChild(accountActions);
  
    accountList.appendChild(accountElement);
  }
  
  // Form submission handler
  const accountForm = document.getElementById('account-form');
  accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const accountType = document.getElementById('account-type').value;
    const accountNumber = document.getElementById('account-number').value;
    const accountHolder = document.getElementById('account-holder').value;
    const accountBalance = parseFloat(document.getElementById('account-balance').value);
  
    if (accountType === 'savings') {
      const interestRate = parseFloat(document.getElementById('savings-interest-rate').value);
      createAccount(accountType, accountNumber, accountHolder, accountBalance, interestRate);
    } else if (accountType === 'checking') {
      const overdraftLimit = parseFloat(document.getElementById('checking-overdraft-limit').value);
      createAccount(accountType, accountNumber, accountHolder, accountBalance, null, overdraftLimit);
    }
  
    // Reset form
    accountForm.reset();
  });
  
  // Display existing account information
  accounts.forEach((account) => {
    displayAccountInformation(account);
  });
  