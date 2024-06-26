
let productValue = null;
let itmValue = null;
let startDateInput = null;
let endDateInput = null;

let selectedXAxis = null;
let selectedYAxis = null;
let selectedChartType = null;
let XRR = null;
let YRR = null;
var inputValues = null;
let clickCount = 0;
var P1Value = null;
var P2Value = null;
var P3Value = null;
var P4Value = null;
var P5Value = null;
var P6Value = null;
var P7Value = null;
var P8Value = null;
var ttProductCodes = [];
document
  .getElementById("start_date")
  .addEventListener("input", async function () {
    startDateInput = document.getElementById("start_date").value;
    console.log("Before awaiting: " + startDateInput);
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("After awaiting: " + startDateInput);
  });
document
  .getElementById("end_date")
  .addEventListener("input", async function () {
    endDateInput = document.getElementById("end_date").value;
    console.log("Before awaiting: " + endDateInput);
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("After awaiting: " + endDateInput);
  });
var itmInput = document.getElementById("itmInput");
var productInput = document.getElementById("productInput");

// Function to store the input values
function storeInputValues1() {
  itmValue = itmInput.value;
  productValue = productInput.value;

  // You can do whatever you want with the values here
  console.log("ITM:", itmValue);
  console.log("Product Code:", productValue);
}

// Add event listeners to listen for changes in input values
itmInput.addEventListener("input", storeInputValues1);
productInput.addEventListener("input", storeInputValues1);

// function to get the product value p1 to p8

var P1Input = document.getElementById("P1");
var P2Input = document.getElementById("P2");
var P3Input = document.getElementById("P3");
var P4Input = document.getElementById("P4");
var P5Input = document.getElementById("P5");
var P6Input = document.getElementById("P6");
var P7Input = document.getElementById("P7");
var P8Input = document.getElementById("P8");

// Function to store the input values
function storeInputValues2() {
  // Get the values of each input
  P1Value = P1Input.value;
  P2Value = P2Input.value;
  P3Value = P3Input.value;
  P4Value = P4Input.value;
  P5Value = P5Input.value;
  P6Value = P6Input.value;
  P7Value = P7Input.value;
  P8Value = P8Input.value;

  ttProductCodes = [
    P1Value,
    P2Value,
    P3Value,
    P4Value,
    P5Value,
    P6Value,
    P7Value,
    P8Value,
  ];
  
}

// Add event listeners to listen for changes in input values
P1Input.addEventListener("input", storeInputValues2);
P2Input.addEventListener("input", storeInputValues2);
P3Input.addEventListener("input", storeInputValues2);
P4Input.addEventListener("input", storeInputValues2);
P5Input.addEventListener("input", storeInputValues2);
P6Input.addEventListener("input", storeInputValues2);
P7Input.addEventListener("input", storeInputValues2);
P8Input.addEventListener("input", storeInputValues2);

//START (apply buttom)
console.log("test1:",ttProductCodes);


document.getElementById("add_chart").addEventListener("click", function () {
  console.log("test2:",ttProductCodes);
  console.log("test3:",itmValue);
  selectedXAxis = document.getElementById("x-axis").value;
  selectedYAxis = document.getElementById("y-axis").value;
  selectedChartType = document.getElementById("select-charts").value;

  function getAllInputValues() {
    var inputs = document.querySelectorAll('#Product_PnL input[type="text"]');
    var values = [];

    inputs.forEach(function (input) {
      var value = input.value.trim();
      if (value !== "") {
        values.push(value);
      }
    });

    return values;
  }
  inputValues = getAllInputValues();

  clickCount++;
  if (clickCount === 5) {
    clickCount = 1;
  }
});
console.log("date:  " + startDateInput);

