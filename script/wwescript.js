"use strict";

//ARRAYS (global)
//"globalArrayForNames" (array) - carries the names from the file uploaded.
var globalArrayForNames = [];
//"rowsToDelete" (array) - array that holds the indices of rows
//to delete as selected by user.
var rowsToDelete = [];
//"masterRowsIdTracker" (array) - master array that keeps track of current
//rows available after selection and deletion.
//Works in parallel with "globalArrayForNames" and "rowsToDelete"
var masterRowsIdTracker = [];


//"rowsIdTracker" (array) - works in parallel to the "rowsToDelete" to keep
//track of deleted rows after initial run and delete
//var rowsIdTracker = [];

//INPUTS (global)
//"inputFileUploaded" (input ref input) - input of type file, user uploads
//a ".txt" file
var inputFileUploaded = document.querySelector("#uploadFile");
//"deleteButton" (input ref button) - button used to delete rows
var btnDeleteElement = document.querySelector("#buttonDeleteSelectedNames");
var btnDownloadAsPDF = document.querySelector("#buttonDownloadAsPDF");

//OUTPUTS (global)
//Print Views
//"printView1" (output ref paragraph) - prints names in order they came in
//the list to display to user
var pView1 = document.querySelector("#printView1");

//"tableViewContainer" (output ref div) - div that holds the table printout
//view of randomly generated names
var divTableViewContainer = document.querySelector("#tableViewContainer");

//VARIABLES (global)
//"openingTable" (string) - holds HTML code to dynamically generate opening
//tag for the names table
var openingTable = "";
//"tableHead" (string) - holds HTML code to dynamically generate a table
//head for the names table
var tableHead = "";
//"tableRows" (string) - holds HTML code to dynamically generate table rows
//for the names table
var tableRows = "";
//"closingTable" (string) - holds HTML code to dynamically generate closing
//tag for the names table
var closingTable = "";
//"fullTable" (string) - holds HTML code to dynamically generate a full
//table using code from "openingTable", "tablehead", "tableRows" and
//"closingTable" variables
var fullTable = "";
//"btnDelete" (string) - holds HTML code to dynamically generate a delete
//button, in a div, at the end of the table to use to delete rows
var btnDelete = "";

//"firstName" (string) - holds a random first name selected from the
//array of names
var firstName = "";
//"nickName" (string) - holds a random nick name selected from the
//array of names
var nickName = "";
//"lastName" (string) - holds a random last name selected from the
//array of names
var lastName = "";
//"randomIndexTracker" (integer) - keeps track of randomly selected
//index to use to pick a random name from the array of names
var randomIndexTracker = -1;

//"rowIdCounter" (integer) - keeps track of row ids of the rows in the
//names table
var rowIdCounter = 0;

//"checkboxState" (boolean) - keeps track of whether a checkbox is
//checked (true) or not (false). Initial value is false.
var checkboxState = false;
//"initialRunComplete" (boolean) - switches only once during the run
//of the code. Cannot reverse back to false. Initial value is false.
var initialRunComplete = false;

//FUNCTIONS
//function (immediately invoked) - handles the state of elements on load
(function(){
    btnDeleteElement.style.display = "none";
    btnDownloadAsPDF.style.display = "none";
})();





//function (annonymous) - Master function that handles ".txt" file upload
//and reading of names in the file
document.getElementById("uploadFile").onchange = function(){
    //Get the file
    var file = this.files[0];

    //Array to carry names
    var arrayOfNames = [];


    //Create a FileReader object to read the file
    var reader = new FileReader();

    //This function tells the reader how to read the file and
    //what to do with the file once it reads
    //It will read the file line by line
    //It will place each read line if it has a name, into the "arrayOfNames"
    reader.onload = function(){
        //new array
        arrayOfNames = [];

        //Read the names in the file by lines
        var lines = this.result.split("\n");

        //Loop to read through each of the lines and place
        //names in the "arrayOfNames" array
        for (let line = 0; line < lines.length; line++){
            // if you want to include single letters change the value of the '>' right value to 1
            if (lines[line].toString().length > 2){
                arrayOfNames.push(lines[line]);
            }
            

        }  

        //Generating random names from the list
        masterArrayRandomNameGeneratorSetup(arrayOfNames)
       

    };
    //Now the reader can take a file and read it as instructed
    reader.readAsText(file);
};

