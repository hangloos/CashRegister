angular
    .module('cashRegister', ['ui.router'])

    .config(function  ($stateProvider, $urlRouterProvider)  {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'js/app/cash_register/home.html',
          controller: 'CashRegisterController as vm'
        })
        .state('add', {
          url: '/add',
          templateUrl: 'js/app/cash_register/add.html',
          controller: 'CashRegisterController as vm'
        })
        .state('remove', {
          url: '/remove',
          templateUrl: 'js/app/cash_register/remove.html',
          controller: 'CashRegisterController as vm'
        })
        $urlRouterProvider.otherwise('home')
    })
