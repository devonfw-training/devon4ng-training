 jQuery(".outer").on("click", "button", function () {
              jQuery(this).parent().append(jQuery("<button>Added</button>"));
});
