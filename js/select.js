  $(document).ready(function() {
    $(".sub-btn").click(function(e) {
        $(".search-pic").show();
        e.stopPropagation();
    });

    $(document).click(function(e) {
        if (!$(e.target).is('.sub-btn, .sub-btn *')) {
            $(".search-pic").hide();
        }
    });
});
