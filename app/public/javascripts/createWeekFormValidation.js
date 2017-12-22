$().ready(function () {
    $('.date').datepicker({
        todayHighlight: true,
        autoclose: true
    });
    $('#inputStartDate').change(function() {
        $('.gameDate').val($(this).val());
    });
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z0-9_- ]+$/i.test(value);
    }, "Please use only a-z0-9_-");
    $('#createWeekForm').validate({
        rules: {
            inputName: {
                minlength: 3,
                maxlength: 30,
                required: true,
                lettersonly: true
            },
            inputStartDate: {
                required: true,
                date: true
            },
            inputEndDate: {
                required: true,
                date: true
            }
        },
        //9 times
        //inputStartDate
        //inputEndDate
        //selectHomeTeam
        //selectAwayTeam
        //inputGameDate
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