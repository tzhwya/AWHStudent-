$(document).ready(
	function() {
		$('#progress-bar').show();
		$('#student').show();
		$('#course').show();
		$('#home').show();
	}
);
//
////////////////////////////////////////////////////////////
//
function ShowHome(){
	$('#progress-bar').show();
	$('#home').show();
};

function ShowStudent(){
	$('#student').show();
	$('#studentTableBody').empty();
	$.ajax({
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			url: 'http://localhost:8000/Student/',
			// data: JSON.stringify(),
			dataType: 'json',
		}).then(function(data){
			console.log(data)
			for(var i=0; i<data.length; i++){
				var id = data[i].id;
				var student_name = data[i].student_name;
				var age = data[i].age;
				var gender = data[i].gender;
				var address = data[i].address;
				var course_id = data[i].course_id;
				document.getElementById("studentTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+student_name+'</td>'+
																			'<td>'+age+'</td>'+
																			'<td>'+gender+'</td>'+
																			'<td>'+address+'</td>'+
																			'<td><button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#courseInfoModal" onclick="RetrieveCourse('+course_id+');">Show</button></td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#studentUpdateModal" onclick="InsertDataIntoStudentUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

function ShowCourse(){
	$('#progress-bar').hide();
	$('#course').show();
	$('#courseTableBody').empty();

	$.ajax({
			url: "http://localhost:8000/Course/"
	}).then(function(data){
		console.log(data)
		for(var i=0; i<data.length; i++){
			var id = data[i].id;
			var course_name = data[i].course_name;
			var major = data[i].major;
			document.getElementById("courseTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+course_name+'</td>'+
																			'<td>'+major+'</td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#courseUpdateModal" onclick="InsertDataIntoCourseUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

//
////////////////////////////////////////////////////////////
//
// Insert Data Into Student Update Modal
function InsertDataIntoStudentUpdateModal(id){
	$.ajax({
		url: "http://localhost:8000/Student/"+id+"/"
	}).then(function(data){
		$('#u_student_id').val(data.id);
		$('#u_student_name').val(data.student_name);
		$('#u_age').val(data.age);
		$('#u_gender').val(data.gender);
		$('#u_address').val(data.address);
		$('#course_id').val(data.course_id);
	});
};

// Insert Student Information
function InsertStudent(){
	// var studentId = document.getElementById("reStudentId").value;
	var studentName = document.getElementById("reStudentName").value;
	var age = document.getElementById("reAge").value;
	var gender = document.getElementById("reGender").value;
	var address = document.getElementById("reAddress").value;
	var courseId = document.getElementById("reCourseId").value;
	// alert(studentName+"\n"+age+"\n"+gender+"\n"+address+"\n"+courseId);
	var studentInfo = {
		"student_name": studentName,
		"age": age,
		"gender": gender,
		"address": address,
		"course_id": courseId,
	};
	$.ajax({
		type: 'POST',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Student/",
		data : JSON.stringify(studentInfo),
		dataType: "json",
		contentType: "application/json",
	}).then(function(data){
		alert("Sucessfully entered!");
	});
	//
	ClearStudentRegisterModal();
	//
	ShowStudent();
};

// Update Student Information by id
function UpdateStudent(){
	var id = document.getElementById("u_student_id").value;
	var student_name = document.getElementById("u_student_name").value;
	var age = document.getElementById("u_age").value;
	var gender = document.getElementById("u_gender").value;
	var address = document.getElementById("u_address").value;
	var course_id = document.getElementById("course_id").value;
	var post_data = {
		"id": id,
		"student_name": student_name,
		"age": age,
		"gender": gender,
		"address": address,
		"course_id": course_id
	}
	$.ajax({
		type : 'PUT',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Student/"+id+"/",
		data : JSON.stringify(post_data),
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			alert("Successfully Update!");
		}
	});
	//
	ClearStudentUpdateModal();
	//
	ShowStudent();
};

// Delete Student Information by id
function DeleteStudent(){
	var id = document.getElementById("u_student_id").value;
	$.ajax({
		type : 'DELETE',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Student/"+id+"/",
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			alert("Successfully Delete!");
		}
	});
	//
	ClearStudentUpdateModal();
	//
	ShowStudent();
};
//
///////////////////////////////////////////////////////////
//
// Retrieve Course Information by id
function RetrieveCourse(id){
	$.ajax({
		url: "http://localhost:8000/Course/"+id+"/"
	}).then(function(data){
		$('#r_course_id').val(data.id);
		$('#course_name').val(data.course_name);
		$('#major').val(data.major);
	});
};

// Insert Data Into Course Update Modal
function InsertDataIntoCourseUpdateModal(id){
	$.ajax({
		url: "http://localhost:8000/Course/"+id+"/"
	}).then(function(data){
		$('#u_course_id').val(data.id);
		$('#u_course_name').val(data.course_name);
		$('#u_major').val(data.major);
	});
};

//Insert Course Information
function InsertCourse(){
	var courseName = document.getElementById("reCourseName").value;
	var major = document.getElementById("reMajor").value;
	// alert(courseName+"\n"+major);
	var courseInfo = {
		"course_name": courseName,
		"major": major
	};
	$.ajax({
		type: 'POST',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Course/",
		data : JSON.stringify(courseInfo),
		dataType: "json",
		contentType: "application/json",
	}).then(function(data){
		alert("Sucessfully entered!");
	});
	//
	ClearCourseRegisterModal();
	//
	ShowCourse();
};

// Update Course Information by id
function UpdateCourse(){
	var id = document.getElementById("u_course_id").value;
	var course_name = document.getElementById("u_course_name").value;
	var major = document.getElementById("u_major").value;
	var post_data = {
		"id": id,
		"course_name": course_name,
		"major": major
	}
	$.ajax({
		type : 'PUT',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Course/"+id+"/",
		data : JSON.stringify(post_data),
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			alert("Successfully Update!");
		}
	});
	//
	ClearCourseUpdateModal();
	//
	$('#showCourse').load();
};

// Delete Course Information by id
function DeleteCourse(){
	var id = document.getElementById("u_course_id").value;
	$.ajax({
		type : 'DELETE',
		contentType : 'application/json; charset=utf-8',
		url : "http://localhost:8000/Course/"+id+"/",
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			alert("Successfully Delete!");
		}
	});
	//
	ClearCourseUpdateModal();
	//
	ShowCourse();
};
//
////////////////////////////////////////////////////////////
//
// Clear studentRegisterModal data
function ClearStudentRegisterModal(){
	document.getElementById("reStudentId").value = "";
	document.getElementById("reStudentName").value = "";
	document.getElementById("reAge").value = "";
	document.getElementById("reGender").value = "";
	document.getElementById("reAddress").value = "";
	document.getElementById("reCourseId").value = "";
	//
	$('#studentRegisterModal').modal('show');
};

// Clear studentUpdateModal data
function ClearStudentUpdateModal(){
	document.getElementById("u_student_id").value = "";
	document.getElementById("u_student_name").value = "";
	document.getElementById("u_age").value = "";
	document.getElementById("u_gender").value = "";
	document.getElementById("u_address").value = "";
	document.getElementById("course_id").value = "";
	//
	$('#studentUpdateModal').modal('show');
};

// Clear courseRegisterModal data 
function ClearCourseRegisterModal(){
	document.getElementById("reCourseName").value = "";
	document.getElementById("reMajor").value = "";
	//
	$('#courseRegisterModal').modal('show');
};

// Clear courseInfoModal data
function ClearCourseInfoModal(){
	document.getElementById("r_course_id").value = "";
	document.getElementById("course_name").value = "";
	document.getElementById("major").value = "";
	//
	$('#courseInfoModal').modal('show');
};

// Clear courseUpdateModal data
function ClearCourseUpdateModal(){
	document.getElementById("u_course_id").value = "";
	document.getElementById("u_course_name").value = "";
	document.getElementById("u_major").value = "";
	//
	$('#courseUpdateModal').modal('show');
};
//
////////////////////////////////////////////////////////////

