$(function () {
    // sitemap
    $(".sitemap").hide();

    $(".ham").click(function() {
        $(".sitemap").show();
        $(".sitemap_close").click(function () {
      $(".sitemap").hide();
      });
    });

}); /* end */