// get data from the API
document
  .getElementById("add_chart")
  .addEventListener("click", async function () {
    try {
      // //ATR values
      // let globalData_atr = await fetch_Data_for_atr(startDateInput, endDateInput, productValue);
      // console.log("Fetched data:", globalData_atr);
      // const atrValues = await calculateATR(globalData_atr);
      // console.log("ATR Values:", atrValues);
      // //DCW values
      // let globalData_dcw = await fetch_Data_for_dcw(startDateInput, endDateInput, productValue);
      // console.log("Fetched data:", globalData_dcw);
      // const DCW = await calculateDCW(globalData_dcw, period = 40);
      // console.log("DCW Values:", DCW);
      // //DCW/ATR Ratio values
      // const DCW = await calculateDCWATRRatio(DCW, atrValues);
      // console.log("DCW/ATR Ratio Values:", DCW_ATR);

      // XRR = DCW.map(entry => entry.Date);
      // YRR = DCW.map(entry => entry.DCW);

      if (
        selectedYAxis === "DCW" &&
        selectedXAxis === "Time" &&
        productValue !== null
      ) {
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        XRR = DCW.map((entry) => entry.Date);
        YRR = DCW.map((entry) => entry.DCW);
        plotchart(XRR, YRR);
      } else if (
        selectedYAxis === "ATR" &&
        selectedXAxis === "Time" &&
        productValue !== null
      ) {
        //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        XRR = atrValues.map((entry) => entry.Date);
        YRR = atrValues.map((entry) => entry.ATR);
        plotchart(XRR, YRR);
      } else if (
        selectedYAxis === "DCW_ATR" &&
        selectedXAxis === "Time" &&
        productValue !== null
      ) {
        //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        //DCW values
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        //DCW/ATR Ratio values
        const DCW_ATR = await calculateDCWATRRatio(DCW, atrValues);
        console.log("DCW/ATR Ratio Values:", DCW_ATR);

        XRR = DCW_ATR.map((entry) => entry.Date);
        YRR = DCW_ATR.map((entry) => entry.Ratio);
        plotchart(XRR, YRR);
      } else if (selectedYAxis === "grossPnL" && selectedXAxis === "Time") {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.grossPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          
          XRR = all_data.map((entry) => entry.reportDate);
          YRR = all_data.map((entry) => entry.net_PnL_per_day);
          console.log("XRR test", XRR);
          plotchart(XRR, YRR);
        }
      } 
      else if (selectedYAxis === "grossPnL" && selectedXAxis === "DCW_ATR" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.grossPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        //DCW values
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        //DCW/ATR Ratio values
        const DCW_ATR = await calculateDCWATRRatio(DCW, atrValues);
        console.log("DCW/ATR Ratio Values:", DCW_ATR);

        let ATR_date = DCW_ATR.map((entry) => entry.Date);
       let DCW_ATR_VALUE= DCW_ATR.map((entry) => entry.Ratio);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = ATR_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and DCW_ATR_VALUE for common dates
let commonPnL = [];
let commonDCW_ATR_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in ATR_date
    let indexInDCW_ATR = ATR_date.indexOf(date);

    // Add corresponding PnL and DCW_ATR_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    commonDCW_ATR_VALUE.push(DCW_ATR_VALUE[indexInDCW_ATR]);
});
XRR = commonDCW_ATR_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
      else if (selectedYAxis === "grossPnL" && selectedXAxis === "DCW" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.grossPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
         
        //DCW values
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        
        let DCW_date = DCW.map((entry) => entry.Date);
       let DCW_VALUE= DCW.map((entry) => entry.DCW);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = DCW_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and DCW_VALUE for common dates
let commonPnL = [];
let commonDCW_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in DCW_date
    let indexInDCW = DCW_date.indexOf(date);

    // Add corresponding PnL and DCW_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    commonDCW_VALUE.push(DCW_VALUE[indexInDCW]);
});
XRR = commonDCW_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
      else if (selectedYAxis === "grossPnL" && selectedXAxis === "ATR" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.grossPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        
        let ATR_date = atrValues.map((entry) => entry.Date);
       let ATR_VALUE= atrValues.map((entry) => entry.ATR);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = ATR_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and ATR_VALUE for common dates
let commonPnL = [];
let common_ATR_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in ATR_date
    let indexInDCW_ATR = ATR_date.indexOf(date);

    // Add corresponding PnL and ATR_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    common_ATR_VALUE.push(ATR_VALUE[indexInDCW_ATR]);
});
XRR = common_ATR_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
     
      else if (selectedYAxis === "netPnL" && selectedXAxis === "Time") {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.netPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          
          XRR = all_data.map((entry) => entry.reportDate);
          YRR = all_data.map((entry) => entry.net_PnL_per_day);
          console.log("XRR test", XRR);
          console.log("YRR: ", YRR);
          plotchart(XRR, YRR);
        }
      } 
      else if (selectedYAxis === "net_equity_PnL" && selectedXAxis === "Time") {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.netPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          
          XRR = all_data.map((entry) => entry.reportDate);
          YRR = all_data.map((entry) => entry.net_PnL_per_day);
          const YRR_equity = [];
          let sum = 0;
          for (let i = 0; i < YRR.length; i++) {
          sum += YRR[i];
          YRR_equity.push(sum);
}

        console.log("YRR_equity: ", YRR_equity);
          console.log("XRR test", XRR);
          plotchart(XRR, YRR_equity);
        }
      } 
      else if (selectedYAxis === "netPnL" && selectedXAxis === "DCW_ATR" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.netPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        //DCW values
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        //DCW/ATR Ratio values
        const DCW_ATR = await calculateDCWATRRatio(DCW, atrValues);
        console.log("DCW/ATR Ratio Values:", DCW_ATR);

        let ATR_date = DCW_ATR.map((entry) => entry.Date);
       let DCW_ATR_VALUE= DCW_ATR.map((entry) => entry.Ratio);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = ATR_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and DCW_ATR_VALUE for common dates
let commonPnL = [];
let commonDCW_ATR_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in ATR_date
    let indexInDCW_ATR = ATR_date.indexOf(date);

    // Add corresponding PnL and DCW_ATR_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    commonDCW_ATR_VALUE.push(DCW_ATR_VALUE[indexInDCW_ATR]);
});
XRR = commonDCW_ATR_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
      else if (selectedYAxis === "netPnL" && selectedXAxis === "ATR" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.netPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
          //ATR values
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
        
        let ATR_date = atrValues.map((entry) => entry.Date);
       let ATR_VALUE= atrValues.map((entry) => entry.ATR);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = ATR_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and ATR_VALUE for common dates
let commonPnL = [];
let common_ATR_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in ATR_date
    let indexInDCW_ATR = ATR_date.indexOf(date);

    // Add corresponding PnL and ATR_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    common_ATR_VALUE.push(ATR_VALUE[indexInDCW_ATR]);
});
XRR = common_ATR_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
      else if (selectedYAxis === "netPnL" && selectedXAxis === "DCW" && productValue !== null) {
        fetch("pnl_productwise.json")
          .then((response) => response.json())
          .then((data) => {
            // Store the data in global_Pnl_data
            const global_Pnl_data = data;

            // Call your other function and pass global_Pnl_data to it
            otherFunction(global_Pnl_data);
          })
          .catch((error) => console.error("Error fetching JSON:", error));

        // Define your other function
        function otherFunction(data) {
          // Now you can access the global_Pnl_data object here
          console.log("Inside otherFunction:");
          console.log(data);

          // Initialize an array to store new objects
          const newData = [];

          // Iterate over each object in the array
          data.forEach((item) => {
            // Create a new object for each item
            const newItem = {
              itm: item.primaryITM,
              reportDate: new Date(item.reportDate).toLocaleDateString("en-US"),
              ttProductCode: item.ttProductCode,
              grossPnL: item.netPnL,
            };

            // Push the new object into the array
            newData.push(newItem);
          });

          // Output the new array
          console.log("New data:", newData);
          filterData(newData, startDateInput, endDateInput,itmValue, ttProductCodes);
        }
        function filterData(newData, startDateInput, endDateInput, itm, ttProductCodes) {
          // Parse the start and end dates
          const startDate = new Date(startDateInput);
          const endDate = new Date(endDateInput);
        
          // Filter newData based on the date range, itm, and ttProductCode values
          const filteredData = newData.filter(item => {
            const reportDate = new Date(item.reportDate);
            return (
              reportDate >= startDate &&
              reportDate <= endDate &&
              item.itm === itm &&
              ttProductCodes.includes(item.ttProductCode)
            );
          });
        
          // Group filtered data by reportDate
          const groupedData = filteredData.reduce((acc, item) => {
            const dateKey = item.reportDate;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(item);
            return acc;
          }, {});
        
          // Calculate net_PnL_per_day
          const netPnLPerDayData = Object.keys(groupedData).map(dateKey => {
            const items = groupedData[dateKey];
            const grossPnLSum = items.reduce((sum, item) => sum + item.grossPnL, 0);
            return { reportDate: dateKey, net_PnL_per_day: grossPnLSum };
          });
        
          // Output the filtered data with net_PnL_per_day
          console.log("Filtered data with net_PnL_per_day:", netPnLPerDayData);
          // Output the filtered data
          console.log("Filtered data:", filteredData);
          chech_data(netPnLPerDayData);
          
          // If you want to do something else with the filtered data, you can do it here
        }
        
        
       
        async function chech_data(all_data) {
          console.log("All data test", all_data);
         
        //DCW values
        let globalData_dcw = await fetch_Data_for_dcw(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_dcw);
        const DCW = await calculateDCW(globalData_dcw, (period = 40));
        console.log("DCW Values:", DCW);
        
        let DCW_date = DCW.map((entry) => entry.Date);
       let DCW_VALUE= DCW.map((entry) => entry.DCW);
          
         let PnL_date = all_data.map((entry) => entry.reportDate);
          let PnL = all_data.map((entry) => entry.net_PnL_per_day);
          let commonDates = DCW_date.filter(date => PnL_date.includes(date));

// Extract corresponding PnL and DCW_VALUE for common dates
let commonPnL = [];
let commonDCW_VALUE = [];

commonDates.forEach(date => {
    // Find index of date in PnL_date
    let indexInPnL = PnL_date.indexOf(date);
    // Find index of date in DCW_date
    let indexInDCW = DCW_date.indexOf(date);

    // Add corresponding PnL and DCW_VALUE to the common arrays
    commonPnL.push(PnL[indexInPnL]);
    commonDCW_VALUE.push(DCW_VALUE[indexInDCW]);
});
XRR = commonDCW_VALUE;
YRR = commonPnL;
          console.log("XRR test", XRR);
          console.log("YRR test", YRR);
          plotchart(XRR, YRR);
        }

      }
      else if (selectedYAxis === "Change" && selectedXAxis === "Time" && productValue !== null) {
        let ohlcData = await fetch_Data_for_ohlc(
          startDateInput,
          endDateInput,
          productValue
        );
        const changeValues = calculateCloseOpenDifference(ohlcData);
        console.log("Change Values:", changeValues);
        XRR = changeValues.map((entry) => entry.Date);
        YRR = changeValues.map((entry) => entry.CloseOpenDifference);
        plotchart(XRR, YRR);

      }
      else if (selectedYAxis === "Change/ATR" && selectedXAxis === "Time" && productValue !== null) {
        let globalData_atr = await fetch_Data_for_atr(
          startDateInput,
          endDateInput,
          productValue
        );
        let ohlcData = await fetch_Data_for_ohlc(
          startDateInput,
          endDateInput,
          productValue
        );
        console.log("Fetched data:", globalData_atr);
        const atrValues = await calculateATR(globalData_atr);
        console.log("ATR Values:", atrValues);
       const normalizedATR = calculateNormalizedATR(ohlcData, atrValues)
        console.log("Normalized ATR Values:", normalizedATR);

        XRR = normalizedATR.map((entry) => entry.Date);
        YRR = normalizedATR.map((entry) => entry.normalizedATR);
        plotchart(XRR, YRR);


      }
      else if (selectedYAxis === selectedXAxis) {
        XRR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        YRR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        plotchart(XRR, YRR);
      }
       else {
        XRR = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
        YRR = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
        plotchart(XRR, YRR);
      }

      function plotchart(XRR, YRR) {
        switch (selectedChartType) {
          case "Scatter Plot":
            createScatterChart(
              XRR,
              YRR,
              clickCount,
              selectedXAxis,
              selectedYAxis,
              startDateInput,
              endDateInput
            );

            break;
          case "Bar Chart":
            createBarChart(
              XRR,
              YRR,
              clickCount,
              selectedXAxis,
              selectedYAxis,
              startDateInput,
              endDateInput,
              productValue
            );
            break;
          case "Line Chart":
            createLineChart(
              XRR,
              YRR,
              clickCount,
              selectedXAxis,
              selectedYAxis,
              startDateInput,
              endDateInput
            );
            break;
          case "Pie Chart":
            createPieChart(
              XRR,
              YRR,
              clickCount,
              selectedXAxis,
              selectedYAxis,
              startDateInput,
              endDateInput
            );

            break;
          case "Stack Chart":
            createStackChart(
              XRR,
              YRR,
              clickCount,
              selectedXAxis,
              selectedYAxis,
              startDateInput,
              endDateInput
            );
          default:
            break;
        }
      }

      // Further operations with the fetched and processed data
    } catch (error) {
      console.error("Error:", error);
    }
  });

document.getElementById("Reset_last").addEventListener("click", function () {
  if (clickCount < 0) {
    clickCount = 0;
  }
  removeChart(clickCount);
  clickCount--;
});
