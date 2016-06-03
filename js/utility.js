(function ($) {
    $.fn.todoMVC = function (options) {
        var settings = $.extend({
            buttonLabels: {
                showAll: 'All',
                showUncompletedTasks: 'Active',
                showCompletedTasks: 'Completed'
            },
            counterText: '{{$i}} item(s) left',
            placeHolder: 'Add new work'
        }, options);

        var todoMVC = function (element) {
            var $element = element;
            if (!element) return;

            var $number = 0;

            (function () {
                initLayout();
                handleWork();
                counter();
            })();

            function itemTemplate(text) {
                return '<li class="list-group-item"><a href="#" title="' + text + '" class="text">' + text + '</a><a href="#" class="delete"></a></li>';
            }

            function initLayout() {
                var template = '<div class="form-group">';
                template += '<input type="text" name="" class="form-control add-new-work" placeholder="' + settings.placeHolder + '">';
                template += '<ul class="list-group work-list"></ul>';
                template += '</div>';
                template += '<div class="form-group">';
                template += '<span class="counter"></span>';
                template += '<div class="btn-group pull-right filter-group" role="group">';
                template += '<button type="button" data-type="all" class="btn btn-default active">' + settings.buttonLabels.showAll + '</button>';
                template += '<button type="button" data-type="active" class="btn btn-default">' + settings.buttonLabels.showUncompletedTasks + '</button>';
                template += '<button type="button" data-type="completed" class="btn btn-default">' + settings.buttonLabels.showCompletedTasks + '</button>';
                template += '</div>';
                template += '</div>';
                $element.append(template);
            }

            function counter(number) {
                if (!number) {
                    $element.find('.counter').empty();
                    return;
                }
                $number = number;
                var text = settings.counterText.replace('{{$i}}', number);
                $element.find('.counter').html(text);
            }

            function handleWork() {
                //add new work
                $element.on('keyup', '.add-new-work', function (event) {
                    if (event.keyCode == 13) {
                        //when user enter
                        var $current = $(this);
                        var $val = $current.val();
                        if ($val && $val.trim()) {
                            $element.find('.work-list').append(itemTemplate($val));
                            $current.val('');
                            counter($element.find('.work-list li:not(.completed)').length);
                        }
                    }
                });
                //change state of work
                $element.on('click', '.work-list a:not(.delete)', function (event) {
                    event.preventDefault();
                    $(this).closest('li').toggleClass('completed');
                    counter($element.find('.work-list li:not(.completed)').length);
                });
                //delete work
                $element.on('click', '.work-list .delete', function (event) {
                    event.preventDefault();
                    $(this).closest('li').remove();
                    counter($element.find('.work-list li:not(.completed)').length);
                });
                //filter
                $element.on('click', '.filter-group button', function (event) {
                    var $current = $(this);
                    var $type = $current.attr('data-type');
                    $current.parent().find('button').removeClass('active');
                    $current.addClass('active');
                    filter($type);
                });
            }

            function filter(type) {
                $element.find('.work-list li').addClass('hidden');
                switch (type) {
                    case 'active':
                    {
                        $element.find('.work-list li:not(.completed)').removeClass('hidden');
                    }
                        break;
                    case 'completed':
                    {
                        $element.find('.work-list li.completed').removeClass('hidden');
                    }
                        break;
                    default:
                    {
                        $element.find('.work-list li').removeClass('hidden');
                    }
                        break;
                }
            }
        };

        $.each(this, function (key, value) {
            $todoMVC = new todoMVC($(this));
        });
    };
})(jQuery);