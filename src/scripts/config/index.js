import { BloomPass, GlitchPass } from 'postprocessing'

export default {
  debug: {
    stats: true,
    orbitControls: true
  },
  postProcessing: {
    active: true,
    passes: [
      {
        name: 'BloomPass',
        active: true,
        constructor: () => {
          return new BloomPass( {
            resolutionScale: 0.5,
            intensity: 2.0,
            distinction: 1.0
          } )
        }
      },
      {
        name: 'GlitchPass',
        active: false,
        constructor: () => {
          return new GlitchPass( {} )
        }
      }
    ]
  }
}
