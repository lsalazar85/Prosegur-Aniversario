$(document).ajaxStart(function () {
	$("body").addClass("loading")
});
$(document).ajaxStop(function () {
	$("body").removeClass("loading")
});
$.extend({
	getQueryParameters: function (a) {
		return (a || document.location.search).replace(/(^\?)/, "").split("&").map(function (a) {
			return a = a.split("="), this[a[0]] = a[1], this
		}.bind({}))[0]
	}
});

function randomString() {
	for (var a = "", b = 0; 10 > b; b++) var c = Math.floor(10 * Math.random()),
		a = a + "0123456789".substring(c, c + 1);
	return a
}
$.fn.isEmpty = function () {
	return 0 === this.val().length
};
$.fn.isEmail = function () {
	return null !== this.val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
};
$.fn.formError = function () {
	var self = this;
	this.addClass("form-error");
	this.focus(function () {
		self.removeClass("form-error")
	})
};

////$(document).ajaxStart(function(){$("body").addClass("loading")});$(document).ajaxStop(function(){$("body").removeClass("loading")});$.extend({getQueryParameters:function(a){return(a||document.location.search).replace(/(^\?)/,"").split("&").map(function(a){return a=a.split("="),this[a[0]]=a[1],this}.bind({}))[0]}});function randomString(){for(var a="",b=0;10>b;b++)var c=Math.floor(10*Math.random()),a=a+"0123456789".substring(c,c+1);return a}$.fn.isEmpty=function(){return 0===this.val().length};
//$.fn.isEmail=function(){return null!==this.val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)};$.fn.formError=function(){var self=this;this.addClass("form-error");this.focus(function(){self.removeClass("form-error")})};