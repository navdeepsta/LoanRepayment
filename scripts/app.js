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
                var amount = repayment.amount;
               var duration = repayment.duration;
               var interest = repayment.interest;
               repayment.monthlyPayment = LoanRepaymentService.calculateLoanRepayment(amount, duration, interest);
               repayment.payment = repayment.monthlyPayment;
               var monthlyPayment = repayment.monthlyPayment;
               repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepayment(duration, monthlyPayment);
                var totalLoanPayment = repayment.totalLoanPayment;
                repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPayment(amount, totalLoanPayment);
               break;
        case "FortNightly":
               repayment.monthlyPaymentColor = "white";
               repayment.fortNightlyPaymentColor = "orange";
               repayment.weeklyPaymentColor = "white";
               repayment.repaymentType = "FortNightly";
               var monthlyPayment = repayment.monthlyPayment;
                var amount = repayment.amount;
               var duration = repayment.duration;
               var interest = repayment.interest;
      
               repayment.fortNightlyPayment = LoanRepaymentService.calculateFortNightlyPayment(amount, duration, interest);
               repayment.payment = repayment.fortNightlyPayment;
               var fortNightlyPayment = repayment.fortNightlyPayment;
               repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepaymentFortNightly(duration, fortNightlyPayment);
               var totalLoanPaymentFortNightly = repayment.totalLoanPayment;
                repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPayment(amount, totalLoanPaymentFortNightly);
               break;
        case "Weekly":
               repayment.monthlyPaymentColor = "white";
               repayment.fortNightlyPaymentColor = "white";
               repayment.weeklyPaymentColor = "orange";
               repayment.repaymentType = "Weekly";
               var monthlyPayment = repayment.monthlyPayment;
                var amount = repayment.amount;
               var duration = repayment.duration;
               var interest = repayment.interest;
               repayment.weeklyPayment = LoanRepaymentService.calculateWeeklyPayment(amount, duration, interest);
               repayment.payment = repayment.weeklyPayment;
               var weeklyPayment = repayment.weeklyPayment;
               repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepaymentWeekly(duration, weeklyPayment);
               var totalLoanPaymentWeekly = repayment.totalLoanPayment;
               repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPaymentWeekly(amount, totalLoanPaymentWeekly);
               break;

      }
    }
 
    repayment.calculateRepayment = function() {
      var amount = repayment.amount;
      var duration = repayment.duration;
      var interest = repayment.interest;
      
      repayment.monthlyPayment = LoanRepaymentService.calculateLoanRepayment(amount, duration, interest);
       repayment.fortNightlyPayment = LoanRepaymentService.calculateFortNightlyPayment(amount, duration, interest);
        repayment.weeklyPayment = LoanRepaymentService.calculateWeeklyPayment(amount, duration, interest);
      console.log("Repayment type "+repayment.repaymentType);
      
       //console.log(amount, duration, interest, monthlyPayment);
       switch(repayment.repaymentType) {
          case "Monthly":
                repayment.payment = repayment.monthlyPayment;
                var monthlyPayment = repayment.monthlyPayment;
                repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepayment(duration, monthlyPayment);
                console.log("Monthly "+repayment.totalLoanPayment);
                var totalLoanPayment = repayment.totalLoanPayment;
                repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPayment(amount, totalLoanPayment);

                break;

          case "FortNightly":
                console.log("FortNightly blaa");
                 repayment.payment = repayment.fortNightlyPayment;
                var fortNightlyPayment = repayment.fortNightlyPayment;
                repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepaymentFortNightly(duration, fortNightlyPayment);
                console.log("Fortnihtly "+repayment.totalLoanPayment);
                var totalLoanPaymentFortNightly = repayment.totalLoanPayment;
                repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPayment(amount, totalLoanPaymentFortNightly);
                break;

           case "Weekly":
                  console.log("Weekly blaa");
                  repayment.payment = repayment.weeklyPayment;
                 var weeklyPayment = repayment.weeklyPayment;
                  repayment.totalLoanPayment = LoanRepaymentService.calculateTotalLoanRepaymentWeekly(duration, weeklyPayment);
                 console.log("Weekly "+repayment.totalLoanPayment);
                  var totalLoanPaymentWeekly = repayment.totalLoanPayment;
                repayment.totalInterestCharged = LoanRepaymentService.calculateTotalInterestPaymentWeekly(amount, totalLoanPaymentWeekly);
                break;
         }

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

    service.calculateTotalLoanRepaymentFortNightly = function(duration, fortNightlyPayment) {
          console.log("duration "+duration+" fortNightlyPayment "+fortNightlyPayment);
          var result =  (duration * 26 * fortNightlyPayment);
          return service.toTwoDecimal(result);

    };
  
    service.calculateTotalLoanRepaymentWeekly = function(duration, weeklyPayment) {
          var result = (duration * 52 * weeklyPayment);
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

    service.calculateTotalInterestPaymentFortnightly = function(amount, totalLoanPaymentFortNightly) {
          var result =  totalLoanPaymentFortNightly - amount;
           return service.toTwoDecimal(result);
    };

    service.calculateTotalInterestPaymentWeekly = function(amount, totalLoanPaymentWeekly) {
          var result =  totalLoanPaymentWeekly - amount;
           return service.toTwoDecimal(result);
    };
   
    service.calculateFortNightlyPayment = function(amount, duration, interest) {
         var monthlyRate = interest / 2600;

          var result =  amount * monthlyRate * Math.pow((1+monthlyRate), (duration * 26)) / (Math.pow((1+monthlyRate), (duration * 26)) - 1);
          return service.toTwoDecimal(result);
    };
   
     service.calculateWeeklyPayment = function(amount, duration, interest) {
          var monthlyRate = interest / 5200;

          var result =  amount * monthlyRate * Math.pow((1+monthlyRate), (duration * 52)) / (Math.pow((1+monthlyRate), (duration * 52)) - 1);
          return service.toTwoDecimal(result);
    };
   
    service.toTwoDecimal = function(result) {
      return Math.round(result * 100) / 100;
    };
  }

})();