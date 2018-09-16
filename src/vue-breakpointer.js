const VueBreakpointer = {
  install: (Vue, options) => {
    const defaults = {
      xs: 320,
      sm: 480,
      md: 720,
      lg: 1200
    }

    const breakpoints = options && options.breakpoints ? options.breakpoints : defaults

    Vue.mixin('VueBreakpointer', {
      data () {
        return {
          windowDimensions: {
            width: 0,
            height: 0
          },
          breakpoints: breakpoints
        }
      },
      computed: {
        xs () {
          return this.windowDimensions.width <= 320
        },
        sm () {
          return (this.windowDimensions.width > this.breakpoints.xs) &&
            (this.windowDimensions.width <= 480)
        },
        md () {
          return (this.windowDimensions.width > this.breakpoints.sm) &&
            (this.windowDimensions.width <= 720)
        },
        lg () {
          return (this.windowDimensions.width > this.breakpoints.md) &&
            (this.windowDimensions.width <= 1200)
        },
        xl () {
          return this.windowDimensions.width > this.breakpoints.lg
        },
        breakpoint () {
          let bpd = Object.keys(this.breakpoints).map(bp => {
            return {
              breakpoint: bp,
              isActive: this[bp]
            }
          }).filter(bp => bp.isActive)
          return bpd.length ? bpd.pop().breakpoint : 'xl'
        }
      },
      methods: {
        updateWindowDimensions () {
          this.windowDimensions.width = window.innerWidth
          this.windowDimensions.height = window.innerHeight
        }
      },
      mounted () {
        window.addEventListener('resize', this.updateWindowDimensions)
        this.updateWindowDimensions()
      },
      beforeDestroy () {
        window.removeEventListener('resize', this.updateWindowDimensions)
      }
    })
  }
}

export default VueBreakpointer
