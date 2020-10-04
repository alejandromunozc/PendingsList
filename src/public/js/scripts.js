$(document).ready(function() {
    window.setTimeout(function() {
        $(".alert").alert('close');
    }, 5000);

    const todoTask = $(".todo").length;
    if (todoTask > 0) {
        $(".todoShow").addClass("hide");
        $(".todoShow").removeClass("show");
    } else {
        $(".todoShow").addClass("show");
        $(".todoShow").removeClass("hide");
    }

    const processTask = $(".process").length;
    if (processTask > 0) {
        $(".processShow").addClass("hide");
        $(".processShow").removeClass("show");
    } else {
        $(".processShow").addClass("show");
        $(".processShow").removeClass("hide");
    }

    const finishTask = $(".finish").length;
    if (finishTask > 0) {
        $(".finishShow").addClass("hide");
        $(".finishShow").removeClass("show");
    } else {
        $(".finishShow").addClass("show");
        $(".finishShow").removeClass("hide");
    }
});