$(function(){
	var $source = $('#dataSource');
	var $set = $('#dataSet');
	var xml = {};
	var database = {};
	var titles;
	var getDataSet;

	//hides majority of items
	$( "#set" ).hide();
	$( "#search" ).hide();
	$( "#showForm").hide();
	$( "table").hide();
	
	
	
     $source.on('change',function calling(){//Event listner when choosing a data source
	 	$("#columnSet").empty(); //resets input column select options 
		$('table').empty(); //resets table 
		$('#search').hide(); //hides search
		$('#showForm').hide(); //hides the ability to add new rows
		$('#newRowForm').hide(); //hides the input for creating a new row
		$('#newInputs').empty(); //resets the input fields when creating a new row
	
		
		if (this.value === 'choose') {//when a source is not chosen
		$set.html('<option>Please choose an source</option>');
		$( "#set" ).hide(); //hides the data set select options when no data source is chosen
	
			return;
		}
		var sets = getSets(this.value); //calls function for getting values related to the chosen data source
	
		if ($("#dataSource option:selected").val()=='database'){//When the user chooses to use a database source
		var options = '<option>Please choose a Database source</option>';	
		$( "#set" ).show();
		}
		
	    
		
		if ($("#dataSource option:selected").val()=='xml'){  //When the user chooses to use a XML source
		var options = '<option>Please choose a XML source</option>';
		$( "#set" ).show();
		} 
		
	
		
		for (var i in sets) { //loops and gets every data set depending on what the data source was chosen
			options += '<option value="' + i + '">' + sets[i] + '</option>';
		
		}
		$set.html(options); //displays the data sets
				
	});
		
	//displaying table contents of a data set
	$("#dataSet").on('change', function(){
	
	 getDataSet = ($("#dataSet option:selected").html())
	 //for resetting and hiding when another data set is chosen
	 $("#columnSet").empty();
	 $('table').empty(); 
	 $('#search').hide(); 
	 $('#showForm').hide();
	 $('#newRowForm').hide();
	 $('#newInputs').empty();
	
		 if ($("#dataSource option:selected").val()=='database'){//database datasets
		  $.getJSON("database1.php", {tableName:getDataSet}, function(data){
		   if (data["code"] == "error"){
			console.log(data["message"]);
			}
			else{
			 $.each(data, function(index, element) {
			 var i;
			 var s;
			 titles =  Object.keys(element[0])//variable to store titles
		
			 for (s = 0; s < titles.length; s++) { //fills the table with columns and also fills the column select options
				$("#columnSet").append('<option value="' + s + '">' + titles[s] + '</option>'); //column select options
				$("table:first").append('<th>'+ titles[s] + '</th>'); //sets the column of the first row of the table
			 }
			 
			 console.log(titles.length)
			 
			 for (i = 0; i < element.length; i++){ 
				var strings = JSON.stringify(Object.values(element[i])).replace(/[^a-zA-Z0-9 ]/g, " "); //array to string with stringify and also removing extra symbols.
				var counts = 0;
				var tablebody;
				var d;
				
					tablebody += '<tr>'
					for (d = 0; d < Object.values(element[i]).length ; d++){ //displays all data in a table
						tablebody +='<td>' + JSON.stringify(Object.values(element[i])[counts]) + '</td>' ; 
						counts++;
					};
					tablebody+= '</tr>'
					
					$( "#tablesTests" ).append(tablebody);
					
					tablebody = null //makes sure that the variable is reset everytime a row is created 
					
					console.log(counts)
					$('#search').show(); //reveals search
					$('#showForm').show(); //allows user to add a new row
					
					
				
			 }
			}); //end else
		  }; //end getJSON

	});
	} else if ($("#dataSource option:selected").val()=='xml'){//xml datasets
		//for resetting and hiding when another data set is chosen
		$("#columnSet").empty();
		$('table').empty(); 
		 $('#search').hide(); 
		 $('#showForm').hide();
		 $('#newRowForm').hide();
		 $('#newInputs').empty();
		 
		$.getJSON("xml1.php", {sourceName:getDataSet}, function(data){
		if (data["code"] == "error"){
			console.log(data["message"]);
		}
		else{
			$.each(data, function(index, element) {
			var i;
			var s;
			titles =  Object.keys(element[0])//variable to store titles
		
			 for (s = 0; s < titles.length; s++) { //fills the column data selection and tabl
				$("#columnSet").append('<option value="' + s + '">' + titles[s] + '</option>'); //adds a new select option 
				$("table:first").append('<th>'+ titles[s] + '</th>'); //sets the column of the first row of the table
			 }
			
			   	for (i = 0; i < element.length; i++){ 
					var strings = JSON.stringify(Object.values(element[i])).replace(/[^a-zA-Z0-9 ]/g, " "); //array to string with stringify and also removing extra symbols.
					var counts = 0;
					var tablebody;
					var d;
			
					tablebody += '<tr>'
					for (d = 0; d < Object.values(element[i]).length  ; d++){ //displays all data in a table
						tablebody +='<td>' + JSON.stringify(Object.values(element[i])[counts]) + '</td>' ;
						counts++;
					};
					
					tablebody+= '</tr>'
					
					$("#tablesTests").append(tablebody)
				
					tablebody = null //makes sure that the variable is reset everytime a row is created 
					console.log(counts)
					$('#search').show(); //search and the input forms are displayed
					$('#showForm').show();
			
				
				}
			}); //end else
			} //end getJSON
		   });
		  };
	  });
	
	//Inputing New data into the datasets
	$(document).ready(function() {
	  var $newRowButton = $('#newRowButton');
	  var $newRowForm = $('#newRowForm');
	  var $textInput = $('#newInputs');
	  var inputs = '';
	  
	  //the new course button is shown instead of the input form
	  $newRowButton.show();
	  $newRowForm.hide();
	  
	  $('#showForm').on('click', function(){
		  $('#newInputs').empty();
		  $newRowForm.toggle('fast');  //allows the input to be toggled on or off
		  var i;
		  for (i = 0; i < titles.length; i++){ //creates all inputs using a loop
		  inputs += titles[i]+'<input class="new" type="text" name="'+titles[i]+'"'+'placeholder="'+titles[i]+'"> <br> ' 
		  }
		 
		 $("#newInputs").append(inputs);
		 
		 inputs = '' //resets inputs
	
	  });
	
	  
	  
	  //course input form
	  $newRowForm.on('submit', function(e) {
		  e.preventDefault();
		  
		  getDataSet = ($("#dataSet option:selected").html())
		  var newText = $('input:text').val();//gets the text from the input form
		  
		  //used to get values 
		  var addData = {}; 
		  $(".new").each(function() {
	      addData[$(this).attr("name")] = $(this).val(); //finds and gets input values into a object
		  });
		  console.log(addData)
		  var jsonAddData = JSON.stringify(addData); //converts object to a string
	
			
		  
		  if ($("#dataSource option:selected").val()=='database'){ //if a database data set is chosen
			$.getJSON("database2.php", {tableName:getDataSet, appendData:jsonAddData}, function(data){ //calls a php file to add a new row
			console.log(data); 
		  });
		  
		  } else if ($("#dataSource option:selected").val()=='xml'){ //if a xml data set is chosen
			 $.getJSON("xml2.php", {sourceName:getDataSet, sourceData:jsonAddData}, function(data){ //calls a php file to add a new row
			 console.log(data); 
			 });
		  }
		
		  $newRowForm.hide(); //hides the ability to add a new row
		  $textInput.val(''); 
	  });
  });

	function getSets(dataSources){ //is called when the user chooses a data source
		if (dataSources === 'database'){ //if user chooses a database datasource
	
		$.getJSON("database.php", function(data){ //calls a php file to get the data set values
				if (data["code"] == "error"){ 
				  console.log(data["message"]); //when a error is detected the message will be displayed in the console
				  
				}
				else{
			
				database = Object.assign({},(data)); //stores all data set values 
	
				console.log(database); //return back
				} //end else
			 //}
			}); //end getJSON
		
		return database;
		
		} else if (dataSources === 'xml'){ //if user chooses a database datasource
		
		 $(function() {
		$.getJSON("xml.php", function(data){ //calls a php file to get the data set values
			if (data["code"] == "error"){

			  console.log(data["message"]); //when a error is detected the message will be displayed in the console
			}
			else{
			
			  xml = Object.assign({},(data)); //stores all data set values 
			}
		  });
		}); 
		 return xml; //return back
		}
			
	};
}()); 	
	//Searching table
	$('#textsInputs').keyup(function(){
	  // Declare variables
	  var input, filter, table, tr, td, i, txtValue;
	  input = $("#textsInputs");
	  filter = input.val().toUpperCase();
	  table = $("#tablesTests");
	  tr = $("tr");
	  column = $("#columnSet").val();
	  console.log($("#columnSet").val());
	  
	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
		 td = tr[i].getElementsByTagName("td")[column]; 
		if (td) {
		  txtValue = td.textContent || td.innerText;
		  if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		  } else {
			tr[i].style.display = "none";
		  }
		}
	  }
	});
	
