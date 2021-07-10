(function(){
  angular.module("LoanRepaymentApp", [])
  .controller('RepaymentController', RepaymentController)
  .service('LoanRepaymentService', LoanRepaymentService);

  RepaymentController.$inject = ['LoanRepaymentService'];
  function RepaymentController(LoanRepaymentService) { 
    var repayment = this;
    repayment.amount = 0;
    repayment.duration = 0; 
    repayment.income = 0;
    repayment.selectedName = "";

    repayment.monthlyPayment = 0;

    repayment.banks = LoanRepaymentService.getBanks();
   
    repayment.calculateRepayment = function(bank, amount, duration) {
      console.log(bank+" "+amount+" "+duration);
      repayment.monthlyPayment = LoanRepaymentService.calculateLoanRepayment(bank, amount, duration);
     
    }
  }

  function LoanRepaymentService() {
    var service = this;

    var banks = [
        { 
          name : "Commonwealth Bank", rate : 2.29, value : "cba"
        },
        {
          name : "National Australian Bank", rate : 9.2, value : "nba"
        },
        {
          name : "Westpac Bank", rate : 12.2, value : "wb"
        },
        {
          name : "Macquarie Bank", rate : 10.4, value : "mb"
        },
        {
           name : "Suncorp Bank", rate : 11.4, value : "sb"
        }
    ];

    service.getBanks = function() {
      return banks;
    };

    service.calculateLoanRepayment = function (bank, amount, duration) {
      for(var i = 0; i < banks.length; ++i) {
        if(banks[i].name === bank) {
         //  [P x R x (1+R)^N]/[(1+R)^N-1]
          var monthlyRate = banks[i].rate / 1200;

          var result =  amount * monthlyRate * Math.pow((1+monthlyRate), (duration * 12)) / (Math.pow((1+monthlyRate), (duration * 12)) - 1);
          
          return Math.round(result * 100) / 100;
        }
      }   
    };
  }

})();