import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three'
import Stats from 'stats-js'
import OrbitControls from 'orbit-controls'
import { EffectComposer, RenderPass } from 'postprocessing'
import GUI from 'Utils/GUI'
import { find, last } from 'lodash'

class SceneObj extends Scene {
  constructor ( options ) {
    super()
    const defaultOptions = {
      camera: {
        fov: 45,
        near: 1,
        far: 1000,
        position: new Vector3( 0, 0, 10 )
      },
      renderer: {
        antialias: false,
        pixelRatio: Math.max( 1, Math.min( window.devicePixelRatio, 2 ) )
      },
      debug: {
        stats: false,
        orbitControls: false
      },
      postProcessing: {
        active: false
      }
    }

    this.options = { ...defaultOptions, ...options }

    this.container = this.options.container

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new WebGLRenderer( this.width, this.height, this.options.renderer )
    this.renderer.setSize( this.width, this.height )

    this.container.appendChild( this.renderer.domElement )

    this.camera = new PerspectiveCamera( this.options.fov, this.width / this.height, this.options.near, this.options.far )
    this.camera.position.copy( this.options.camera.position )

    if ( this.options.postProcessing ) {
      this.initPostProcessing()
    }

    if ( this.options.debug.stats ) {
      this.initStats()
    }

    if ( this.options.debug.orbitControls ) {
      this.initControls()
    }
  }

  initControls () {
    this.controls = new OrbitControls( {
      position: this.camera.position.toArray(),
      parent: this.renderer.domElement,
      distanceBounds: [ 10, 20 ]
    } )
    this.target = new Vector3()
    this.camera.lookAt( this.target )
  }

  initStats () {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.left = '0px'
    this.stats.domElement.style.top = '0px'
    this.stats.domElement.addEventListener( 'mousedown', ( e ) => {
      e.stopPropagation()
    }, false )

    this.container.appendChild( this.stats.domElement )
  }

  initPostProcessing () {
    this.composer = new EffectComposer( this.renderer )
    const renderPass = new RenderPass( this, this.camera )
    renderPass.renderToScreen = false
    this.composer.addPass( renderPass )

    let passObject
    this.passes = []
    GUI.panel.addGroup( { label: 'Postprocessing' } )

    this.options.postProcessing.passes.forEach( pass => {
      if ( pass.active ) {
        passObject = pass.constructor()
        this.passes.push( passObject )
        this.composer.addPass( passObject )
      }

      GUI.panel.addCheckbox( pass, 'active', { label: pass.name, onChange: () => {
        this.togglePass( pass )
      } } )
    } )
    passObject.renderToScreen = true
  }

  togglePass ( pass ) {
    let currentPass = find( this.passes, { name: pass.name } )
    if ( currentPass === undefined ) currentPass = pass.constructor()
    last( this.composer.passes ).renderToScreen = false
    if ( pass.active ) this.composer.addPass( currentPass )
    else this.composer.removePass( currentPass )
    last( this.composer.passes ).renderToScreen = true
  }

  render () {
    if ( this.options.debug.orbitControls ) {
      this.controls.update()
      this.camera.position.fromArray( this.controls.position )
      this.camera.up.fromArray( this.controls.up )
      this.camera.lookAt( this.target.fromArray( this.controls.direction ) )
    }

    if ( this.options.postProcessing.active ) {
      this.composer.render()
    } else {
      this.renderer.render( this, this.camera )
    }

    if ( this.options.debug.stats ) {
      this.stats.update()
    }
  }

  resize ( newWidth, newHeight ) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( newWidth, newHeight )

    if ( this.composer ) {
      this.composer.setSize( newWidth, newHeight )
    }
  }
}

export default SceneObj
