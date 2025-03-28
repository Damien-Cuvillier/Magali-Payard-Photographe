!(function (a) {
    function e(e) {
        const l = a(".lightboxImage"),
            t = l.attr("src"),
            n = a("img.gallery-item")
                .map(function () {
                    return a(this).attr("src");
                })
                .get(),
            o = n.indexOf(t);
        if (-1 === o) return void console.error("Image active non trouvée dans la collection.");
        let s = o;
        "next" === e ? (s = (o + 1) % n.length) : "prev" === e && (s = (o - 1 + n.length) % n.length), l.attr("src", n[s]);
    }
    (a.fn.mauGallery = function (e) {
        const l = a.extend({}, a.fn.mauGallery.defaults, e);
        let t = [];
        return this.each(function () {
            const e = a(this);
            a.fn.mauGallery.methods.createRowWrapper(e),
                l.lightBox && a.fn.mauGallery.methods.createLightBox(e, l.lightboxId, l.navigation),
                a.fn.mauGallery.listeners(l),
                e.children(".gallery-item").each(function (e) {
                    const n = a(this);
                    a.fn.mauGallery.methods.responsiveImageItem(n), a.fn.mauGallery.methods.moveItemInRowWrapper(n), a.fn.mauGallery.methods.wrapItemInColumn(n, l.columns);
                    const o = n.data("gallery-tag");
                    l.showTags && o && !t.includes(o) && t.push(o);
                }),
                l.showTags && a.fn.mauGallery.methods.showItemTags(e, l.tagsPosition, t),
                e.fadeIn(500),
                a(".nav-link[data-images-toggle='all']").addClass("active-tag");
        });
    }),
        (a.fn.mauGallery.defaults = { columns: 3, lightBox: !0, lightboxId: null, showTags: !0, tagsPosition: "bottom", navigation: !0 }),
        (a.fn.mauGallery.listeners = function (e) {
            a(".gallery").on("click", ".gallery-item", function () {
                const l = a(this);
                e.lightBox && "IMG" === l.prop("tagName") && a.fn.mauGallery.methods.openLightBox(l, e.lightboxId);
            }),
                a(".gallery").on("click", ".nav-link", a.fn.mauGallery.methods.filterByTag),
                a(".gallery").on("click", ".mg-prev", () => a.fn.mauGallery.methods.prevImage()),
                a(".gallery").on("click", ".mg-next", () => a.fn.mauGallery.methods.nextImage());
        }),
        (a.fn.mauGallery.methods = {
            createRowWrapper(a) {
                a.children().first().hasClass("row") || a.append('<div class="gallery-items-row row"></div>');
            },
            wrapItemInColumn(a, e) {
                let l = "";
                if ("number" == typeof e) l = `col-${Math.ceil(12 / e)}`;
                else {
                    if ("object" != typeof e) return void console.error(`Columns should be defined as numbers or objects. ${typeof e} is not supported.`);
                    e.xs && (l += ` col-${Math.ceil(12 / e.xs)}`),
                        e.sm && (l += ` col-sm-${Math.ceil(12 / e.sm)}`),
                        e.md && (l += ` col-md-${Math.ceil(12 / e.md)}`),
                        e.lg && (l += ` col-lg-${Math.ceil(12 / e.lg)}`),
                        e.xl && (l += ` col-xl-${Math.ceil(12 / e.xl)}`);
                }
                a.wrap(`<div class='item-column mb-4 ${l}'></div>`);
            },
            moveItemInRowWrapper(a) {
                a.appendTo(".gallery-items-row");
            },
            responsiveImageItem(a) {
                "IMG" === a.prop("tagName") && a.addClass("img-fluid");
            },
            openLightBox(e, l) {
                const t = a(`#${l || "galleryLightbox"}`);
                t.find(".lightboxImage").attr("src", e.attr("src")), t.modal("toggle");
            },
            prevImage() {
                e("prev");
            },
            nextImage() {
                e("next");
            },
            createLightBox(a, e, l) {
                a.append(
                    `\n        <div class="modal fade" id="${
                        e || "galleryLightbox"
                    }" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="modal-dialog" role="document">\n            <div class="modal-content">\n              <div class="modal-body">\n                ${
                        l ? '<div class="mg-prev"></div>' : ""
                    }\n                <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique">\n                ${
                        l ? '<div class="mg-next"></div>' : ""
                    }\n              </div>\n            </div>\n          </div>\n        </div>`
                );
            },
            showItemTags(e, l, t) {
                let n = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
                t.forEach((a) => {
                    n += `<li class="nav-item"><span class="nav-link" data-images-toggle="${a}">${a}</span></li>`;
                });
                const o = `<ul class="my-4 tags-bar nav nav-pills">${n}</ul>`;
                "bottom" === l ? e.append(o) : "top" === l ? e.prepend(o) : console.error(`Unknown tags position: ${l}`), a(".nav-link[data-images-toggle='all']").addClass("active-tag");
            },
            filterByTag() {
                if (a(this).hasClass("active-tag")) return;
                a(".active-tag").removeClass("active active-tag"), a(this).addClass("active-tag");
                const e = a(this).data("images-toggle");
                a(".gallery-item").each(function () {
                    const l = a(this).parents(".item-column");
                    l.hide(), ("all" !== e && a(this).data("gallery-tag") !== e) || l.show(300);
                });
            },
        });
})(jQuery),
    $(document).ready(function () {
        $(".nav-link[data-images-toggle='all']").addClass("active-tag");
    });