//function (named) - "masterArrayRandomNameGeneratorSetup" - controls overall process of genertaing random names from "arrayOfNames" which it 
//takes as an argument
function masterArrayRandomNameGeneratorSetup(arrayOfNamesToUse){

    

    //Indes to initiate array loop
    var myIndex = -1;

    //variable to hold random first name generated
    var firstName = "";

    //variable to hold random nickname generated
    var nickName = "";
    
    //variable to hold random last name generated
    var lastName = "";
    
    hideElementDisplay(inputFileUploaded);

    randomNamesGenerator(arrayOfNamesToUse, firstName, nickName, lastName, randomIndexTracker, divTableViewContainer);

    namesTableGenerator();

};

//function (named) - "namesTableGenerator" - master function that handles generating table of names
function namesTableGenerator(){

    generateOpeningTable();
    generateTableHead();
    //generateTableRows();
    generateClosingTable();
    generateDeleteButton(rowIdCounter);
    generateFullTable();
    updateDivTableViewContainer();

    //function (named) - "generateTableHead" - handles generating table opening tags
    function generateOpeningTable(){
        openingTable = "<table id=\"namesTable\">";
    }

    //function (named) - "generateTableHead" - handles generating tablehead
    function generateTableHead(){
        tableHead = "<thead> <tr><th>Firstname</th> <th>Nickname</th> <th>Lastname</th> <th class=\"ignore\"> Delete</th></tr> </thead>";
        
    }

    //function (named) - "generateTableHead" - handles generating tableRows
    function generateTableRows(){
        //
    }

    //function (named) - "generateTableHead" - handles generating closing table tags
    function generateClosingTable(){
        closingTable = "<table/> <br><br>";        
    }

    //function (named) - "generateDeleteButton" - generates a delete button to use to delete rows with. 
    function generateDeleteButton(){
        //btnDelete = "<div id=\"deleteButton\" > <button type=\"button\" id=\"buttonDeleteSelectedNames\" onclick=\"deleteRow()\">Delete Selected Names</button></div>";
        showElementDisplay(btnDeleteElement);
        showElementDisplay(btnDownloadAsPDF);
        console.log(btnDeleteElement);
    }


    //
    //funciton (named) - "generateFullTable" - strings together text code from "openingTable", "tablehead", "tableRows" and "closingTable" 
    //variables to create the HTML code for the full table
    function generateFullTable(){
        fullTable = openingTable + tableHead + tableRows + closingTable + btnDelete;
    }

    //function (named) - "updateDivTableViewContainer" - updates the table div container "divTableViewContainer" innerHTML
    function updateDivTableViewContainer(){
        btnDelete = divTableViewContainer.innerHTML;
        divTableViewContainer.innerHTML = fullTable + btnDelete;

    }


}

//function (named) - "randomNamesGenerator" - master function that handles generating random names
function randomNamesGenerator(arrayOfNamesToUse, fName, nName, lName, randomIndex, resultsToView){
   
   while(arrayOfNamesToUse.length > 1){
            
        //Randomly selects names from array
        nameSelect();		
        if (fName == "...." && lName == "...."){
                nameSelect();
        }
        else{
                tableRows += "<tr id =\" row" + rowIdCounter + "\"><td>" + fName + "</td><td>" + nName + "</td> <td>" + lName + "</td><td><input type=\"Checkbox\" id =\"" + rowIdCounter + "\"></td></tr>";
                masterRowsIdTracker.push(rowIdCounter);
                rowIdCounter++;
            }		
    }

    rowIdCounter = masterRowsIdTracker.length;
    //console.log("Length of master row index tracker: " + masterRowsIdTracker.length);


    console.log("Here is the array with row iDs in it before deletion: " + masterRowsIdTracker);

    //function (named) - "nameSelect" - function that handles generating random names from the array
    function nameSelect(){
			
        randomIndex = Math.floor(Math.random() * arrayOfNamesToUse.length);	
        fName = arrayOfNamesToUse[randomIndex];
        if (fName != "...."){
            arrayOfNamesToUse.splice(randomIndex, 1);
        }
        randomIndex = Math.floor(Math.random() * arrayOfNamesToUse.length);
        nName = arrayOfNamesToUse[randomIndex];
        if (nName != "...."){
            arrayOfNamesToUse.splice(randomIndex, 1);
        }			

        randomIndex = Math.floor(Math.random() * arrayOfNamesToUse.length);
        lName = arrayOfNamesToUse[randomIndex];
        if (lName != "...."){
            arrayOfNamesToUse.splice(randomIndex, 1);
        }		
    }
}

