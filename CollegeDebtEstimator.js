// --- global variables ---

var loans = [
  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 

// --- function: ready ---
$(document).ready(function(){
//function ready() {
  
  // pre-fill defaults for first loan year
 
  var defaultYear = loans[0].loan_year;
   $("#loan_year0" + 1).val(defaultYear); //changed to jquery (getelementById and value = defaultYear)
  var defaultLoanAmount = loans[0].loan_amount; 
   $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2)); //changed to jquery (getelementById and value = defaultLoanAmout)
  var defaultInterestRate = loans[0].loan_int_rate;
  $("#loan_int0" + 1).val(defaultInterestRate); //changed to jquery (getelementById and value = defaultInterestRate)
  var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
   $("#loan_bal0" + 1).innerHTML = toComma(loanWithInterest.toFixed(2));//changed to jquery (getelementById)
  
  // pre-fill defaults for other loan years
  for(var i=2; i<6; i++) {
    $("#loan_year0" + i).val(defaultYear++); //changed to jquery (getelementById and value = defaultYear++)
     $("#loan_year0" + i).disabled = true; //changed to jquery (getelementById)
     $("#loan_year0" + i).css("background-color", "lightgray");//changed to jquery (getelementById and style.background-color = gray)
     $("#loan_year0" + i).css("color", "gray");//changed to jquery (getelementById style.color = gray)
     $("#loan_amt0" + i).val(defaultLoanAmount.toFixed(2));//changed to jquery (getelementById and value = defaultYear++)
     $("#loan_int0" + i).val(defaultInterestRate);//changed to jquery (getelementById and value = defaultInterestRate)
     $("#loan_int0" + i).disabled = true;//changed to jquery (getelementById)
     $("#loan_int0" + i).css("background-color", "lightgray"); //changed to jquery (getelementById and style.background-color = gray)
     $("#loan_int0" + i).css("color", "gray");//changed to jquery (getelementById style.color = gray)
   loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
    $("#loan_bal0" + i).innerHTML = toComma(loanWithInterest.toFixed(2));//changed to jquery (getelementById)
    } // end: "for" loop
  
  // all input fields: select contents on fucus
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
  });
  
  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    updateLoansArray();
      });
   // set focus to first interest rate: messes up codepen
  //Reload interest rate
  $("#loan_int01").blur( function() {
    updateLoansArrayy();  
 });
//} // end: function ready()
  });
function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//});
}

function updateLoansArray() {
  validate($("#loan_year01").val());
  loans[0].loan_year = parseInt($("#loan_year01").val());
  for(var i=1; i<5; i++) {
    loans[i].loan_year = loans[0].loan_year + i;
    $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
  }
  localStorage.setItem("loans" , JSON.stringify(loans));
  $("#button").click();
   
}
// UpdateLoansArray for changing interest rate
function updateLoansArrayy() {
  validate($("#loan_int01").val());
    loans[0].loan_int_rate = parseInt($("#loan_int01").val());
   for(var i=1; i<5; i++) {
  loans[i].loan_int_rate = loans[0].loan_int_rate;
    $("#loan_int0" + (i+1) ).val(loans[i].loan_int_rate);
   }
   localStorage.setItem("loans" , JSON.stringify(loans));
  $("#button").click();
}
//end of UpdateLoansArrayy
function validate(value){
    //allows only numbers as input
  $(".form-control").css("color", "gray");
var reg = /^[0-9.]+$/;
//change color of text to alert user of an invalid input
if(reg.test(value) == false){
  $(".form-control").css("color", "red");
  alert("Please enter in a number.");
}}

function saveLoan(){
	//save a new JSON object for the current loans array to localstorage, but dont overide the primary loans object 
	var str = JSON.stringify(loans);
	localStorage.setItem("savedLoans", str);
	}
function lastSaved(){
	//retrieve the JSON object for the saved loans object
	loans = JSON.parse(localStorage.getItem("savedLoans"));
	//update the forms
 window.location.href = "https://juliarg12.github.io/assignment06.html"; 
	}
