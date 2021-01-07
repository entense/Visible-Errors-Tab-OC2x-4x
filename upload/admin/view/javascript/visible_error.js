var visible_error = {
    input: function (i, json) {
        var element = $('#input-' + i.replace(/_/g, '-')),
            alert = '<div class="text-danger">' + json[i] + '</div>';
        if (element.length === 0) {
            var element = $('[name="' + i + '"]');
        }
        if (element.length) {
            if (element.parent('.tab-pane').find('.note-editor').length) {
                element.parent('.tab-pane').find('.note-editor').after(alert);
                element.parent().addClass('has-error');
            } else
                if (element.parent().hasClass('input-group')) {
                    element.parent().after(alert);
                    element.parent().addClass('has-error');
                } else if (element.parent('.tab-pane').length) {
                    element.after(alert);
                    element.parent('.tab-pane').addClass('has-error');
                } else if (element.closest('.form-group').length) {
                    element.after(alert);
                    element.closest('.form-group').addClass('has-error');
                } else {
                    element.after(alert);
                    element.parent().addClass('has-error');
                }

        } else if ($('[data-name="' + i + '"]').length) {
            $('[data-name="' + i + '"]').append(alert);
            $('[data-name="' + i + '"]').addClass('is-invalid');

        }
        element.addClass('is-invalid');
    },
    destroy: function (panel) {
        panel.find('.nav > li > a').each(function () {
            $(this).removeClass('error');
            var $popover = $(this).data('bs.popover');
            if ($popover) {
                $popover.destroy();
            }
            $(this).popover('destroy');
        });
    },
    check: function (panel) {
        panel.find('.text-danger').each(function () {

            var element = $(this).closest('.form-group').find('.is-invalid');
            if ($(this).parent('.tab-pane').find('.is-invalid').length) {
                var element = $(this).parent('.tab-pane').find('.is-invalid');
            }
            if ($(this).prev('.input-group').find('.is-invalid').length) {
                var element = $(this).parent('.input-group').find('.is-invalid');
            }

            if (element.prev().hasClass('input-group')) {
                element.prev().addClass('has-error');
            } else if (element.parent().hasClass('tab-pane')) {
                element.parent().addClass('has-error');
            } else if (element.parent().hasClass('input-group')) {
                element.parent().addClass('has-error');

            } else if (element.closest('.form-group').length) {
                element.closest('.form-group').addClass('has-error');
            } else {
                element.parent().addClass('has-error');
            }
        });
        panel.find('.nav > li > a').each(function () {
            var errors = $($(this).attr('href')).find('.has-error');
            var tab = false;
            if (!errors.length && $($(this).attr('href')).hasClass('has-error')) {
                var errors = $($(this).attr('href'));
                var tab = true;
            }

            var errors_count = $($(this).attr('href')).find('.text-danger').length;

            if (errors.length) {

                $(this).addClass('error').append('<span class="badge badge-error">' + errors_count + '</span>');
                var errors_html = '';

                $(errors).each(function () {
                    if ($(this).next('.text-danger').closest('table').length) {

                        var label = ($(this).next('.text-danger').closest('table').length ? '<b>' + $.trim($(this).closest('table').find('thead td').eq($(this).next('.text-danger').closest('td').get(0).cellIndex).text()) + '</b>: ' : '');
                        errors_html += '<li>' + label + $(this).next('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else if ($(this).find('.text-danger').closest('table').length) {

                        var label = ($(this).find('.text-danger').closest('table').length ? '<b>' + $.trim($(this).closest('table').find('thead td').eq($(this).find('.text-danger').closest('td').get(0).cellIndex).text()) + '</b>: ' : '');
                        errors_html += '<li>' + label + $(this).find('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else if ($(this).find(':not(.modal) .text-danger').length) {

                        if ($(this).find('label').length) {
                            var label = '<b>' + $.trim($(this).find('.control-label').text()) + ':</b> ';
                        } else if ($(this).closest('.form-group').find('.control-label').length) {
                            var label = '<b>' + $.trim($(this).closest('.form-group').find('.control-label').text()) + ':</b> ';
                        }
                        errors_html += '<li>' + label + $(this).find('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else if ($(this).closest('[data-name]').length) {
                        var label = ($(this).closest('.form-group').find('.control-label').length ? '<b>' + $.trim($(this).closest('.form-group').find('.control-label').text()) + '</b>: ' : '');
                        errors_html += '<li>' + label + $(this).closest('[data-name]').find('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else if ($(this).next('.text-danger').length) {
                        var label = ($(this).closest('.form-group').find('.control-label').length ? '<b>' + $.trim($(this).closest('.form-group').find('.control-label').text()) + '</b>: ' : '');
                        errors_html += '<li>' + label + $(this).next('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else if ($(this).prev('.text-danger').length) {
                        var label = ($(this).closest('.form-group').find('.control-label').length ? '<b>' + $.trim($(this).closest('.form-group').find('.control-label').text()) + '</b>: ' : '');
                        errors_html += '<li>' + label + $(this).next('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    } else {
                        var label = ($(this).closest('.form-group').children('.control-label').length ? '<b>' + $.trim($(this).closest('.form-group').children('.control-label').text()) + '</b>: ' : '');
                        console.log($(this));
                        errors_html += '<li>' + label + $(this).children('.text-danger').map(function(){return $( this ).text(); }).get().join( "<br>" ) + '</li>';
                    }
                });
                var $popover = $(this).data('bs.popover');
                if ($popover) {
                    $popover.destroy();
                }
                var element = $(this);
                setTimeout(function () {
                    element.popover({
                        container: 'body',
                        title: 'Errors ' + ' (' + errors_count + ')',
                        template: '<div class="popover" role="tooltip" style="width: 500px;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><div class="data-content"></div></div></div>',
                        content: function () {
                            return '<ul class="text-danger error-popover">' + errors_html + '</ul>';
                        },
                        html: true,
                        trigger: 'hover',
                    });
                }, 200);

            } else {
                $(this).popover('destroy');
            }
        });
    }
}
$(document).ready(function () {
    visible_error.check($('#content'));
});