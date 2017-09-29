$(document).ajaxStart(function() {
    $("body").addClass("loading");
});
$(document).ajaxStop(function() {
    $("body").removeClass("loading");
});
//console.log(window.location.pathname);
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
    if (null === $("#email").val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
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
    if (null === $("#localidad").val().match(/[A-Za-z0-9]{2}/)) {
        error = true;
        $("#localidad").css("border", "2px solid red");
        $("#localidad").focus(function() {
            $("#localidad").css("border", "1px solid green");
        });
    }
	if (null === $("#consulta").val().match(/[A-Za-z0-9]{2}/)) {
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
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            localidad: $("#localidad").val(),
            consulta: $("#consulta").val(),
            source: query.utm_source || null,
            medium: query.utm_medium || null,
            campaign: query.utm_campaign || null,
            origen_url: $(location).attr("href")
        };
        $.post("services/process.php", data, function(res) {
            $("form").each(function() {
                this.reset();
            });
            var path = window.location.pathname;
            if(path === "/"){
                $(location).attr("href", "/gracias-auto.html");
            }
            if(path === "/promocion-hogar.html"){
                $(location).attr("href", "/gracias-hogar.html");
            }
            if(path === "/promocion-negocio.html"){
                $(location).attr("href", "/gracias-negocio.html");
            }
            if(path === "/promocionuf-auto.html"){
                $(location).attr("href", "/graciasuf-auto.html");
            }
            if(path === "/promocionuf-hogar.html"){
                $(location).attr("href", "/graciasuf-hogar.html");
            }
            if(path === "/promocionuf-negocio.html"){
                $(location).attr("href", "/graciasuf-negocio.html");
            }
			else {
                $(location).attr("href", "/gracias-auto.html");
            }
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
				if (true === errors.sitio) {
                    error = true;
                    $("#sitio").css("border", "2px solid red");
                    $("#sitio").focus(function() {
                        $("#ssitio").css("border", "1px solid green");
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
                    error = true;
                    $("#telefono").css("border", "2px solid red");
                    $("#telefono").focus(function() {
                        $("#telefono").css("border", "1px solid green");
                    });
                }
                if (true === errors.localidad) {
                    error = true;
                    $("#localidad").css("border", "2px solid red");
                    $("#localidad").focus(function() {
                        $("#localidad").css("border", "1px solid green");
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
            //console.debug(res);
            $('input[type="submit"]').removeAttr("disabled");
        });
    } else $('input[type="submit"]').removeAttr("disabled");
});