//function (named) - "randomNamesGenerator" - master function that handles deleting of rows selected by user. 
//Takes the initial number of rows as argument
function deleteRow(){
    
    
    console.log(masterRowsIdTracker.length)
    var indexMasterRowsDeletions = 0;
    for (let i= 0; i < masterRowsIdTracker.length; i++){
                
        checkboxState = checkboxInspect(masterRowsIdTracker[i]);
        //console.log("Checkbox ID: " + i + " "+"state: " +checkboxState);
        if (checkboxState){
            rowsToDelete.push(masterRowsIdTracker[i]);	
            console.log("Row iDs to delete: " + rowsToDelete);
        }
    };

    for (let i=0; i < rowsToDelete.length; i++){
        indexMasterRowsDeletions = masterRowsIdTracker.indexOf(rowsToDelete[i]);
        masterRowsIdTracker.splice(indexMasterRowsDeletions, 1);
    }

    completeDeletion(rowsToDelete);
    console.log(rowsToDelete);

    //function (named) - "checkboxInspect" - checks if a checkbox is checked or not and returns the boolean value
    function checkboxInspect(checkboxId){
        var checkedOrNot = document.getElementById(checkboxId).checked;
        return checkedOrNot;        
    }

    //function (named) - "completeDeletion" - completes the deletion of rows using the "rowsToDelete" array as a list of rows to delete. 
    function completeDeletion(arrayForRowsSelectedForDeletion){
        var currentChildElement = "";
        var currentParentElement = "";
    
        for (var i = 0; i < arrayForRowsSelectedForDeletion.length; i++){
        
            currentChildElement = document.getElementById(arrayForRowsSelectedForDeletion[i]).parentElement.parentElement;
            currentParentElement = document.getElementById(arrayForRowsSelectedForDeletion[i]).parentElement.parentElement.parentElement;
            currentParentElement.removeChild(currentChildElement);   
        }

    };

    checkboxState = false;
    initialRunComplete = true;
    rowsToDelete = [];

    disableDeleteButton();

};

//function (named) - "updateElementDisplay" - sets the display attribute of an element to hide.
function hideElementDisplay(elementToUpdate){
    elementToUpdate.style.display = "none";
}
//function (named) - "showElementDisplay" - sets the display attribute of an element to show.
function showElementDisplay(elementToUpdate){
    elementToUpdate.style.display = "inline";
}

//function (named) - "disableDeleteButton" - sets the disable attribute of the delete button to false.
function disableDeleteButton(){
   if (masterRowsIdTracker.length === 0){
    document.querySelector("#buttonDeleteSelectedNames").disabled = true;
   }
};

//CREATE FUNCTION TO EXPORT AS PDF 2/10/2019

//Export as .pdf function
function exportPDFFile(){
    $("#namesTable").tableHTMLExport({

        //types - csv, txt, json, pdf
        type: 'pdf',
    
        filename: "WWE CAW Names List", 

        ignoreColumns: ".ignore"
    });

};

// window.addEventListener("load", function(){
// //Onclick handlers
// btnSaveAsPDF.addEventListener("click", exportPDFFile, false);
// btnDeleteElement.addEventListener("click", deleteRow, false);
// });