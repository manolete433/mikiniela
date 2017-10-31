$().ready(function () {
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z0-9_-]+$/i.test(value);
    }, "Please use only a-z0-9_-");
    $('#createTeamForm').validate({
        rules: {
            inputName: {
                minlength: 3,
                maxlength: 30,
                required: true,
                lettersonly: true
            },
            inputImageURL: {
                minlength: 3,
                maxlength: 255,
                url: true
            }
        },
        // we could add messages
        // messages: {
        //     inputFirstName: {
        //         required: "Please Enter your firstname",
        //         minlength: "Your First Name must have at least 2 characters"
        //     }
        // },
        highlight: function (element) {
            $(element).closest('.control-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.control-group').removeClass('has-error');
        }
    });
});