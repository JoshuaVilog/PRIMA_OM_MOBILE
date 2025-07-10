
let operation = new Operation();

$("#btnScanMachineCodeQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            // alert(scanResult);
            let isValid = operation.CheckMachineCodeQR(scanResult);

            if(isValid == true){
                
                $("#txtMachineCode").val(scanResult);
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

$("#btnScanUserQR").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            // alert(scanResult);
            let isValid = operation.CheckUserQR(scanResult);

            if(isValid == true){
                $("#txtUser").val(scanResult)
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

$("#btnRefresh").click(function(){

    window.location.reload();
    
});




/* 
$("#btnScan").click(function(){
    scanBarcode();
})

function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            
            

        },
        function(error) {
            alert("Scanning failed: " + error);
        }
    );
}

 */
































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





