"use strict";

//variables
var inputReadFile = document.querySelector("#fileInputContainer");
var printView = document.getElementById("pView1");
var printView2 = document.getElementById("pView2");
var lengthMeasure = "";
var deleteBtn = document.getElementById("deleteButton");
var checkBoxBool = false;
var updatedArrayOutput = [];
var firstRunNumberOfRows = 0;
var firstRunMasterBool = true;


document.getElementById('file').onchange = function(){
	//get the file
  var file = this.files[0];
	//create a FileReader object to read the file
  var reader = new FileReader();
  reader.onload = function(){
    	
	//new array
	var myArrayOfNames = [];

    // Read by lines
    var lines = this.result.split('\n');
    for(var line = 0; line < lines.length; line++){
				if (lines[line].toString().length > 1){
					myArrayOfNames.push(lines[line]); 
			}		  
	 
    }
	
	printArray(myArrayOfNames, printView);
	randomNameGenerateAndPrint(myArrayOfNames);

  };
  reader.readAsText(file);
  
};

//Array Printing function
function printArray(anArray, aPrintView){
	var result = "";
	for (var i = 0; i < anArray.length; i++){
		result += anArray[i] + "<br/>";
	}

	inputReadFile.style.display = "none";
	aPrintView.innerHTML += result;	
};



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function randomNameGenerateAndPrint(arrayOfNames){
	
	var updatedArrayView = document.getElementById("pView3");
	var myIndex = -1;
	var firstName = "";
	var lastName = "";
	var nickName = "";
	
	updateArray(arrayOfNames, firstName, nickName, lastName, updatedArrayView, myIndex);	
}

function updateArray(theArray, fName, nName, lName, resultsView, indexSelect){
	var tableHead = "";
	var tableRows = "";
	let classIdCounter = 0;
	tableHead = "<thead> <tr><th>Firstname</th> <th>Nickname</th> <th>Lastname</th> <th> Delete</th></tr> </thead>";
	
	while(theArray.length > 1){
		
		nameSelect();		
		if (fName == "...." && lName == "...."){
			nameSelect();
		}
		else{
			tableRows += "<tr id =\" row" + classIdCounter + "\"><td>" + fName + "</td><td>" + nName + "</td> <td>" + lName + "</td><td><input type=\"Checkbox\" id =\"" + classIdCounter + "\"></td></tr>";
			
			classIdCounter++;
		}		
	}

	firstRunNumberOfRows = classIdCounter; 

	
	closeTable(tableHead, tableRows, resultsView, classIdCounter);
	
	function nameSelect(){
			
			indexSelect = Math.floor(Math.random() * theArray.length);	
			fName = theArray[indexSelect];
			if (fName != "...."){
				theArray.splice(indexSelect, 1);
			}
			indexSelect = Math.floor(Math.random() * theArray.length);
			nName = theArray[indexSelect];
			if (nName != "...."){
				theArray.splice(indexSelect, 1);
			}			
	
			indexSelect = Math.floor(Math.random() * theArray.length);
			lName = theArray[indexSelect];
			if (lName != "...."){
				theArray.splice(indexSelect, 1);
			}		
	}
	

	
	function closeTable(finalTableHead, finalTableRows, finalTableView, numberOfRows){
		var deleteBtn = "<div id=\"deleteButton\" > <button type=\"button\" onclick=\"deleteRow(" +  numberOfRows + ")\">Delete Selected Names</button></div>";
		
		
		
		var fullTable = "<div id=\"tableDiv\"><table id=\"NamesTable\">" + finalTableHead + finalTableRows + "</table>" + deleteBtn + "</div>";
		
		finalTableView.innerHTML = fullTable;
		
		var table = document.getElementById("NamesTable");
	
		}

		updatedArrayOutput = theArray;
}


function deleteRow(numberOfRows){
	
	if (firstRunMasterBool === true){
		var rowsToDelete = [];
		var checkboxState = false;
		console.log(numberOfRows);	
		
		for (var i= 0; i < numberOfRows; i++){
			
			checkboxState = checkboxInspect(i);
			console.log(checkboxState);
			if (checkboxState)
				rowsToDelete.push(i);		
		}

	}
	else{
		numberOfRows = firstRunNumberOfRows;
		console.log(numberOfRows);
	}
	
	//console.log(numberOfRows);
	
	completeDeletion(rowsToDelete);
	
	
	///Need code to count the number of rows left after deletion and keep it updated each and every time the cycle is complete so that when the "Delete Selected Names" is clicked it resets counters
	updateTable();
};


function checkboxInspect(checkboxId){
			checkBoxBool = document.getElementById(checkboxId).checked;
			return checkBoxBool;
		}



function completeDeletion(arrayForRowsSelectedForDeletion){
	var currentChildElement;
	var currentParentElement;
	
	for (var i = 0; i < arrayForRowsSelectedForDeletion.length; i++){
		
		currentChildElement = document.getElementById(arrayForRowsSelectedForDeletion[i]).parentElement.parentElement;
		currentParentElement = document.getElementById(arrayForRowsSelectedForDeletion[i]).parentElement.parentElement.parentElement;
		//console.log(currentChildElement);
		currentParentElement.removeChild(currentChildElement);

		firstRunNumberOfRows--;
		firstRunMasterBool = false;

	}

	//Get remaining rows by Id
};

function updateTable(){
	checkBoxBool = false;
	console.log(firstRunNumberOfRows);
}


