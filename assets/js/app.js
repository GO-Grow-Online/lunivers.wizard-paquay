jQuery(function($) {
    interactions();

    function interactions() {
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

        $('#file-input').on('change', function() {
            let fileName = this.files.length > 0 ? this.files[0].name : "Aucun fichier";
            $('#file-name').text(fileName);
        });
    }
});