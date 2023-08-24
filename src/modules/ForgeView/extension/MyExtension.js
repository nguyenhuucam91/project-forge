import ReactPanel from './ReactPanel'

export class ReactPanelExtension extends Autodesk.Viewing.Extension {
  panel
  constructor(viewer, options) {
    super(viewer, options)

    options?.loader?.show(false)

    this.panel = new ReactPanel(viewer, {
      id: 'react-panel-id',
      title: 'Hiep Nguyen'
    })
  }

  /////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////
  load() {
    console.log('Viewing.Extension.ReactPanel loaded')

    this.panel.setVisible(true)

    return true
  }

  /////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////
  static get ExtensionId() {
    return 'Viewing.Extension.ReactPanel'
  }

  /////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////
  unload() {
    console.log('Viewing.Extension.ReactPanel unloaded')

    return true
  }
  static register() {
    Autodesk.Viewing.theExtensionManager.registerExtension('MyExtension', ReactPanelExtension)
  }
}
