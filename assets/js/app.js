jQuery(function($) {
    search();
    file();
    km_pannel();
    progress_bar($('#test-progress'));

    function search() {
        $('form.search').on('submit', function(e) {
            e.preventDefault();
            
            var searchInput = $('#search');
            var searchValue = searchInput.val().trim();
            
            if (searchValue === '') {
                $(this).addClass('search--error'); 
                $(this).find('.search-results').slideUp();
            } else {
                $(this).removeClass('search--error');

                $(this).find('.search-results').slideDown();
            }
        });

    }

    function file() {
        $('#file-input').on('change', function() {
            let fileName = this.files.length > 0 ? this.files[0].name : "Aucun fichier";
            $('#file-name').text(fileName);
        });
    }

    function km_pannel() {
        function animateValue(element, start, end, duration) {
            $({ value: start }).animate({ value: end }, {
                duration: duration,
                step: function(now) {
                    $(element).text(Math.round(now).toLocaleString());
                },
                complete: function() {
                    $(element).attr('data-value', end);
                }
            });
        }
    
        function updateKmValues(value) {
            let annualKm = parseInt(value.replace(/\s/g, ''), 10);
            let monthlyKm = Math.round(annualKm / 12);
            let dailyKm = Math.round(annualKm / 365);
    
            let currentAnnualKm = parseInt($('[data-annual-km]').attr('data-annual-km'), 10);
            let currentMonthlyKm = parseInt($('[data-monthly-km]').attr('data-monthly-km'), 10);
            let currentDailyKm = parseInt($('[data-daily-km]').attr('data-daily-km'), 10);
    
            animateValue('[data-annual-km]', currentAnnualKm, annualKm, 500);
            animateValue('[data-monthly-km]', currentMonthlyKm, monthlyKm, 500);
            animateValue('[data-daily-km]', currentDailyKm, dailyKm, 500);
    
            $('[data-annual-km]').attr('data-annual-km', annualKm);
            $('[data-monthly-km]').attr('data-monthly-km', monthlyKm);
            $('[data-daily-km]').attr('data-daily-km', dailyKm);
        }
    
        $('#km_pannel-plus').click(function() {
            let currentKm = parseInt($('[data-annual-km]').attr('data-annual-km'), 10);
            let newKm = currentKm + 5000;
            updateKmValues(newKm.toString());
        });
    
        $('#km_pannel-minus').click(function() {
            let currentKm = parseInt($('[data-annual-km]').attr('data-annual-km'), 10);
            let newKm = Math.max(5000, currentKm - 5000);
            updateKmValues(newKm.toString());
        });
    }

    function progress_bar(progress_section) {
        var progress_value = parseInt(progress_section.attr('data-progress'));
        $('.progress-bar-fill').on('click', function() {
            progress_value = progress_value + 8;
            update_progress_bar(progress_value);
        });

        $('.progress-bar-checkpoint').on('click', function() {
            update_progress_bar(parseInt($(this).attr('data-reached')));
        });


        function update_progress_bar(value) {
            value = value >= 100 ? 100 : value;
            progress_section.attr('data-progress', value);
            progress_section.find('.progress-bar-fill > span').css('width', value + "%");

            var checkpoints = progress_section.find('.progress-bar-checkpoint');

            checkpoints.each(function(index, element) {
                var $element = $(element);

                if (value >= parseInt($element.attr('data-reached'))) {
                    progress_section.find('.reached').addClass('completed');
                    progress_section.find('.reached').removeClass('reached');

                    $element.addClass('reached');
                }else {
                    $element.removeClass('reached completed');
                }
            });
        }
    }

});