$(window).load(function() {
    $("#contact-submit").on('click', function(e){
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        mail = $("#mail").val()
        phone = $("#phone").val()
        identity = $("#identity").val()
        message = $("#message").val()

        console.log(mail, phone, identity, message)
            if(validateEmail(mail) && identity && (message.length > 30)){
            $.ajax({
                url: '/sendcontact',
                type: 'POST',
                data: {
                    mail: mail,
                    message: message,
                    identity: identity,
                    phone: phone,
                },
                success: function (data) {
                    swal ( "Super !" ,  `Succès ! ${data.message}` ,  "success" )
                    $('#contactform').trigger("reset");
                },
                error: function() {
                    swal ( "Oups" ,  "Le message n'a pas pu être envoyé :(" ,  "error" )
                }            
            });
            
        }else{
            swal ( "Oups" ,  "Veuillez correctement compléter le formulaire de contact !" ,  "error" )
        }
    })
  });