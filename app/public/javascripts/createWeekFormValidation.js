$().ready(function () {
    // Highlight todays date and close the calendar
    $('.date').datepicker({
        todayHighlight: true,
        autoclose: true
    });
    // Change the games' dates when setting the start date of the week
    $('#inputStartDate').change(function () {
        $('.gameDate').val($(this).val());
    });
    
    $('.selectHomeTeam').rules("add", {
        required: true,
        notEqualTo: ""
    });
    $('.selectAwayTeam').rules("add", {
        required: true,
        notEqualTo: ""
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
        highlight: function (element) {
            $(element).closest('.control-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.control-group').removeClass('has-error');
        }
    });
});