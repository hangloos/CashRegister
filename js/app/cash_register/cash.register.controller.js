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
        var register = JSON.parse(localStorage.register);
       //update counts and values based on entry in the que
       if (this.registerQue[0]) { 
              if (register.twenty.count >= this.registerQue[0])  {
                register.twenty.count -= this.registerQue[0]
                register.twenty.value -= (this.registerQue[0] * 20)
              } else  {
                alert("You don't have enough twenties")
              }
        }

        if (this.registerQue[1])  {
            if (register.ten.count >= this.registerQue[1])  {
                  register.ten.count -= this.registerQue[1]
                  register.ten.value -= (this.registerQue[1] * 10)
            } else {
                alert("You don't have enough tens")
              }
        }

        if (this.registerQue[2])  {
            if (register.five.count >= this.registerQue[2]) {
                  register.five.count -= this.registerQue[2]
                  register.five.value -= (this.registerQue[2] * 5)              
                } else  {
                    alert("You don't have enough fives")
                }
        }

        if (this.registerQue[3])  {
            if (register.two.count >= this.registerQue[3])  {
                register.two.count -= this.registerQue[3]
                register.two.value -= (this.registerQue[3] * 2)              
              } else  {
                    alert("You don't have enough twos")
              }
        }


        if (this.registerQue[4])  {
            if (register.one.count >= this.registerQue[4])  {
                register.one.count -= this.registerQue[4]
                register.one.value -= (this.registerQue[4] * 1)
            } else  {
                alert("You don't have enough ones")
            }
        }
 
    //update storage with new register after removal
    localStorage.setItem('register',JSON.stringify(register))
    // this que will always have the specific number in the right index. 
    vm.registerQue = [0,0,0,0,0];
    vm.total = getTotal();
  } 
  }

  function change(amount) {
    var bills = []
    var register = JSON.parse(localStorage.register);
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

          for(var j = 0; j < bills.length; j++) {
            if (correctChange)  {
              break
            }
              else if(bills[j] === amount) {
              amount -= bills[j]
              checkBill(bills[j], vm.registerQue);
              correctChange = true
              break
            }

            //bills are set descending. Send lesser bills to a function to add to the que until bill === amount.
            if (bills[j] < amount && (amount - bills[j] > 0)) {
              // testing amount and que for each attempt
               var test_amount = amount
               var test_que = [0,0,0,0,0]
                test_amount -= bills[j]
                checkBill(bills[j], test_que)
                // found a lesser number, start an attemp to reach 0
              for (var i = 0; i < bills.length; i++)  {
                if (bills[i] === test_amount && i != j)  {
                  checkBill(bills[i], test_que)
                  correctChange = true
                  break
                } else if (bills[i] < test_amount && (test_amount - bills[i] > 0) && i != j)  {
                  test_amount -= bills[i]
                  checkBill(bills[i], test_que)
                }
              }
            } 
          } 

          //check boolean
        if (correctChange)  {
          if (test_que) {
          vm.registerQue = test_que
          }
          vm.remove();
        } else {
          alert("You don't have correct change")
        }

    }

    function checkBill(bill, que)  {
      //based no bill value, set in correct place in que
        if (bill === 20)  {
          que[0] += 1
        } 
        if (bill === 10)  {
          que[1] += 1
        }

        if (bill === 5) {
          que[2] += 1
        }

        if (bill === 2) {
          que[3] += 1
        }

        if (bill ===1)  {
          que[4] += 1
        }
    } 



}