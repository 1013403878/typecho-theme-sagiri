(function(_, factory) {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = factory(_);
  } else if (typeof define === 'function' && define.amd) {
    define([], factory(_));
  } else {
    _.LazyLoadImg = factory(_);
  }
})(
  typeof global !== 'undefined' ? global : window || this.global,
  _ =>
    class LazyLoadImg {
      constructor(options) {
        const defaultOption = {
          selector: '.lazy-img',
          virtualSrc: '',
          callback: null
        };

        for (let k in defaultOption) {
          if (defaultOption.hasOwnProperty(k) && !options.hasOwnProperty(k)) {
            options[k] = defaultOption[k];
          }
        }

        this.options = options;
        this.images = [].slice.call(
          document.querySelectorAll(options.selector)
        );
        this.init();
      }

      init() {
        if (!_.IntersectionObserver) {
          document.addEventListener('scroll', () => {
            this.LazyLoadImage();
          });

          return;
        }

        let observerConfig = {
          root: null,
          rootMargin: '0px',
          threshold: [0]
        };
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            //If intersectionRatio is 0, the target is out of view
            if (entry.intersectionRatio > 0) {
              this.observer.unobserve(entry.target);
              const image = entry.target;
              this.loadImage(image);
            }
          });
        }, observerConfig);

        this.images.forEach(image => {
          this.observer.observe(image);
        });
      }

      LazyLoadImage() {
        const windowClientHeight =
          _.document.documentElement.clientHeight ||
          _.document.body.clientHeight;

        this.images.forEach(image => {
          const { top } = image.getBoundingClientRect();

          if (top <= windowClientHeight) this.loadImage(image);
        });
      }

      loadImages() {
        this.images.forEach(image => {
          this.loadImage(image);
        });
      }

      loadImage(image) {
        const src = image.getAttribute(this.options.virtualSrc);
        if (this.options.callback) {
          this.options.callback(image, src);
          return;
        }

        if (image.tagName.toLowerCase() === 'img') {
          src && (image.src = src);
        } else {
          image.style.backgroundImage = `url(${src})`;
        }
      }

      loadAndDestroy() {
        this.loadImages();
        this.destroy();
      }

      destroy() {
        this.observer.disconnect();
        this.settings = null;
      }
    }
);

new LazyLoadImg({
  selector: '.lazy-loader',
  virtualSrc: 'lazy-src',
  callback: function(image, src) {
    const data = image.getAttribute('data').split('::');
    if (data.length > 2) {
      image.classList.remove('lazy-loader')
      image.innerHTML = `<img src=${src}  style="width:${data[0]}px;height:${data[1]}px" src="${data[2]}" alt="${data[2]}"/>`;
    }
  }
});