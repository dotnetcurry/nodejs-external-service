//1.
var http=require('http');

var Emp = []; 

//2.
var extServeroptions = {
	host:'localhost',
    port:'3752',
	path:'/api/EmployeeInfoAPI',
	method:'GET'
};
//3.
 function get(){
    http.request(extServeroptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        Emp = JSON.parse(data);
         Emp.forEach(function(e){
             console.log(e.EmpNo+"\t"+e.EmpName+"\t"+e.Salary+"\t"+e.DeptName+"\t"+e.Designation);
         });
    });
    
    }).end();
};

get();

console.log("Doing the Post Operations....");
//4
var Employee = JSON.stringify({
	'EmpName':'VB',
	'Salary':52000,
	'DeptName':'HR',
	'Designation':'LEAD'
});

 
//5
var extServeroptionspost = {
    host:'localhost',
     port:'3752',
	path:'/api/EmployeeInfoAPI',
    method : 'POST',
    headers:{
         'Content-Type' : 'application/json',
	  'Content-Length': Employee.length
    }
};

 

//6
var reqPost = http.request(extServeroptionspost, function(res) {
    console.log("response statusCode: ", res.statusCode);
    res.on('data', function(data) {
        console.log('Posting Result:\n');
        process.stdout.write(data);
        console.log('\n\nPOST Operation Completed');
    });
});
 
// 7
reqPost.write(Employee);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
 
get();
