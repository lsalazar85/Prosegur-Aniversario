$(document).ajaxStart(function() {
    $("body").addClass("loading");
});
$(document).ajaxStop(function() {
    $("body").removeClass("loading");
});
$.extend({
    getQueryParameters: function(a) {
        return (a || document.location.search).replace(/(^\?)/, "").split("&").map(function(a) {
            return a = a.split("="), this[a[0]] = a[1], this;
        }.bind({}))[0];
    }
});
function randomString() {
    for (var a = "", b = 0; 10 > b; b++) var c = Math.floor(10 * Math.random()),
        a = a + "0123456789".substring(c, c + 1);
    return a;
}
$("#prosegur").submit(function(e) {
    $('input[type="submit"]').attr("disabled", "disabled");
    e.preventDefault();
    var error = false;
    if (null === $("#nombre").val().match(/[A-Za-z]{2} [A-Za-z]{2}/)) {
        error = true;
        $("#nombre").css("border", "2px solid red");
        $("#nombre").focus(function() {
            $("#nombre").css("border", "1px solid green");
        });
    }
    if (0 === $("#localidad").val().length) {
        error = true;
        $("#localidad").css("border", "2px solid red");
        $("#localidad").focus(function() {
            $("#localidad").css("border", "1px solid green");
        });
    }

    if (null === $("#email").val().match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)) {
        error = true;
        $("#email").css("border", "2px solid red");
        $("#email").focus(function() {
            $("#email").css("border", "1px solid green");
        });
    }
    if (null === $("#telefono").val().match(/^\d+$/)) {
        error = true;
        $("#telefono").css("border", "2px solid red");
        $("#telefono").focus(function() {
            $("#telefono").css("border",
                "1px solid green");
        });
    }
    if ("" === $("#consulta").val() || "Consultas:" === $("#consulta").val()) {
        error = true;
        $("#consulta").css("border", "2px solid red");
        $("#consulta").focus(function() {
            $("#consulta").css("border", "1px solid green");
        });
    }
    if (false === error) {
        var query = $.getQueryParameters();
        if (-1 !== $(location).attr("href").indexOf("gclid")) query.utm_source = "Google";
        var data = {
            nombre: $("#nombre").val(),
            localidad: $("#localidad").val(),
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            consulta: $("#consulta").val(),
            source: query.utm_source || null,
            medium: query.utm_medium || null,
            campaign: query.utm_campaign || null,
            id_dinamico: randomString(),
            origen_url: $(location).attr("href")
        };
        $.post("/process.php", data, function(res) {
            $("form").each(function() {
                this.reset();
            });
            //ESTE ES EL SISTEMA QUE REDIRECCIONA A LA THANK YOU PAGE SEGÚN DEL SITIO DE DONDE SE ENVIÓ EL FORMULARIO
            var path = window.location.pathname;
            function redirectThankyouPage(urlOrigen,urlThankyou){
                if(path === urlOrigen){
                    $(location).attr("href", urlThankyou);
                }
            }
            //EL PRIMER PARÁMETRO ES LA URL DE ORIGEN Y EL SEGUNDO ES LA URL DE LA THANK YOU PAGE
            redirectThankyouPage("/","/gracias.html");
            //redirectThankyouPage("/promocion_corrientes.php","/gracias-corrientes.html");
            redirectThankyouPage("/menu.html","/gracias.html");
            redirectThankyouPage("/promocion.html","/gracias.html");
            redirectThankyouPage("/juego.html","/gracias.html");
            redirectThankyouPage("/botonera.html","/gracias.html");
            
            //redirectThankyouPage("/test-seguridad/octavo.php","/test-seguridad/gracias.html");
        }).fail(function(res) {
            if (422 === res.status) {
                var errors = $.parseJSON(res.responseText);
                if (true === errors.nombre) {
                    error = true;
                    $("#nombre").css("border", "2px solid red");
                    $("#nombre").focus(function() {
                        $("#nombre").css("border", "1px solid green");
                    });
                }
                if (true ===
                    errors.localidad) {
                    error = true;
                    $("#localidad").css("border", "2px solid red");
                    $("#localidad").focus(function() {
                        $("#localidad").css("border", "1px solid green");
                    });
                }
                if (true === errors.email) {
                    error = true;
                    $("#email").css("border", "2px solid red");
                    $("#email").focus(function() {
                        $("#email").css("border", "1px solid green");
                    });
                }
                if (true === errors.telefono) {
                    error =
                        true;
                    $("#telefono").css("border", "2px solid red");
                    $("#telefono").focus(function() {
                        $("#telefono").css("border", "1px solid green");
                    });
                }
                if (true === errors.consulta) {
                    error = true;
                    $("#consulta").css("border", "2px solid red");
                    $("#consulta").focus(function() {
                        $("#consulta").css("border", "1px solid green");
                    });
                }
            }
            console.debug(res);
            $('input[type="submit"]').removeAttr("disabled");
        });
    } else $('input[type="submit"]').removeAttr("disabled");
});



