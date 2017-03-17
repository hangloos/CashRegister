angular
    .module('cashRegister')
    .controller('CashRegisterController', CashRegisterController)


function CashRegisterController() {
  var vm = this;
  vm.test = 1;
  //functions
  vm.add = add;
  vm.getTotal = getTotal;
  //make change
  vm.change = change;
  //remove
  vm.remove = remove;

  vm.registerQue = [0,0,0,0,0];
  vm.total = getTotal();


  function getTotal() {
    var total = 0
    var register = JSON.parse(localStorage.register || '[]')
    if (register.twenty)  {
    total += register.twenty.value
    total += register.ten.value
    total += register.five.value
    total += register.two.value
    total += register.one.value
    }

    return total
  }

//$scope.fav = JSON.parse(localStorage["fav"] || '[]');
  function add()  {
    if (localStorage.register === undefined)  {
      //set storage for register
      localStorage.setItem('register',JSON.stringify({twenty: {count: 0, value: 0},
      ten: {count: 0, value: 0}, five: {count: 0, value: 0}, 
      two: {count: 0, value: 0}, one: {count: 0, value: 0}
      }))
    }
    //parse register to access object. add counts and values based on entry.
    var register = JSON.parse(localStorage.register || '[]');
    if (this.registerQue[0])  {
      register.twenty.count += this.registerQue[0]
      register.twenty.value += (this.registerQue[0] * 20)
    }

    if (this.registerQue[1])  {
      register.ten.count += this.registerQue[1]
      register.ten.value += (this.registerQue[1] * 10)
    }

    if (this.registerQue[2])  {
      register.five.count += this.registerQue[2]
      register.five.value += (this.registerQue[2] * 5)
    }

    if (this.registerQue[3])  {
      register.two.count += this.registerQue[3]
      register.two.value += (this.registerQue[3] * 2)
    }

    if (this.registerQue[4])  {
      register.one.count += this.registerQue[4]
      register.one.value += (this.registerQue[4] * 1)
    }
    //update register in storage
    localStorage.setItem('register',JSON.stringify(register))
    vm.registerQue = [0,0,0,0,0];
    vm.total = getTotal();
  }

  function remove() {

      //set register if you have one, otherwise you can't remove
     if (localStorage.register === undefined)   {
      alert("Your register is currently empty")
      } else {
      var register = JSON.parse(localStorage.register || '[]');

      //update counts and values based on entry in the que
      if (this.registerQue[0] && register.twenty.count > 0)  {
        register.twenty.count -= this.registerQue[0]
        register.twenty.value -= (this.registerQue[0] * 20)
      } else if (this.registerQue[1] && register.ten.count > 0)  {
        register.ten.count -= this.registerQue[1]
        register.ten.value -= (this.registerQue[1] * 10)
      } else if (this.registerQue[2] && register.five.count > 0)  {
        register.five.count -= this.registerQue[2]
        register.five.value -= (this.registerQue[2] * 5)
      } else if (this.registerQue[3] && register.two.count > 0)  {
        register.two.count -= this.registerQue[3]
        register.two.value -= (this.registerQue[3] * 2)
      } else if (this.registerQue[4] && register.one.count > 0)  {
        register.one.count -= this.registerQue[4]
        register.one.value -= (this.registerQue[4] * 1)
      } else {
            alert("You don't have this amount of this bill")
      }
    //update storage with new register after removal
    localStorage.setItem('register',JSON.stringify(register))
    vm.registerQue = [0,0,0,0,0];
    vm.total = getTotal();
  }

  }

  function change(amount) {
    var bills = []
    var register = JSON.parse(localStorage.register || '[]');
      //push all current bills into array
      if (register.twenty.count > 0)  {
        for(var i = 0; i < register.twenty.count;i++) {
          bills.push(20)
        }
      }

      if (register.ten.count > 0)  {
        for(var i = 0; i < register.ten.count;i++) {
          bills.push(10)
        }
      }

      if (register.five.count > 0)  {
        for(var i = 0; i < register.five.count;i++) {
          bills.push(5)
        }
      }

      if (register.two.count > 0)  {
        for(var i = 0; i < register.two.count;i++) {
          bills.push(2)
        }
      }

      if (register.one.count > 0)  {
        for(var i = 0; i < register.one.count;i++) {
          bills.push(1)
        }
      }
        //boolean variable if you have correct change or not
        var correctChange = false

          bills.forEach(function(bill,index)  {
            if (bill === amount) {
              amount -= bill
              checkBill(bill);
              correctChange = true
            } 
            //bills are set descending. Send lesser bills to a function to add to the que until bill === amount.
            if (bill < amount && (amount - bill > 0)) {
              amount -= bill
              checkBill(bill);
            } 
          }) 

          //check boolean
        if (correctChange)  {
          vm.remove();
        } else {
          alert("You don't have correct change")
        }

    }

    function checkBill(bill)  {
      //based no bill value, set in correct place in que
        if (bill === 20)  {
          vm.registerQue[0] += 1
        } 
        if (bill === 10)  {
          vm.registerQue[1] += 1
        }

        if (bill === 5) {
          vm.registerQue[2] += 1
        }

        if (bill === 2) {
          vm.registerQue[3] += 1
        }

        if (bill ===1)  {
          vm.registerQue[4] += 1
        }
    } 



}