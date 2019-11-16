$(document).ready(function () {
    $(document).on("click", ".sp_button", function () {
        spoyler(this);
    });
});

function spoyler(obj) {
    var spoil = $(obj).parent().parent(".spoil");
    var he = spoil.find(".sp_text").innerHeight() + 60;

    if (spoil.height() == 37) {
        $(obj).text("Hide");
        spoil.stop(true).animate({ height: he + "px" }, 200);
    } else {
        $(obj).text("Show");
        spoil.stop(true).animate({ height: 37 + "px" }, 200);
    }

}