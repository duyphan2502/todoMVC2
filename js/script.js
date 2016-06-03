$(document).ready(function(){
    "use strict";
    $('.js-todo-app').todoMVC({
        buttonLabels: {
            showAll: 'Xem tất cả',
            showUncompletedTasks: 'Chưa hoàn thành',
            showCompletedTasks: 'Đã hoàn thành'
        },
        counterText: 'Còn lại {{$i}} việc nữa',
        placeHolder: 'Thêm công việc'
    });
});

$(window).load(function () {
    "use strict";
});