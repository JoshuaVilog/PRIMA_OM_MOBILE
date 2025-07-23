
let operation = new Operation();

setTimeout(() => {

    operation.PopulatePurpose($("#selectPurpose"));
    operation.PopulateMachine($("#selectMachineCode"));
}, 500);

document.addEventListener('deviceready', function () {

    main.CheckUpdate();
}, false);

$("#btnRefresh").click(function(){

    window.location.reload();
    
});
$("#btnScanMachineCodeQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            console.log(scanResult);
            let isValid = operation.CheckMachineCodeQR(scanResult);
            let user = $("#txtUser").val();

            if(isValid == true){
                
                $("#txtDisplayMachineCode").val(scanResult);
                $("#txtMachineCode").val(scanResult);

                checkMachineLogs(scanResult, user)
            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })

                $("#txtDisplayMachineCode").val("");
                $("#txtMachineCode").val("");
                $("#btnOut").hide();
                $("#btnIn").hide();
            }

        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Place a QR CODE inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
});

$("#btnScanUserQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            console.log(scanResult);
            let isValid = operation.CheckUserQR(scanResult);
            let machineCode = $("#txtMachineCode").val();

            if(isValid == true){
                $("#txtUser").val(scanResult)
                $("#txtDisplayUser").val(scanResult + " - " + main.SetEmployeeName(scanResult));

                checkMachineLogs(machineCode, scanResult)
            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })

                $("#txtUser").val("")
                $("#txtDisplayUser").val("");
                $("#btnOut").hide();
                $("#btnIn").hide();
            }

        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Place a QR CODE inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
});

function checkMachineLogs(machineCode, user){

    if(machineCode != "" && user != ""){

        operation.machineCode = machineCode;
        operation.user = user;

        operation.CheckMachineLogs(operation, function(response){
            // alert(JSON.stringify(response));
            let status = response.status;
            let rid = response.rid;
            let purpose = response.purpose;
            let remarks = response.remarks;

            console.log(response);

            if(status == "IN"){

                $("#btnIn").show();
                $("#btnOut").hide();
            } else if(status == "OUT"){

                $("#btnOut").show();
                $("#btnIn").hide();
            } else{

                $("#btnOut").hide();
                $("#btnIn").hide();
                $("#txtUser").val("")
                $("#txtDisplayUser").val("");
                $("#txtDisplayMachineCode").val("");
                $("#txtMachineCode").val("");
            }

            operation.PopulatePurpose($("#selectPurpose"), purpose);
            $("#txtRemarks").val(remarks);
            $("#hiddenRID").val(rid);
            
        })

    }
}

$("#btnIn").click(function(){
    let machine = $("#txtMachineCode").val();
    let user = $("#txtUser").val();
    let purpose = $("#selectPurpose").val();
    let remarks = $("#txtRemarks").val();

    operation.machine = machine;
    operation.user = user;
    operation.purpose = purpose;
    operation.remarks = remarks;

    operation.InMachineLog(operation, function(response){

        if(response == true){
            clearForm();
        }

    });
});

$("#btnOut").click(function(){
    let rid = $("#hiddenRID").val();
    let user = $("#txtUser").val();
    let remarks = $("#txtRemarks").val();

    operation.rid = rid;
    operation.user = user;
    operation.remarks = remarks;

    operation.OutMachineLog(operation);
    clearForm();
});

$("#btnMachineCodeChangeToSelect").click(function(){

    $(this).hide();
    $("#selectMachineCode").show();
    $("#btnMachineCodeChangeToScan").show();
    $("#txtDisplayMachineCode").hide();
    $("#btnScanMachineCodeQR").hide();
    operation.PopulateMachine($("#selectMachineCode"));
    $("#txtMachineCode").val("");


});
$("#btnMachineCodeChangeToScan").click(function(){

    $(this).hide();
    $("#btnMachineCodeChangeToSelect").show();
    $("#txtDisplayMachineCode").show();
    $("#selectMachineCode").hide();
    $("#btnScanMachineCodeQR").show();
    $("#txtMachineCode").val("");

});
$("#selectMachineCode").change(function(){
    let value = $(this).val();

    $("#txtMachineCode").val(value);

})

$("#btnClear").click(function(){

    clearForm();
});


function clearForm(){

    $("#btnIn").hide();
    $("#btnOut").hide();
    $("#txtDisplayUser").val("");
    $("#txtUser").val("");
    $("#txtMachineCode").val("");
    $("#txtDisplayMachineCode").val("");
    $("#selectPurpose").val("");
    $("#hiddenRID").val("");
    $("#txtRemarks").val("");
    operation.PopulateMachine($("#selectMachineCode"));

}


$("#btnScanUserQR2").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            // alert(scanResult);
            let isValid = operation.CheckUserQR(scanResult);

            if(isValid == true){
                $("#txtUser2").val(scanResult)
                $("#txtDisplayUser2").val(scanResult + " - " + main.SetEmployeeName(scanResult));
                $("#spinner").show();

                operation.DisplayMachineLogsRecordsByUser("#table-history-logs", scanResult)
            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })
            }

        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Place a QR CODE inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: true // iOS and Android
        }
    );
});

$("#liViewHistoryLogs").click(function(){

    operation.EmptyHistoryLogs();
    $("#table-history-logs").empty();
    $("#txtUser2").val("")
    $("#txtDisplayUser2").val("");

});


$("#btnOpenModalConnection").click(function(){
    main.CheckConnection(function(response){

        $("#modalConnection").modal("show");
        $("#displayConnectionStatus").html(response);
        $("#displayIP").text(main.SetIP());
    })
});

$("#btnCheckConnection").click(function(){

    $("#displayConnectionStatus").html("-");
    $("#displayIP").html("-");

    setTimeout(() => {
        main.CheckConnection(function(response){

            $("#displayConnectionStatus").html(response);
            $("#displayIP").text(main.SetIP());
        })
    }, 1000);
});





























// document.addEventListener('deviceready', checkUserInfo, false);

/* $("#btnClick").click(function(){
    let desc = $("#txtDesc").val();

    $.ajax({
        // url: "https://primatechphils.com/JOSHUA_CODES/sample.php",
        // url: "http://172.16.102.15:8080/JOSHUA_CODES/sample.php",
        url: "http://172.16.102.15:8080/JOSHUA_CODES/updateApp.xml",
        method: "POST",
        data: { 
            desc: desc
        },
        success: function(response) {

            alert(response)
            
        },
        error: function(response){
            alert("Please check your device if it is connected on Internet Connection.")
        }
    });
}) */

/* document.addEventListener('deviceready', function () {
    var updateUrl = "http://172.16.102.15:8080/JOSHUA_CODES/updateApp.xml";

    alert(updateUrl);
    cordova.plugins.AppUpdate.checkAppUpdate(onSuccess, onFail, updateUrl);
}, false); */

/* document.addEventListener('deviceready', function () {
    console.log("Device is ready");
    var updateUrl = "http://172.16.102.15:8080/JOSHUA_CODES/updateApp.xml";
    console.log(cordova.plugins);
    console.log(cordova.plugins.AppUpdate);

    window.AppUpdate.checkAppUpdate(onSuccess, onFail, updateUrl);

    function onFail() {
        alert("App update check failed:", error);
    }
    function onSuccess() {
        // alert("App update check successful");
    }
}, false); */