//
//
////$(document).ajaxStart(function(){$("body").addClass("loading")});$(document).ajaxStop(function(){$("body").removeClass("loading")});$.extend({getQueryParameters:function(a){return(a||document.location.search).replace(/(^\?)/,"").split("&").map(function(a){return a=a.split("="),this[a[0]]=a[1],this}.bind({}))[0]}});function randomString(){for(var a="",b=0;10>b;b++)var c=Math.floor(10*Math.random()),a=a+"0123456789".substring(c,c+1);return a}
//$("#prosegur").submit(function(e){$('input[type="submit"]').attr("disabled","disabled");e.preventDefault();var error=false;if(null===$("#nombre").val().match(/[A-Za-z]{2} [A-Za-z]{2}/)){error=true;$("#nombre").css("border","2px solid red");$("#nombre").focus(function(){$("#nombre").css("border","1px solid green")})}if(0===$("#localidad").val().length){error=true;$("#localidad").css("border","2px solid red");$("#localidad").focus(function(){$("#localidad").css("border","1px solid green")})}if(null===
//$("#prefijo").val().match(/^\d+$/)){error=true;$("#prefijo").css("border","2px solid red");$("#prefijo").focus(function(){$("#prefijo").css("border","1px solid green")})}if(null===$("#email").val().match(/^[0-9a-zA-Z-_\$#]+@[0-9a-zA-Z-_\$#]+\.[a-zA-Z]{2,5}/)){error=true;$("#email").css("border","2px solid red");$("#email").focus(function(){$("#email").css("border","1px solid green")})}if(null===$("#telefono").val().match(/^\d+$/)){error=true;$("#telefono").css("border","2px solid red");$("#telefono").focus(function(){$("#telefono").css("border",
//"1px solid green")})}if(""===$("#consulta").val()){error=true;$("#consulta").css("border","2px solid red");$("#consulta").focus(function(){$("#consulta").css("border","1px solid green")})}if(false===error){var query=$.getQueryParameters();if(-1!==$(location).attr("href").indexOf("gclid"))query.utm_source="Google";var data={nombre:$("#nombre").val(),localidad:$("#localidad").val(),email:$("#email").val(),prefijo:$("#prefijo").val(),telefono:$("#telefono").val(),consulta:$("#consulta").val(),source:query.utm_source||
//null,medium:query.utm_medium||null,campaign:query.utm_campaign||null,id_dinamico:randomString(),origen_url:$(location).attr("href")};$.post("/prosegur.php",data,function(res){$("form").each(function(){this.reset()});$(location).attr("href","/gracias.html")}).fail(function(res){if(422===res.status){var errors=$.parseJSON(res.responseText);if(true===errors.nombre){error=true;$("#nombre").css("border","2px solid red");$("#nombre").focus(function(){$("#nombre").css("border","1px solid green")})}if(true===
//errors.localidad){error=true;$("#localidad").css("border","2px solid red");$("#localidad").focus(function(){$("#localidad").css("border","1px solid green")})}if(true===errors.prefijo){error=true;$("#prefijo").css("border","2px solid red");$("#prefijo").focus(function(){$("#prefijo").css("border","1px solid green")})}if(true===errors.email){error=true;$("#email").css("border","2px solid red");$("#email").focus(function(){$("#email").css("border","1px solid green")})}if(true===errors.telefono){error=
//true;$("#telefono").css("border","2px solid red");$("#telefono").focus(function(){$("#telefono").css("border","1px solid green")})}if(true===errors.consulta){error=true;$("#consulta").css("border","2px solid red");$("#consulta").focus(function(){$("#consulta").css("border","1px solid green")})}}console.debug(res);$('input[type="submit"]').removeAttr("disabled")})}else $('input[type="submit"]').removeAttr("disabled")});