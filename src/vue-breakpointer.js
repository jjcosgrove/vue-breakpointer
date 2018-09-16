const defaults = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 1200
}

const generateMixin = (breakpoints) => {
  return {
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
        return this.windowDimensions.width <= this.breakpoints.xs
      },
      sm () {
        return (this.windowDimensions.width > this.breakpoints.xs) &&
          (this.windowDimensions.width <= this.breakpoints.sm)
      },
      md () {
        return (this.windowDimensions.width > this.breakpoints.sm) &&
          (this.windowDimensions.width <= this.breakpoints.md)
      },
      lg () {
        return (this.windowDimensions.width > this.breakpoints.md) &&
          (this.windowDimensions.width <= this.breakpoints.lg)
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
  }
}

const VueBreakpointer = {
  install: (Vue, options) => {
    const breakpoints = options && options.breakpoints ? options.breakpoints : defaults
    Vue.mixin(generateMixin(breakpoints))
  }
}

const VueBreakpointerMixin = generateMixin(defaults)

export default VueBreakpointer
export { VueBreakpointerMixin }
