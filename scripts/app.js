(function(){
  angular.module("LoanRepaymentApp", [])
  .controller('RepaymentController', RepaymentController)
  .service('LoanRepaymentService', LoanRepaymentService);

  RepaymentController.$inject = ['LoanRepaymentService'];
  function RepaymentController(LoanRepaymentService) { 
    var repayment = this;
    repayment.amount = 300000;
    repayment.duration = 30; 
    repayment.interest = 2.69;
    repayment.monthlyPayment = 1215.21;
    repayment.fortNightlyPayment = 567.09;
    repayment.weeklyPayment = 567.09;
    repayment.payment = repayment.monthlyPayment;

    repayment.totalLoanPayment = 437475.68;
    repayment.totalInterestCharged = 137475.68;
    repayment.repaymentType = "Monthly";
    repayment.monthlyPaymentColor = "orange";
    repayment.fortNightlyPaymentColor = "white";
    repayment.weeklyPaymentColor = "white";

    repayment.setRepaymentType = function(type) {
      switch(type) {
        case "Monthly":
               repayment.monthlyPaymentColor = "orange";
               repayment.fortNightlyPaymentColor = "white";
               repayment.weeklyPaymentColor = "white";
               repayment.repaymentType = "Monthly";
               repayment.payment = repayment.monthlyPayment;
               break;
        case "FortNightly":
               repayment.monthlyPaymentColor = "white";
               repayment.fortNightlyPaymentColor = "orange";
               repayment.weeklyPaymentColor = "white";
               repayment.repaymentType = "FortNightly";
               var monthlyPayment = repayment.monthlyPayment;
               repayment.fortNightlyPayment = LoanRepaymentService.calculateFortNightlyPayment(monthlyPayment);
               repayment.payment = repayment.fortNightlyPayment;
               break;
        case "Weekly":
               repayment.monthlyPaymentColor = "white";
               repayment.fortNightlyPaymentColor = "white";
               repayment.weeklyPaymentColor = "orange";
               repayment.repaymentType = "Weekly";
               var monthlyPayment = repayment.monthlyPayment;
               repayment.weeklyPayment = LoanRepaymentService.calculateWeeklyPayment(monthlyPayment);
               repayment.payment = repayment.weeklyPayment;
               break;

      }
    }
 
    repayment.calculateRepayment = function() {
      var amount = repayment.amount;
      var duration = repayment.duration;
      var interest = repayment.interest;
      
      repayment.monthlyPayment = LoanRepaymentService.calculateLoanRepayment(amount, duration, interest);
      repayment.payment = repayment.monthlyPayment;
      var monthlyPayment = repayment.monthlyPayment;
       //console.log(amount, duration, interest, monthlyPayment);
      repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepayment(duration, monthlyPayment);
      //console.log(repayment.totalLoanPayment);
      var totalLoanPayment = repayment.totalLoanPayment;
       repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPayment(amount, totalLoanPayment);

    }

    
  }

  function LoanRepaymentService() {
    var service = this;

  
    service.calculateLoanRepayment = function (amount, duration, interest) {
      
         //  [P x R x (1+R)^N]/[(1+R)^N-1]
          var monthlyRate = interest / 1200;

          var result =  amount * monthlyRate * Math.pow((1+monthlyRate), (duration * 12)) / (Math.pow((1+monthlyRate), (duration * 12)) - 1);
          
          return service.toTwoDecimal(result);
    };

    service.calculateTotalLoanRepayment = function(duration, monthlyPayment) {
          console.log("duration "+duration+" monthlyPayment "+monthlyPayment);
          var result =  (duration * 12 * monthlyPayment);
          return service.toTwoDecimal(result);
    };

    service.calculateTotalInterestPayment = function(amount, totalLoanPayment) {
          var result =  totalLoanPayment - amount;
           return service.toTwoDecimal(result);
    };
   
    service.calculateFortNightlyPayment = function(monthlyPayment) {
         var result = (monthlyPayment/30)*14;
         console.log(result);
          return service.toTwoDecimal(result);
    };
   
     service.calculateWeeklyPayment = function(monthlyPayment) {
         var result = (monthlyPayment/30)*7;
         console.log(result);
          return service.toTwoDecimal(result);
    };
    service.cal
    service.toTwoDecimal = function(result) {
      return Math.round(result * 100) / 100;
    };
  }

})();