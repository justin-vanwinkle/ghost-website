var resultTemplate = `
<article id='gh-{{ref}}' class="gh-search-item post-card">
    <a class="post-card-image-link" href="{{link}}">
        <img class="post-card-image"
            sizes="(max-width: 1000px) 400px, 700px"
            height="200px"
            loading="lazy"
            src="{{feature_image}}"
            alt="{{title}}"
        />
    </a>
    <div class="post-card-content search-card-content bg-white">
        <a class="post-card-content-link" href="{{link}}">
            <header class="post-card-header">
                <h2 class="post-card-title">{{title}}</h2>
            </header>
            <section class="post-card-excerpt">
                    <p class="search-excerpt">{{excerpt}}</p>
            </section>
        </a>
    </div>
</article>
`;

var itemPreprocessor = function(item) {
    var ret = {};
    ret.excerpt = item.excerpt;
    ret.feature_image = item.feature_image;
    return ret;
};

var indexingStart = function() {
    $('.search-field')
        .prop('disabled', true)
        .addClass('yellow-bg')
        .prop('placeholder', 'Indexing, please wait');
};

var indexingEnd = function() {
    $('.search-field')
        .prop('placeholder', 'Search …')
        .removeClass('yellow-bg')
        .prop('disabled', false);
};

$(document).ready(function () {
    var searchField = $(".search-field").ghostHunter({
        results   : "#search-results",
        onKeyUp: true,
        onPageLoad: true,
        includebodysearch: true,
        info_template: "",
        result_template: resultTemplate,
        item_preprocessor: itemPreprocessor,
        indexing_start: indexingStart,
        indexing_end: indexingEnd
    });

    $('.close-btn').click(function() {
        $('.search-overlay').fadeOut();
        $('#search-btn').show();
    });

    $('#search-btn').click(function() {
        $(this).hide();
        $('.search-overlay').fadeIn();
        $('.search-field').focus();
    });
});