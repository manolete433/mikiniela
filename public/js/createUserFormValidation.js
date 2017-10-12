$(document).ready(function () {
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z0-9_-]+$/i.test(value);
    }, "Please use only a-z0-9_-");
    $('#createUserForm').validate({
        rules: {
            inputFirstName: {
                minlength: 3,
                maxlength: 15,
                required: true,
                lettersonly: true
            },
            inputLastName: {
                minlength: 3,
                maxlength: 15,
                required: true,
                lettersonly: true
            },
            inputUsername: {
                minlength: 3,
                maxlength: 15,
                required: true,
                lettersonly: true
            },
            inputEmail: {
                required: true,
                email: true
            },
            inputPassword: {
                minlength: 8,
                maxlength: 15,
                required: true
            },
            inputPasswordConfirm:{
                equalTo: "#inputPassword"
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.control-group').removeClass('has-error');
        }
    });
});