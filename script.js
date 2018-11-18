window.onload = function() {
    // all of your code goes in here
    // it runs after the DOM is built
    var gross_salary, net_salary, income_tax, usc, prsi, tax_payable, srcop, standard_rate, marginal_rate, tax_credits;

    gross_salary = 0;
    net_salary = 0;
    income_tax = 0;
    usc = 0;
    ee_prsi = 0;
    prsi = 0;
    tax_payable = 0;
    srcop = 35300;
    standard_rate = .2;
    marginal_rate = .4;
    tax_credits = 0;
    document.getElementById("salary-input").addEventListener("input", calcNetPay);
    document.addEventListener("keypress", calcNetPay);

    function calcNetPay() {
        gross_salary = document.getElementById("salary-input").value;
        income_tax = calcTax(gross_salary);
        prsi = calcPRSI(gross_salary);
        usc = calcUSC(gross_salary);
        tax_credits = Math.min(income_tax,3300);
        net_salary = Math.ceil(gross_salary - income_tax - usc - prsi + tax_credits);
        console.log(net_salary);

        if (gross_salary > 0){
            document.getElementById('yearly-net').textContent = Math.ceil(net_salary).toLocaleString();
            document.getElementById('monthly-net').textContent = Math.ceil(net_salary/12).toLocaleString();
            document.getElementById('weekly-net').textContent = Math.ceil(net_salary/52).toLocaleString();
            document.getElementById('effective-tax-rate').textContent = Math.floor((1 - net_salary/gross_salary) * 100) + "%";
            document.getElementById('it-total').textContent = Math.ceil(income_tax).toLocaleString();
            document.getElementById('itcreds-total').textContent = "(" + Math.ceil(tax_credits).toLocaleString() + ")";
            document.getElementById('usc-total').textContent = Math.ceil(usc).toLocaleString();
            document.getElementById('prsi-total').textContent = Math.ceil(prsi).toLocaleString();

      }
    }



    function calcTax(gross_salary) {
        if (gross_salary >= srcop) {
          income_tax = ((srcop * standard_rate) + (gross_salary - srcop) * marginal_rate);
        } else {
          income_tax = ((gross_salary * standard_rate));
        };
        if (gross_salary < 18000) {
          income_tax = 0;
        }
        return income_tax;
    };

    function calcUSC(gross_salary) {
        if (gross_salary > 13000) {
            usc = (12012 * .005) + ((gross_salary - 12012) * .02)
          };
        if (gross_salary > 19874) {
            usc = (12012 * .005) + (7862 * .02) + ((gross_salary - 19874) *.045)
          };
        if (gross_salary > 70044) {
            usc = (12012 * .005) + (7862 * .02) + (50170 *.045) + ((gross_salary - 70044) *.08)
        };
        if (gross_salary < 13000) {
          usc = 0;
        };
        return usc;
    };

    function calcPRSI(gross_salary) {
      if (gross_salary/52 > 352) {
        prsi = gross_salary *.04
      } else {
        prsi = 0;
      }
      return prsi;
    };


};
