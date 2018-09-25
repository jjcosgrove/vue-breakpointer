const breakpointNames = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
]

const breakpointDefaults = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
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
        return this.windowDimensions.width < this.breakpoints.sm
      },
      sm () {
        return (this.windowDimensions.width >= this.breakpoints.sm) &&
          (this.windowDimensions.width < this.breakpoints.md)
      },
      md () {
        return (this.windowDimensions.width >= this.breakpoints.md) &&
          (this.windowDimensions.width < this.breakpoints.lg)
      },
      lg () {
        return (this.windowDimensions.width >= this.breakpoints.lg) &&
          (this.windowDimensions.width < this.breakpoints.xl)
      },
      xl () {
        return this.windowDimensions.width >= this.breakpoints.xl
      },
      breakpoint () {
        // find which breakpoints is currently active
        return breakpointNames
          .map(breakpointName => ({
            name: breakpointName,
            active: this[breakpointName]
          }))
          .find(breakpoint => breakpoint.active).name
      }
    },
    methods: {
      updateWindowDimensions () {
        this.windowDimensions.width = window.innerWidth
        this.windowDimensions.height = window.innerHeight
      }
    },
    mounted () {
      // add listener
      window.addEventListener('resize', this.updateWindowDimensions)

      // initialize with values
      this.updateWindowDimensions()
    },
    beforeDestroy () {
      // remove listener
      window.removeEventListener('resize', this.updateWindowDimensions)
    }
  }
}

const VueBreakpointer = {
  install: (Vue, options) => {
    // basic check for breakpoints
    const hasBreakpoints = options &&
      options.breakpoints &&
      typeof options.breakpoints === 'object'

    // only allow options to take effect when *all* breakpoints are provided
    const hasAllBreakpoints = hasBreakpoints &&
      Object.keys(breakpointDefaults)
        .every(breakpoint => Object.keys(options.breakpoints).includes(breakpoint))

    // show a warning for partial breakpoint configuration
    if (hasBreakpoints && !hasAllBreakpoints) {
      console.warn('VueBreakpointer: you must provide either all or no breakpoints')
    }

    // assign breakpoints
    const breakpoints = hasAllBreakpoints ? options.breakpoints : breakpointDefaults
    Vue.mixin(generateMixin(breakpoints))
  }
}

const VueBreakpointerMixin = generateMixin(breakpointDefaults)

export { VueBreakpointerMixin }
export default VueBreakpointer
