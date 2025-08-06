
let operation = new Operation();

if(main.CheckLoginUser() != null){
    location.assign("index.html");
}


$("#btnScanLoginUser").click(function(){
    
    screen.orientation.lock('portrait');

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            let scanResult = result.text;

            console.log(scanResult);
            let isValid = operation.CheckUserQR(scanResult);

            if(isValid == true){
                $("#txtUser").val(scanResult)
                $("#txtDisplayUser").val(scanResult + " - " + main.SetEmployeeName(scanResult));

                $("#spinner").show();
                main.LoginUser(scanResult);
                location.assign("index.html")

            } else if(isValid == false){

                Swal.fire({
                    title: 'Invalid QR Code',
                    text: 'Please scan the correct code',
                    icon: 'warning'
                })

                $("#txtUser").val("")
                $("#txtDisplayUser").val("");
                $("#spinner").hide();
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


