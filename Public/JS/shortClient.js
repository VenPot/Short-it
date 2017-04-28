/*global $*/
$(document).ready(function() {


        $('#geturl').on('submit', function(e) {
                console.log("hello")
                e.preventDefault()
                var userUrl = $(this).serialize()

                var finalUserUrl = decodeURIComponent(userUrl)
                    // var clientData = "clientUrl=" + userUrl
                console.log("finaluserUrl is ", finalUserUrl)
                    // console.log("client data is ", clientData)

                $.post('/sends', finalUserUrl, function(data, status) {
                    console.log("status is ", status)
                    $('#personal').show()
                    $('#convertedUrl').html(data)
                })
            }) //button click
    }) //doc ready ends
