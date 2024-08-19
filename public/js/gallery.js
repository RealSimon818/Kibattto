
$(document).ready(function() {
    var galleryItems = $('.gallery-item');
    var currentIndex = 0;

    function updateLightbox(index) {
        var item = galleryItems.eq(index);
        var imgSrc = item.find('img').attr('src');
        var videoSrc = item.find('video').attr('src');
        var caption = item.find('p').text();

        if (imgSrc) {
            $('#lightboxImage').attr('src', imgSrc).removeClass('d-none');
            $('#lightboxVideo').addClass('d-none').attr('src', '');
        } else if (videoSrc) {
            $('#lightboxVideo').attr('src', videoSrc).removeClass('d-none');
            $('#lightboxImage').addClass('d-none').attr('src', '');
        }

        $('#lightboxCaption').text(caption);
    }

    galleryItems.click(function() {
        currentIndex = galleryItems.index(this);
        updateLightbox(currentIndex);
        $('#lightboxModal').modal('show');
    });

    $('#lightboxPrev').click(function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        updateLightbox(currentIndex);
    });

    $('#lightboxNext').click(function() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        updateLightbox(currentIndex);
    });

    // Autoplay video on hover
    $('video').hover(function() {
        $(this).get(0).play();
    }, function() {
        $(this).get(0).pause();
    });

    // Enable scrolling with keyboard in the modal
    $('#lightboxModal').on('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            $('#lightboxPrev').click();
        } else if (e.key === 'ArrowRight') {
            $('#lightboxNext').click();
        }
    });

    // Touch screen support
    var startX = 0;
    $('#lightboxModal').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('#lightboxModal').on('touchmove', function(e) {
        if (!startX) return;
        var endX = e.originalEvent.touches[0].clientX;
        if (startX - endX > 50) {
            $('#lightboxNext').click();
            startX = 0;
        } else if (endX - startX > 50) {
            $('#lightboxPrev').click();
            startX = 0;
        }
    });

            // Make the modal movable using the custom drag handle
            $('#lightboxModal .modal-content').draggable({
                handle: '.custom-drag-handle'
            });
        
     //make the modal resizable
      $('#lightboxModal .modal-content').resizable({
        handles: 'n, s, e, w, ne, sw, nw, se',
        minWidth: 300,
        minHeight: 200
          });
  });